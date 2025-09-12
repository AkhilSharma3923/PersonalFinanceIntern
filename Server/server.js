import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/database.js';
import transactionRouter from './routes/transactionRoutes.js';
import userRouter from './routes/userRoutes.js'; // Add this import

const app = express();

// Connect to MongoDB
await connectDB();

// Middlewares

// https://personal-finance-intern-front.vercel.app
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // allow cookies
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Test root route
app.get('/', (req, res) => {
    res.send('Welcome to the Personal Finance Tracker API');
});

// Mount routers
app.use('/api/transactions', transactionRouter);
app.use('/api/users', userRouter);  // Mount user routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
