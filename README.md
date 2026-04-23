# GigaChat UI

Веб-интерфейс для работы с GigaChat API

## Демо

Развёрнутое приложение: https://gigachat-sigma.vercel.app

Приложение позволяет:
- Авторизоваться с помощью credentials GigaChat API
- Вести несколько параллельных чатов с AI-ассистентом (SSE-стриминг токен за токеном, fallback на REST)
- Markdown-форматирование ответов (заголовки, списки, ссылки, подсветка кода)
- Копировать ответ ассистента в буфер, останавливать генерацию на лету
- Настраивать модель, temperature, top-p, max_tokens, repetition_penalty и system prompt
- Переключать светлую/тёмную тему
- Искать по истории чатов (по названию и содержимому)
- Сохранять все чаты и сообщения в localStorage

## Скриншоты

Скриншоты находятся в папке /screenshots

## Стек

| Технология | Версия | Назначение |
|---|---|---|
| React | 19.2 | UI-библиотека |
| TypeScript | 5.9 | Типизация |
| Vite | 7.3 | Сборка и dev-сервер |
| React Router DOM | 7.13 | Маршрутизация (/, /chat/:id) |
| CSS Modules | — | Стилизация компонентов |
| Context API + useReducer | — | Управление состоянием |
| React Markdown | 10.1 | Рендер markdown в сообщениях |
| highlight.js | 11.11 | Подсветка кода |
| Lucide React | 0.577 | Иконки |
| Vitest | 4.1 | Тестирование |

## Архитектура

Модульная структура с разделением по фичам:

```
src/
├── api/gigachat.ts           — адаптер API (OAuth, streaming, REST fallback)
├── app/
│   ├── providers/            — глобальное состояние (Context + useReducer)
│   └── router/               — маршруты / и /chat/:id
├── components/
│   ├── auth/                 — форма авторизации
│   ├── chat/                 — окно чата, сообщения, ввод, typing-indicator
│   ├── layout/               — общий каркас (sidebar + main)
│   ├── settings/             — панель настроек
│   ├── sidebar/              — список чатов, поиск, элементы
│   ├── ui/                   — переиспользуемые примитивы (Button, Slider, Toggle)
│   └── ErrorBoundary.tsx     — изоляция ошибок в сообщениях
├── types/                    — TypeScript-типы
├── utils/storage.ts          — работа с localStorage
└── styles/theme.css          — CSS-переменные и глобальные стили
```

## Запуск локально

```bash
# 1. Клонируйте репозиторий
git clone https://github.com/urasinovjr/gigachat.git
cd gigachat

# 2. Установите зависимости
npm install

# 3. Запустите dev-сервер
npm run dev
```

Приложение откроется по адресу `http://localhost:5173`. Форма авторизации попросит ввести ваши credentials GigaChat API (Base64) и выбрать scope.

### Опционально: авто-логин через переменные окружения

Если хотите, чтобы credentials подставлялись автоматически:

```bash
cp .env.example .env
# затем заполните VITE_GIGACHAT_AUTH_KEY и VITE_GIGACHAT_SCOPE в .env
npm run dev
```

## Переменные окружения

| Переменная | Обязательность | Описание |
|---|---|---|
| `VITE_GIGACHAT_AUTH_KEY` | Нет | Base64-закодированные credentials для GigaChat API. Если задана — авторизация происходит автоматически при загрузке |
| `VITE_GIGACHAT_SCOPE` | Нет | Scope для авторизации. По умолчанию: `GIGACHAT_API_PERS`. Варианты: `GIGACHAT_API_PERS`, `GIGACHAT_API_B2B`, `GIGACHAT_API_CORP` |

Если переменные не заданы, приложение покажет форму авторизации, где можно ввести credentials вручную.

## Скрипты

| Команда | Описание |
|---|---|
| `npm run dev` | Запуск dev-сервера |
| `npm run build` | Сборка для продакшена |
| `npm run preview` | Просмотр production-билда |
| `npm run test` | Тесты в watch-режиме |
| `npm run test:run` | Однократный запуск тестов |
| `npm run lint` | ESLint |
| `npm run analyze` | Анализ размера бандла |

## Тесты

25 тестов на Vitest 4.1 + React Testing Library + jsdom:

- **Reducer** (6): действия CREATE_CHAT / DELETE_CHAT / RENAME_CHAT / ADD_MESSAGE
- **LocalStorage** (6): saveChats / loadChats, валидация схемы, обработка битого JSON
- **Компоненты** (13): InputArea (5) — отправка/Enter/Shift+Enter/Stop, Message (5) — user/assistant/system/копирование, Sidebar (3) — фильтрация/удаление

Запуск:
```bash
npm run test        # watch-режим
npm run test:run    # однократный прогон
```

## Оптимизации

- **Code Splitting**: React.lazy + Suspense для Sidebar, SettingsPanel и ChatWindow (отдельные чанки)
- **Bundle Splitting**: react-markdown и highlight.js вынесены в отдельный чанк `markdown` через Vite manualChunks
- **Мемоизация**: React.memo (ChatItem), useMemo (фильтрация чатов), useCallback (обработчики)
- **Error Boundaries**: изоляция ошибок в области сообщений, кнопка "Повторить"

Интерактивный отчёт анализа бандла находится в `docs/bundle-stats.html` (откройте в браузере).

## Деплой

Приложение развёрнуто на Vercel: https://gigachat-sigma.vercel.app

- `vercel.json` содержит rewrites для проксирования API-запросов (`/api/auth` → OAuth SberBank, `/api/gigachat/*` → GigaChat API) и SPA-fallback
- В текущем деплое `VITE_GIGACHAT_AUTH_KEY` **не задан** — каждый пользователь вводит свои credentials в форме авторизации, чтобы не расходовать чужую квоту
