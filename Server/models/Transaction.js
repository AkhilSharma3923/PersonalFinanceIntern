import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,  // Reference to the user
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    }
}, {
    timestamps: true,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
