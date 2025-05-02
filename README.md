# To-Do App (MERN + Fastify + Firebase Auth)

A monorepo To-Do List application with a PostgreSQL backend using Fastify, Firebase authentication, and modern frontend tools.

---

## DEMO

[![Demo Video](/apps/frontend/public/Shared-to-do.png)](https://youtu.be/a9wPPhdLRlA)

---

## 🔧 Tech Stack

-   **Frontend**: React (Vite)
-   **Backend**: Node.js, Fastify, TypeScript
-   **Database**: PostgreSQL
-   **Authentication**: Firebase Authentication
-   **CI/CD & Containerization**: Docker, GitHub Actions (optional)

---

## 📁 Folder Structure

```
apps/
  backend/           # Fastify + PostgreSQL API
  frontend/          # React + Vite frontend

packages/
  shared/            # Shared types/utilities
```

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```

### 2. Setup Environment Variables

#### Backend (`apps/backend/.env`)

```
DATABASE_URL=postgres://user:password@localhost:5432/todo_db
FIREBASE_PROJECT_ID=your-firebase-project-id
```

#### Frontend (`apps/frontend/.env`)

```
VITE_API_URL=http://localhost:3001
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
```

---

## 🔒 Authentication Flow

-   Uses Firebase Auth on the frontend
-   Firebase ID Token is attached to every request as a Bearer token
-   Backend verifies this token and either:
    -   Logs in existing users
    -   Or signs up new users (if calling `/signup`)

---

## 📦 API Endpoints

### Auth

-   `GET /users/me` - Login (auto-signup if user doesn't exist)
-   `POST /users/signup` - Explicit signup

### Tasks

-   `GET /tasks?filter=all|my|shared`
-   `POST /tasks`
-   `PUT /tasks/:id`
-   `DELETE /tasks/:id`
-   `POST /tasks/share`

---

## 🐳 Docker (Optional)

```bash
docker-compose up --build
```

---

## 🧪 Testing

-   Backend tests with `vitest`
-   Frontend tests with `jest` or `react-testing-library` (TBD)

---

## 📄 Author

Developed by Aman Dubey

