import express from 'express';
import { register, login, logout } from '../controllers/userController.js';
import { isLoggedIn } from '../middleware/auth.js';

const userRouter = express.Router();

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
userRouter.post('/register', register);

// @route   POST /api/users/login
// @desc    Login user and issue token
// @access  Public
userRouter.post('/login', login);

// @route   POST /api/users/logout
// @desc    Logout user and clear cookie
// @access  Private
userRouter.post('/logout', isLoggedIn, logout);

export default userRouter;
