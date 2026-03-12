import type { Chat, MessageData, SettingsData } from "../types";

export const mockChats: Chat[] = [
  { id: "1", title: "Разработка REST API на Python", lastMessageDate: "2025-03-12" },
  { id: "2", title: "Как настроить Docker Compose для микросервисов", lastMessageDate: "2025-03-11" },
  { id: "3", title: "Рецепт шарлотки с яблоками", lastMessageDate: "2025-03-10" },
  { id: "4", title: "Объясни квантовую запутанность простыми словами", lastMessageDate: "2025-03-09" },
  { id: "5", title: "Подготовка к собеседованию по JavaScript", lastMessageDate: "2025-03-08" },
];

export const mockMessages: MessageData[] = [
  {
    id: "1",
    role: "user",
    content: "Привет! Расскажи мне о **React хуках**.",
    timestamp: "10:00",
  },
  {
    id: "2",
    role: "assistant",
    content: "Конечно! **React Hooks** — это функции, которые позволяют использовать состояние и другие возможности React без написания классов.\n\nОсновные хуки:\n- `useState` — для управления состоянием\n- `useEffect` — для побочных эффектов\n- `useContext` — для доступа к контексту\n\n```js\nconst [count, setCount] = useState(0);\n```",
    timestamp: "10:01",
  },
  {
    id: "3",
    role: "user",
    content: "А чем `useEffect` отличается от `useLayoutEffect`?",
    timestamp: "10:02",
  },
  {
    id: "4",
    role: "assistant",
    content: "Отличие в *моменте выполнения*:\n\n1. `useEffect` — выполняется **асинхронно** после рендера и отрисовки на экране\n2. `useLayoutEffect` — выполняется **синхронно** после рендера, но *до* отрисовки\n\nИспользуйте `useLayoutEffect`, когда нужно измерить DOM или предотвратить мерцание.",
    timestamp: "10:03",
  },
  {
    id: "5",
    role: "user",
    content: "Спасибо! Можешь показать пример кастомного хука?",
    timestamp: "10:05",
  },
  {
    id: "6",
    role: "assistant",
    content: "Вот пример кастомного хука `useLocalStorage`:\n\n```typescript\nfunction useLocalStorage<T>(key: string, initialValue: T) {\n  const [storedValue, setStoredValue] = useState<T>(() => {\n    try {\n      const item = window.localStorage.getItem(key);\n      return item ? JSON.parse(item) : initialValue;\n    } catch (error) {\n      return initialValue;\n    }\n  });\n\n  const setValue = (value: T) => {\n    setStoredValue(value);\n    window.localStorage.setItem(key, JSON.stringify(value));\n  };\n\n  return [storedValue, setValue] as const;\n}\n```",
    timestamp: "10:06",
  },
];

export const defaultSettings: SettingsData = {
  model: "GigaChat",
  temperature: 0.7,
  topP: 0.9,
  maxTokens: 1024,
  systemPrompt: "",
  theme: "light",
};
