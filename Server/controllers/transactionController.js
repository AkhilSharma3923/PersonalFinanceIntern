import Transaction from '../models/Transaction.js';

// Create a new transaction
export const createTransaction = async (req, res) => {
    try {
        const { title, amount, date, category } = req.body;

        if (!title || !amount || !date || !category) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        // Create transaction and link to logged-in user
        const transaction = await Transaction.create({
            user: req.user._id,  // <-- link to logged-in user
            title,
            amount,
            date,
            category
        });

        res.status(201).json({
            success: true,
            message: 'Transaction created successfully',
            transaction
        });
    } catch (error) {
        console.error('Error creating transaction:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
};


// Get all transactions
export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user._id }) // only user's transactions
            .sort({ date: -1 });

        res.status(200).json({
            success: true,
            message: 'Transactions fetched successfully',
            transactions,
            count: transactions.length,
        });
    } catch (error) {
        console.error('Error fetching transactions:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
};


// Get a single transaction by ID
export const getTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findOne({ _id: id, user: req.user._id });

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: 'Transaction not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Transaction fetched successfully',
            transaction
        });
    } catch (error) {
        console.error('Error fetching transaction:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
};


// Update a transaction by ID
export const updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, amount, date, category } = req.body;

        const transaction = await Transaction.findOneAndUpdate(
            { _id: id, user: req.user._id },  // ensure user owns transaction
            { title, amount, date, category },
            { new: true, runValidators: true }
        );

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: 'Transaction not found or not authorized',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Transaction updated successfully',
            transaction
        });
    } catch (error) {
        console.error('Error updating transaction:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
};


// Delete a transaction by ID
export const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findOneAndDelete({ _id: id, user: req.user._id });

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: 'Transaction not found or not authorized',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Transaction deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting transaction:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
};

