````markdown
# 💸 Personal Finance Tracker (MERN Stack)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)  
[![Frontend](https://img.shields.io/badge/Frontend-React-blue)](https://reactjs.org/)  
[![Backend](https://img.shields.io/badge/Backend-Node.js-green)](https://nodejs.org/)  
[![Database](https://img.shields.io/badge/Database-MongoDB-brightgreen)](https://www.mongodb.com/)

> A modern, responsive, and full-stack **Personal Finance Tracker App** built using the MERN stack (MongoDB, Express, React, Node.js). Effortlessly track income, expenses, and manage transactions — all in one sleek dashboard.

---

## 🌟 Key Features

* ✅ **Full CRUD Operations**  
  Add, view, update, and delete financial transactions (title, amount, date, category).

* ✅ **User Authentication & Authorization**  
  * Register & login securely.  
  * JWT-based authentication stored in cookies.  
  * Passwords hashed with bcrypt.

* ✅ **Personalized Data Access**  
  Each user manages only their own transactions.

* ✅ **Intuitive UI/UX**  
  Built with React and Tailwind CSS for a modern, clean, and responsive interface.

* ✅ **Visual Financial Insights**  
  Color-coded income (green) and expenses (red).  
  Dashboard summary with total income, expenses, and balance overview.

* ✅ **Professional API Structure**  
  RESTful backend using Express, Node.js, and MongoDB.

---

## 🛠 Tech Stack

| Frontend     | Backend            | Database | Others  |
| ------------ | ------------------ | -------- | ------- |
| React.js     | Node.js            | MongoDB  | Axios   |
| Tailwind CSS | Express.js         | Mongoose | Postman |
| React Router | JWT Authentication |          | VS Code |

---

## 🚀 Live Demo

> 🔧 You can deploy your own instance or use my deployed version at:  
> 🌐 [https://personal-finance-intern-front.vercel.app](https://personal-finance-intern-front.vercel.app)

---

## 🧱 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/AkhilSharma3923/PersonalFinanceIntern.git
cd PersonalFinanceIntern
````

---

### 2️⃣ Backend Setup

```bash
cd Server
npm install
```

Create `.env` file in `/Server` with the following variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

Start backend server:

```bash
npm run dev
```

The backend runs at ➔ `http://localhost:3000`

---

### 3️⃣ Frontend Setup

```bash
cd Client
npm install
npm run dev
```

Frontend runs at ➔ `http://localhost:5173` (or default React port)

---

## ⚡ Usage

1. Open your browser and navigate to the frontend URL.
2. Register a new account or login with your credentials.
3. Use the intuitive dashboard to:

   * Add new transactions.
   * Edit existing transactions.
   * Delete transactions.
   * View financial summary at a glance.

---

## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint              | Description         |
| ------ | --------------------- | ------------------- |
| POST   | `/api/users/register` | Register a new user |
| POST   | `/api/users/login`    | Login user          |
| POST   | `/api/users/logout`   | Logout user         |

---

### ✅ Transactions

| Method | Endpoint                | Description                |
| ------ | ----------------------- | -------------------------- |
| POST   | `/api/transactions`     | Create a new transaction   |
| GET    | `/api/transactions`     | Get all user transactions  |
| GET    | `/api/transactions/:id` | Get a transaction by ID    |
| PUT    | `/api/transactions/:id` | Update a transaction by ID |
| DELETE | `/api/transactions/:id` | Delete a transaction by ID |

---

## 📜 License

This project is MIT Licensed – feel free to use, modify, and distribute.

---

## 📞 Contact

👤 **Akhil Sharma**

---

## ⭐ Contribution

Contributions, feedback, and ⭐ stars are always welcome!
Feel free to open issues or submit pull requests.

---

