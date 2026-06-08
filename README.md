# 🚀 Crypto Alert System

A full-stack web application built using **FastAPI**, **React.js**, **PostgreSQL**, **JWT Authentication**, and **Role-Based Access Control (RBAC)**.

The system provides secure user authentication, role-based authorization, protected API routes, and complete product management functionality for administrators.

---

## ✨ Features

### 🔐 Authentication & Authorization

* User Registration
* User Login
* JWT Token Authentication
* Password Hashing with Bcrypt
* Protected Routes
* Role-Based Access Control (RBAC)

### 👤 User Features

* Secure Registration
* Secure Login
* User Profile
* Dashboard Access
* View Products

### 👑 Admin Features

* Create Products
* Update Products
* Delete Products
* Manage Product Records
* Access Admin Dashboard
* Role-Based Product Management

### 📊 Dashboard

* Welcome Dashboard
* Product Statistics
* User Role Information
* Activity Overview
* Responsive Sidebar Navigation

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Bootstrap 5
* CSS3

### Backend

* FastAPI
* SQLAlchemy
* JWT Authentication
* Passlib (Bcrypt)
* Pydantic

### Database

* PostgreSQL (Neon)

---

## 📁 Project Structure

```bash
CryptoAlertSystem
│
├── backend
│   ├── app
│   │   ├── database
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── schemas
│   │   ├── utils
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🗄️ Database Schema

### Users Table

| Column   | Type    | Description     |
| -------- | ------- | --------------- |
| id       | SERIAL  | Primary Key     |
| name     | VARCHAR | User Name       |
| email    | VARCHAR | Unique Email    |
| password | VARCHAR | Hashed Password |
| role     | VARCHAR | user/admin      |

---

### Products Table

| Column      | Type    | Description         |
| ----------- | ------- | ------------------- |
| id          | SERIAL  | Primary Key         |
| name        | VARCHAR | Product Name        |
| description | VARCHAR | Product Description |
| price       | INTEGER | Product Price       |

---

## 🔑 API Endpoints

### Authentication

| Method | Endpoint              |
| ------ | --------------------- |
| POST   | /api/v1/auth/register |
| POST   | /api/v1/auth/login    |

### Protected Routes

| Method | Endpoint        |
| ------ | --------------- |
| GET    | /api/v1/profile |
| GET    | /api/v1/admin   |

### Products

| Method | Endpoint              |
| ------ | --------------------- |
| GET    | /api/v1/products      |
| GET    | /api/v1/products/{id} |
| POST   | /api/v1/products      |
| PUT    | /api/v1/products/{id} |
| DELETE | /api/v1/products/{id} |

---

## ⚙️ Local Setup

### Clone Repository

```bash
git clone https://github.com/shravanibadabe/CryptoAlertSystem.git
```

```bash
cd CryptoAlertSystem
```

---

## Backend Setup

```bash
cd backend
```

Create Virtual Environment

```bash
python -m venv venv
```

Activate Environment

```bash
venv\Scripts\activate
```

Install Dependencies

```bash
pip install -r requirements.txt
```

Create `.env`

```env
DATABASE_URL=your_database_url
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

Run Backend

```bash
uvicorn app.main:app --reload
```

Backend URL:

```bash
http://127.0.0.1:8000
```

---

## Frontend Setup

```bash
cd frontend
```

Install Packages

```bash
npm install
```

Run Frontend

```bash
npm run dev
```

Frontend URL:

```bash
http://localhost:5173
```

---

## 🔒 Security Features

* JWT Authentication
* Password Hashing (Bcrypt)
* Protected Routes
* Role-Based Authorization
* Admin Route Protection
* Secure API Access

---

## 📸 Screenshots

### Login Page

Add screenshot here


![Login](screenshots/login.png)


### Dashboard

Add screenshot here


![Dashboard](screenshots/dashboard.png)


### Product Management

Add screenshot here


![Products](screenshots/product.png)


### User Profile

Add screenshot here

![Profile](screenshots/profile.png)


---

## 🎯 Future Enhancements

* Product Search
* Product Categories
* Pagination
* Advanced Analytics
* Export Reports
* Dark Mode
* Activity Logs
* User Management Module

---

## 👩‍💻 Author

**Shravani Badabe**

Aspiring Software Developer passionate about:

* Full Stack Development
* Data Analytics
* Artificial Intelligence
* Cloud Technologies

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
