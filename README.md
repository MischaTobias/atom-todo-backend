# Todo App - Backend

This is the backend API for the Todo App, handling user authentication and task management.

## 🚀 Content

- [API Documentation](#api-documentation)
- [Built With](#built-with)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Best Practices](#best-practices)

## 📖 API Documentation

Base URL: `https://us-central1-atom-todo-app-65966.cloudfunctions.net/api`

| Method | Endpoint    | Description       | Auth Required |
| ------ | ----------- | ----------------- | ------------- |
| POST   | /auth/login | Log in with email | ❌            |
| GET    | /tasks      | Get user tasks    | ✅            |
| POST   | /tasks      | Create a new task | ✅            |
| PUT    | /tasks/{id} | Update a task     | ✅            |
| DELETE | /tasks/{id} | Delete a task     | ✅            |

## 🛠 Built With

- **Node.js 22** - JavaScript runtime
- **Express.js** - Fast and minimalist web framework
- **TypeScript** - Strongly typed JavaScript
- **Firestore** - NoSQL database for storing tasks and users
- **JWT Authentication** - Secure user sessions

## ✅ Features

- User authentication using JWT
- CRUD operations for tasks
- Middleware for authentication and error handling
- RESTful API design
- Firestore integration for real-time data storage

## 📥 Installation

```sh
git clone https://github.com/MischaTobias/atom-todo-backend
cd atom-todo-backend/functions
npm install
```

## 🚀 Usage

1. Start the server (use firebase emulators for local development).

```sh
npm run serve
```

2. Use Postman or the [frontend app](https://github.com/MischaTobias/atom-todo-frontend) to interact with the API.

## 📌 Best Practices

- Follow Clean Code principles (modular services, controllers, routes)
- Use Dependency Injection with TypeScript for better scalability
- Handle authentication securely with JWT middleware
- Use Environment Variables (.env) for secrets and config
- Follow RESTful API conventions
- Use proper error handling with Express middleware
