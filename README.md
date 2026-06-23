# Full-Stack Todo List Application

A modern, responsive full-stack Todo List application built with a **React + Vite** frontend, an **Express.js** backend, and a **MySQL** database.

---

## 📂 Project Structure

The project is structured into two main directories:

- [**`todo_backend/`**](file:///d:/todo_list/todo_backend): Express.js REST API server using raw MySQL queries for data persistence.
- [**`todo_frontend/`**](file:///d:/todo_list/todo_frontend): React web application built with Vite and styled with CSS.

---

## 🛠️ Prerequisites

Before running the application, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MySQL Server](https://www.mysql.com/)

---

## 🚀 Getting Started

### 1. Database Setup

1. Start your local MySQL server.
2. Initialize the database schema. In your terminal, run the SQL script located in the backend folder:
   ```bash
   mysql -u root -p < todo_backend/schema.sql
   ```
   *Note: This creates the `todolist` database and a `Todos` table.*

### 2. Backend Configuration & Setup

1. Navigate to the backend directory:
   ```bash
   cd todo_backend
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. (Optional) Configure environment variables. The server uses default connection settings if not provided:
   - `DB_HOST` (Default: `localhost`)
   - `DB_USER` (Default: `root`)
   - `DB_PASSWORD` (Default: `manager`)
   - `DB_NAME` (Default: `todolist`)
   - `DB_PORT` (Default: `3306`)
   - `PORT` (Default: `4000`)
4. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend will be running at `http://localhost:4000`.

### 3. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd todo_frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The application will be running at `http://localhost:5173`. Open this URL in your web browser.

---

## 🔌 API Endpoints

The Express server exposes the following REST endpoints under `/api/todos`:

| HTTP Method | Endpoint | Description | Request Body Example |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/todos` | Retrieve all todo items (sorted newest first) | *None* |
| **POST** | `/api/todos` | Create a new todo item | `{"title": "Buy groceries"}` |
| **PUT** | `/api/todos/:id` | Update an existing todo (title, completed status) | `{"completed": true}` |
| **DELETE** | `/api/todos/:id` | Delete a todo item by ID | *None* |

---

## ⚙️ Architecture & Features

### Backend (`todo_backend`)
- **Express.js & CORS**: Configured to handle requests securely and support cross-origin sharing.
- **MySQL Pool Connection**: Uses connection pooling via `mysql2/promise` for robust performance.
- **Raw SQL execution**: Handles data insertion, selection, updating, and deletion directly through structured SQL statements.

### Frontend (`todo_frontend`)
- **Vite Proxy**: Configured in [`vite.config.js`](file:///d:/todo_list/todo_frontend/vite.config.js) to redirect `/api/*` calls to the backend running on port 4000 to prevent CORS configuration issues in development.
- **React Components**: Structured into components:
  - [`TodoForm`](file:///d:/todo_list/todo_frontend/src/components/TodoForm.jsx): Add new tasks.
  - [`TodoList`](file:///d:/todo_list/todo_frontend/src/components/TodoList.jsx): Lists the items.
  - [`TodoItem`](file:///d:/todo_list/todo_frontend/src/components/TodoItem.jsx): Displays, toggles, edits, and deletes individual items.
