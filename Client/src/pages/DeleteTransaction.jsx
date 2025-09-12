import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaTrash, FaTimes, FaExclamationTriangle } from 'react-icons/fa';

const DeleteTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [transaction, setTransaction] = useState(null);

   const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://personal-finance-intern.vercel.app";


  useEffect(() => {
    fetchTransaction();
  }, [id]);

  const fetchTransaction = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/transactions/${id}`, {withCredentials: true});
      setTransaction(response.data.transaction);
      setError(null);
    } catch (err) {
      console.error('Error fetching transaction:', err);
      setError('Failed to fetch transaction. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await axios.delete(`${backendUrl}/api/transactions/${id}`, {withCredentials: true});
      navigate('/dashboard');
    } catch (err) {
      console.error('Error deleting transaction:', err);
      setError('Failed to delete transaction. Please try again later.');
    } finally {
      setDeleting(false);
    }
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Loading transaction data...</p>
        </div>
      </div>
    );
  }

  if (error && !transaction) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md">
          <p className="font-medium">{error}</p>
          <Link
            to="/"
            className="mt-4 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg inline-block"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-800 mr-4"
          >
            <FaArrowLeft className="text-xl" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Delete Transaction</h1>
        </div>

        {/* Confirmation Card */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <FaExclamationTriangle className="text-red-600 text-xl mr-3" />
              <h2 className="text-lg font-semibold text-red-800">Warning: This action cannot be undone</h2>
            </div>
            <p className="text-red-600 mt-2">
              You are about to permanently delete this transaction. This action cannot be reversed.
            </p>
          </div>

          {transaction && (
            <div className="border border-gray-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Transaction Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Title</p>
                  <p className="font-medium">{transaction.title}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Amount</p>
                  <p className={`font-medium ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(transaction.amount)}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-medium">{transaction.category}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-medium">{formatDate(transaction.date)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="font-medium">
                    {transaction.amount >= 0 ? 'Income' : 'Expense'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <div className="flex space-x-4">
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium py-2.5 px-6 rounded-lg flex items-center"
            >
              <FaTrash className="mr-2" />
              {deleting ? 'Deleting...' : 'Confirm Delete'}
            </button>
            
            <Link
              to="/"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2.5 px-6 rounded-lg flex items-center"
            >
              <FaTimes className="mr-2" />
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTransaction;
