import express from 'express';
import {
    createTransaction,
    getAllTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction
} from '../controllers/transactionController.js';
import { isLoggedIn } from '../middleware/auth.js';

const transactionRouter = express.Router();



transactionRouter.post('/', isLoggedIn , createTransaction);
transactionRouter.get('/', isLoggedIn , getAllTransactions);
transactionRouter.get('/:id', isLoggedIn , getTransactionById);
transactionRouter.put('/:id', isLoggedIn , updateTransaction);
transactionRouter.delete('/:id', isLoggedIn , deleteTransaction);

export default transactionRouter;
