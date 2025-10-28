# 🐾 PetHub Dashboard

**PetHub** — это демонстрационный **Fullstack-проект**, объединяющий минималистичный backend на Node.js (без фреймворков) и интерактивный frontend на React.
Он создан для мониторинга микросервисов, проверки статуса развернутых сервисов через **Render API** и демонстрации простого взаимодействия с базой данных **PostgreSQL**.

---

## 🚀 Основные возможности

- 💬 Хранение и отображение комментариев в базе PostgreSQL
- 📡 REST API для работы с комментариями (`/api/comments`)
- 🧠 Проверка состояния микросервиса (`/api/status`)
- 🧭 Мониторинг Render API — статус деплоев и сервисов (`/api/render-services`)
- 🧩 Минималистичный React Dashboard (Header / Sidebar / Main / Footer)
- 🔄 Автообновление статусов каждые 10 секунд

---

## 🧱 Технологии

| Область            | Используемые технологии                            |
| ------------------ | -------------------------------------------------- |
| **Frontend**       | React 19, Webpack 5, Babel                         |
| **Backend**        | Node.js (http, fs, https, url), PostgreSQL, dotenv |
| **База данных**    | PostgreSQL                                         |
| **API интеграция** | Render REST API                                    |
| **Инфраструктура** | Render.com, Docker, GitHub                         |

---

## 🗂️ Структура проекта

```bash
PetHub/
│
├── backend/
│   ├── server.js               # Основной сервер Node.js
│   ├── db/
│   │   ├── pool.js             # Подключение к PostgreSQL
│   │   └── testConnection.js   # Проверка подключения
│   ├── .env                    # Переменные окружения
│   ├── Dockerfile              # Образ для Render
│   └── package.json
│
├── frontend/
│   ├── components/
│   │   └── AppDashboard/
│   │       ├── Header/
│   │       ├── Sidebar/
│   │       ├── Main/
│   │       ├── Footer/
│   │       └── RenderServices/ # Мониторинг Render API
│   ├── AppDashboard.jsx
│   ├── AppDashboard.css
│   ├── index.html
│   ├── dist/                   # Сборка Webpack
│   └── package.json
│
└── README.md
```

---

## ⚙️ Переменные окружения (.env)

Для корректной работы необходимо создать файл `.env` в директории **backend**:

```env
DB_HOST=your-db-host
DB_NAME=your-db-name
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_PORT=5432

RENDER_API_KEY=your-render-api-key
PORT=3000
```

> ⚠️ `RENDER_API_KEY` — ключ API Render, создаётся в [Render Dashboard → API Keys](https://render.com/docs/api).

---

## 🧠 API Backend

| Метод  | Путь                   | Описание                        |
| ------ | ---------------------- | ------------------------------- |
| `GET`  | `/api/comments`        | Получить список комментариев    |
| `POST` | `/api/comments`        | Добавить комментарий            |
| `GET`  | `/api/status`          | Проверить статус микросервиса   |
| `GET`  | `/api/render-services` | Получить список сервисов Render |

---

## 🪶 Пример запроса к API

```bash
curl https://pethub-o2ap.onrender.com/api/status
```

```json
{
  "service": "microchat",
  "status": "ok",
  "messagesCount": 42,
  "timestamp": "2025-10-20T10:22:11.000Z"
}
```

---

## 💡 Запуск проекта локально

```bash
# 1. Установка зависимостей
cd backend && npm install
cd ../frontend && npm install

# 2. Запуск backend
cd ../backend
npm run dev

# 3. Запуск frontend
cd ../frontend
npm start
```

Открой [http://localhost:8080](http://localhost:8080), чтобы увидеть дашборд.

---

## 🌐 Деплой

**Платформа:** [Render.com](https://render.com)
**Приложение:** [PetHub на Render](https://pethub-o2ap.onrender.com)
**GitHub:** [https://github.com/Peccopa/PetHub](https://github.com/Peccopa/PetHub)

---

## 👨‍💻 Автор

**Peccopa**
📎 [GitHub](https://github.com/Peccopa)

---

## 🧩 TODO / Roadmap

- [ ] Добавить авторизацию пользователей
- [ ] Интегрировать WebSocket для чата
- [ ] Добавить графики активности в Dashboard
- [ ] Поддержка нескольких микросервисов

---

© 2025 **PetHub Project**
