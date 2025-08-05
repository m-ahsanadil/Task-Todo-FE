# Task-Todo-FE

Frontend React + TypeScript project for managing user registration, login, and a To-Do dashboard with full CRUD functionality.

---

## Features
- User Registration with form validation and API integration
- User Login with validation, API integration, and JWT token storage
- To-Do Dashboard to create, read, update, and delete tasks
- Tailwind CSS for responsive, clean UI styling
- TypeScript for type safety

---

## Screenshots

### User Registration
![Register Page](./screenshots/register.png)

### User Login
![Login Page](./screenshots/login.png)

### Todo Dashboard
![Todo Dashboard](./screenshots/todo-dashboard.png)

### Create New Todo
![Create Todo](./screenshots/create-todo.png)

### Update Todo
![Update Todo](./screenshots/update-todo.png)

### Delete Todo
![Delete Todo](./screenshots/delete-todo.png)

### Mark Todo as Completed
![Complete Todo](./screenshots/complete-todo.png)

---

## Getting Started

### Prerequisites
- Node.js (v16 or later recommended)
- Backend API running and accessible (default assumed at `http://localhost:3000`)

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

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser to:
   ```
   http://localhost:3000
   ```

---

## Available Scripts

- `npm start` — Runs the app in development mode
- `npm test` — Launches test runner in watch mode
- `npm run build` — Builds the app for production
- `npm run eject` — Ejects configuration (one-way operation)

---

## Project Structure

- `src/pages` — Contains Register, Login, and Dashboard components
- `src/index.css` — Tailwind CSS imports
- `tailwind.config.js` — Tailwind configuration
- `postcss.config.mjs` — PostCSS setup

---

## API Endpoints (Backend)

Ensure your backend supports:
- `POST /users` — User registration
- `POST /login` — User login and token issuance
- `GET /todos` — Fetch user todos
- `POST /todos` — Create todo
- `PUT /todos/:id` — Update todo
- `DELETE /todos/:id` — Delete todo

---

## Notes

- JWT token stored in `localStorage` for authenticated requests
- React Router (if used) handles navigation between pages
- Add auth protection and token in API calls as next steps

---

## License

MIT License
