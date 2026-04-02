import type { SettingsData } from "../types";

interface ApiMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function getAccessToken(credentials: string, scope: string): Promise<string> {
  const response = await fetch("/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${credentials}`,
      RqUID: crypto.randomUUID(),
    },
    body: `scope=${scope}`,
  });

  if (!response.ok) {
    throw new Error("Ошибка авторизации");
  }

  const data = await response.json();
  return data.access_token;
}

export async function sendMessageStream(
  token: string,
  messages: ApiMessage[],
  settings: SettingsData,
  onChunk: (text: string) => void,
  onDone: () => void,
  signal?: AbortSignal
) {
  const response = await fetch("/api/gigachat/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      model: settings.model,
      messages,
      temperature: settings.temperature,
      top_p: settings.topP,
      max_tokens: settings.maxTokens,
      stream: true,
    }),
    signal,
  });

  if (!response.ok) {
    throw new Error("Ошибка запроса к GigaChat");
  }

  const reader = response.body!.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split("\n").filter((line) => line.startsWith("data: "));

    for (const line of lines) {
      const data = line.replace("data: ", "");
      if (data === "[DONE]") {
        onDone();
        return;
      }
      try {
        const parsed = JSON.parse(data);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) {
          onChunk(content);
        }
      } catch {
        // skip
      }
    }
  }

  onDone();
}

export async function sendMessageRest(
  token: string,
  messages: ApiMessage[],
  settings: SettingsData,
  signal?: AbortSignal
): Promise<string> {
  const response = await fetch("/api/gigachat/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      model: settings.model,
      messages,
      temperature: settings.temperature,
      top_p: settings.topP,
      max_tokens: settings.maxTokens,
      stream: false,
    }),
    signal,
  });

  if (!response.ok) {
    throw new Error("Ошибка запроса к GigaChat");
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
