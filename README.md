# GigaChat UI

Веб-интерфейс для работы с GigaChat API

## Демо


Приложение позволяет:
- Авторизоваться с помощью credentials GigaChat API
- Вести несколько параллельных чатов с AI-ассистентом
- Настраивать модель, температуру, top-p, max_tokens, repetition_penalty и system prompt
- Переключать светлую/тёмную тему
- Искать по истории чатов

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

## Запуск локально

```bash
# 1. Клонируйте репозиторий
git clone https://github.com/<your-username>/gigachat.git
cd gigachat

# 2. Установите зависимости
npm install

# 3. Создайте файл .env на основе шаблона
cp .env.example .env

# 4. Заполните переменные окружения (см. таблицу ниже)

# 5. Запустите dev-сервер
npm run dev
```

Приложение откроется по адресу `http://localhost:5173`

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

## Оптимизации

- **Code Splitting**: React.lazy + Suspense для Sidebar, SettingsPanel и ChatWindow (отдельные чанки)
- **Bundle Splitting**: react-markdown и highlight.js вынесены в отдельный чанк `markdown` через Vite manualChunks
- **Мемоизация**: React.memo (ChatItem), useMemo (фильтрация чатов), useCallback (обработчики)
- **Error Boundaries**: Изоляция ошибок в области сообщений, кнопка "Повторить"

Скриншот анализа бандла находится в `docs/bundle-stats.html` (откройте в браузере).

## Деплой

Приложение настроено для деплоя на Vercel:
- `vercel.json` содержит rewrites для проксирования API-запросов и SPA-маршрутизации
- Переменные окружения задаются в настройках проекта на Vercel
