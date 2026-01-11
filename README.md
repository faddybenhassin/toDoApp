# ToDo App ✅

A simple full-stack ToDo application with user authentication. This project consists of:

- **backend/** — Node.js + Express API with MongoDB (Mongoose) and JWT auth
- **frontend/** — React (Vite) single-page app

---

## Features ✨

- Register / Login with JWT-based authentication
- Create, read, update, and delete (CRUD) todo items (per-user)
- Simple, responsive UI built with React

---

## Tech Stack 🔧

- Backend: Node.js, Express, Mongoose (MongoDB), JWT, bcrypt
- Frontend: React, Vite
- Dev tools: nodemon, eslint

---

## Prerequisites ✅

- Node.js (v16+ recommended)
- npm or yarn
- A MongoDB instance (local or Atlas)

---

## Environment Variables

Backend (create a `.env` file at `backend/.env`):

```
mongoURI=<your MongoDB connection string>
jwtSecret=<a strong secret key>
port=5000 # optional
```

Frontend (create a `.env` file at `frontend/.env`):

```
VITE_API_URL=http://localhost:5000
```

---

## Setup & Run (Development) 🚀

1. Clone the repo:

   git clone <repo-url>
   cd toDoApp

2. Backend:

   cd backend
   npm install
   # start in dev mode (nodemon)
   npm run dev

   The API will listen on the port in `backend/config/key.js` (default: 5000).

3. Frontend:

   cd ../frontend
   npm install
   npm run dev

   Visit the Vite dev URL (usually http://localhost:5173).

---

## API Overview (important endpoints) 📡

- POST /auth/register — register a new user
  - Body: { user: string, pwd: string }
- POST /auth/login — login and receive a JWT
  - Body: { user: string, pwd: string }
  - Successful response: { token: "<jwt>" }

Protected todo endpoints (require `Authorization: Bearer <token>` header):

- GET /api/todo — list all todos for the authenticated user
- POST /api/todo — create a todo: { text: string }
- GET /api/todo/:id — get a single todo by id
- PATCH /api/todo/:id — update a todo: { text?: string, isDone?: boolean }
- DELETE /api/todo/:id — delete a todo

---

## Example: authenticate and call an endpoint (curl)

1) Login and save token:

```
TOKEN=$(curl -s -X POST http://localhost:5000/auth/login -H "Content-Type: application/json" -d '{"user":"alice","pwd":"password"}' | jq -r '.token')
```

2) Create a todo:

```
curl -X POST http://localhost:5000/api/todo -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"text":"Buy milk"}'
```

---

## Notes & Improvements 💡

- Increase bcrypt salt rounds (current value in `backend/routes/auth.js` is low) for stronger password hashing.
- Add better input validation and user-friendly error messages.
- Add tests and CI configuration.
- Consider rate limiting and stronger error handling for production.

---

## Contributing 🤝

1. Fork the repository
2. Create a feature branch
3. Add tests and documentation for your changes
4. Open a pull request describing the change

---

## License & Contact

This project is provided as-is. If you have questions or want to contribute, open an issue or a PR.

---

Happy hacking! ✨
