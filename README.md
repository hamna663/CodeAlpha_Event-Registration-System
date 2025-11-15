# Event Registration System

![License](https://img.shields.io/badge/License-CC%20BY--ND%204.0-lightgrey.svg)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-blue)

A web-based **Event Registration System** built with **Express.js** and **MongoDB** that allows users to browse events, register for them, and manage their registrations. Event organizers or admins can create and manage events.

---

## 🚀 Features

### User Features
- Browse upcoming events
- View event details
- Register for events
- View and cancel personal registrations

### Admin / Organizer Features
- Create new events
- Update existing events
- Delete events
- View all registrations

### Technical Features
- JWT-based authentication for users
- Password hashing with bcrypt
- RESTful API endpoints
- Request logging with Morgan
- MongoDB database with Mongoose ODM

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|------------|
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ODM) |
| Authentication | JWT (JSON Web Tokens) |
| Middleware | CORS, Body-Parser, Cookie-Parser |
| Dev Tools | Nodemon |

---

## 📂 Project Structure

```
└── 📁EventManagement
    └── 📁src
        └── 📁controllers
            ├── admin.controller.js
            ├── user.controller.js
        └── 📁middleware
            ├── auth.middleware.js
        └── 📁models
            ├── event.model.js
            ├── registration.model.js
            ├── user.model.js
        └── 📁routes
            ├── admin.route.js
            ├── user.route.js
        ├── app.js
        ├── dbConfig.js
    ├── index.js
    ├── LICENSE
    ├── package-lock.json
    └── package.json
```
---

## 📌 API Endpoints

### Authentication
- `POST /api/auth/signup` – Register a new user
- `POST /api/auth/login` – Login and receive JWT token

### Events
- `GET /api/events` – List all events
- `GET /api/events/:id` – Get event details
- `POST /api/events` – Create a new event (Admin/Organizer)
- `PUT /api/events/:id` – Update event (Admin/Organizer)
- `DELETE /api/events/:id` – Delete event (Admin/Organizer)
- `POST /api/events/:id/register` – Register for an event (Authenticated User)

### Registrations
- `GET /api/registrations` – List all of a user's registrations
- `POST /api/registrations/:id/cancel` – Cancel a registration

---

## 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/hamna663/CodeAlpha_Event-Registration-System/.git
cd CodeAlpha_Event-Registration-System
````

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**
   Create a `.env` file based on `.env.example`:

```
PORT=4000
MONGO_URI=mongodb://localhost:27017/
JWT_SECRET_KEY=your_secret_key
```

4. **Start the server**

```bash
npm run dev      # for development (with nodemon)
npm start        # for production
```

Server should be running at `http://localhost:4000`

---

## 💡 Example Requests

**Signup**

```bash
POST /api/auth/signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "StrongPassword123"
}
```

**Login**

```bash
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "StrongPassword123"
}
```

**Register for Event**

```bash
POST /api/events/:id/register
Authorization: Bearer <JWT_TOKEN>
{
  "notes": "Looking forward to this event!"
}
```

## 📄 License

This project is licensed under the **Creative Commons Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0)** License.

* ✅ You may view, copy, and share this project.
* ❌ You may **not modify, distribute derivative works, or alter this project**.

For more details, see the [LICENSE](LICENSE) file.
Full license info: [CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0/)

---

## 👤 Author

**Name**: *Hamna Tariq*

[GitHub](https://github.com/hamna663)

[LinkedIn](https://www.linkedin.com/in/hamna-tariq-0aa312332/)

Project built as part of a backend development practice.
