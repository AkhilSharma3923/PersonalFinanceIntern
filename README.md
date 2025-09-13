
````markdown
# 💸 Personal Finance Tracker (MERN Stack)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)  
[![Frontend](https://img.shields.io/badge/Frontend-React-blue)](https://reactjs.org/)  
[![Backend](https://img.shields.io/badge/Backend-Node.js-green)](https://nodejs.org/)  
[![Database](https://img.shields.io/badge/Database-MongoDB-brightgreen)](https://www.mongodb.com/)

> Effortlessly manage your personal finances with a **modern, responsive, and full-stack Finance Tracker** built on the MERN stack. Track income, expenses, and visualize your financial health in a sleek, intuitive dashboard.

---

## 🌟 Key Features

* **Full CRUD Operations**  
  Add, edit, view, and delete transactions with details like title, amount, date, and category.

* **Secure User Authentication**  
  * Register & login safely with JWT-based authentication stored in cookies.  
  * Passwords hashed securely with bcrypt.  
  * Role-based access ensures each user only manages their own data.

* **Interactive Dashboard & Insights**  
  * Color-coded income (green) and expenses (red).  
  * Real-time summary: total income, total expenses, and balance overview.  
  * Modern, responsive design using React and Tailwind CSS.

* **Professional API Architecture**  
  RESTful API with clean endpoints for users and transactions, optimized for scalability and maintainability.

* **Intuitive UI/UX**  
  Smooth navigation, responsive tables, and forms that work seamlessly across devices.

---

## 🛠 Tech Stack

| Frontend       | Backend            | Database | Tools & Libraries       |
| -------------- | ----------------- | -------- | ---------------------- |
| React.js       | Node.js            | MongoDB  | Axios                  |
| Tailwind CSS   | Express.js         | Mongoose | Postman                |
| React Router   | JWT Authentication |          | VS Code                |

---

## 🚀 Live Demo

Experience it live:  
🌐 [https://personal-finance-intern-front.vercel.app](https://personal-finance-intern-front.vercel.app)

---

## 🧱 Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/AkhilSharma3923/PersonalFinanceIntern.git
cd PersonalFinanceIntern
````

### 2️⃣ Backend Setup

```bash
cd Server
npm install
```

Create a `.env` file in `/Server` with:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

Start the backend server:

```bash
npm run dev
```

Backend runs at ➔ `http://localhost:3000`

---

### 3️⃣ Frontend Setup

```bash
cd Client
npm install
npm run dev
```

Frontend runs at ➔ `http://localhost:5173` (or default React port)

---

## ⚡ How to Use

1. Open the frontend in your browser.
2. Register a new account or login.
3. Use the dashboard to:

   * Add, edit, and delete transactions.
   * Track income vs. expenses with clear visuals.
   * Monitor your balance and financial trends instantly.

---

## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint              | Description         |
| ------ | --------------------- | ------------------- |
| POST   | `/api/users/register` | Register a new user |
| POST   | `/api/users/login`    | Login a user        |
| POST   | `/api/users/logout`   | Logout a user       |

### ✅ Transactions

| Method | Endpoint                | Description               |
| ------ | ----------------------- | ------------------------- |
| POST   | `/api/transactions`     | Create a transaction      |
| GET    | `/api/transactions`     | Get all user transactions |
| GET    | `/api/transactions/:id` | Get a transaction by ID   |
| PUT    | `/api/transactions/:id` | Update a transaction      |
| DELETE | `/api/transactions/:id` | Delete a transaction      |

---

## 📜 License

MIT License – freely use, modify, and distribute.

---

## 📞 Contact

👤 **Akhil Sharma**
