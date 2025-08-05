# Task-Todo-FE

Frontend React + TypeScript project for managing user registration, login, and a To-Do dashboard with full CRUD functionality.

---

## Features
- User Registration with form validation and API integration
- User Login with validation, API integration, and JWT token storage in localStorage
- To-Do Dashboard to create, read, update, and delete tasks
- Tailwind CSS for responsive, clean UI styling
- TypeScript for type safety

---

## Screenshots

### User Registration
![Register Page](https://raw.githubusercontent.com/m-ahsanadil/Task-Todo-FE/main/public/screenshots/register.png)

### User Login
![Login Page](https://raw.githubusercontent.com/m-ahsanadil/Task-Todo-FE/main/public/screenshots/login.png)

### Create New Todo
![Create Todo](https://raw.githubusercontent.com/m-ahsanadil/Task-Todo-FE/main/public/screenshots/create-todo.png)

### Update Todo
![Update Todo](https://raw.githubusercontent.com/m-ahsanadil/Task-Todo-FE/main/public/screenshots/update-todo.png)

### Delete Todo
![Delete Todo](https://raw.githubusercontent.com/m-ahsanadil/Task-Todo-FE/main/public/screenshots/delete-todo.png)

### Mark Todo as Completed
![Complete Todo](https://raw.githubusercontent.com/m-ahsanadil/Task-Todo-FE/main/public/screenshots/complete-todo.png)

---

## Getting Started

### Prerequisites
- Node.js (v16 or later recommended)
- Backend API running and accessible:
- (Node at `http://localhost:8000`)
- (ASP at `http://localhost:5000`)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/m-ahsanadil/Task-Todo-FE.git
   cd Task-Todo-FE
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   If you encounter dependency conflicts, try:
   ```bash
   npm start --force
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser to:
   ```
   http://localhost:3000
   ```

---

## Available Scripts

- `npm start` — Runs the app in development mode
- `npm test` — Launches test runner in watch mode
- `npm run build` — Builds the app for production

---

# Project Structure

## Core Structure
- *src/components* — Atomic design pattern implementation
- *src/pages* — Main application pages (Register, Login, Dashboard)
- *src/lib* — Utility libraries and shared functions
- *src/types* — TypeScript type definitions
- *src/utils* — Helper functions and utilities

## Component Architecture (Atomic Design)
- *src/components/atoms* — Basic building blocks
  - Button — Reusable button component
  - Input — Form input components
  - Label — Text labels for forms
  - Text — Typography components
  - TextAreaInput — Multi-line text input
- *src/components/molecules* — Simple component combinations
  - FormField — Input + label combinations
  - toast-container — Notification display system
  - TodoItem — Individual todo item display
  - TodoList — Collection of todo items
- *src/components/organisms* — Complex component sections
  - LoginForm — Complete login form with validation
  - RegisterForm — User registration form
  - TodoForm — Todo creation/editing form
- *src/components/templates* — Page layout structures
  - AuthLayout — Layout for authentication pages
  - DashboardLayout — Main application layout
- *src/components/protected-route* — Route protection logic

## Configuration Files
- *index.css* — Tailwind CSS imports and global styles
- *index.tsx* — Application entry point
- *App.tsx* — Main application component
---

## API Endpoints (Backend)

Ensure your backend supports:
- `POST /api/v1/register` — User registration
- `POST /api/v1/login` — User login and token issuance
- `GET /api/v1/todos` — Fetch user todos
- `POST /api/v1/todos` — Create todo
- `PUT /api/v1/todos/:id` — Update todo
- `DELETE /api/v1/todos/:id` — Delete todo

---

## Notes

- JWT token stored in `localStorage` for authenticated requests
- React Router handles navigation between pages
- Add auth protection and token in API calls as next steps

---
> **📱 Backend Repository:** For the server side Todo application experience, check out the backend implementation at [Task-Todo-BE](https://github.com/m-ahsanadil/Task-Todo-BE)
---

## License

This project was developed as part of a company-assigned task.
