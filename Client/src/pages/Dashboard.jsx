import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  FaPlusCircle, FaEdit, FaTrash, FaMoneyBillWave, 
  FaMoneyCheckAlt, FaChartLine, FaFilter, 
  FaSearch, FaSyncAlt, FaPiggyBank 
} from 'react-icons/fa';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [timeRange, setTimeRange] = useState('month');
  const [chartData, setChartData] = useState({});

    const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://personalfinanceintern-backend.onrender.com";



  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    filterTransactions();
    prepareChartData();
  }, [transactions, searchTerm, filterType, timeRange]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/transactions`,  { withCredentials: true });
      setTransactions(response.data.transactions || []);
      setFilteredTransactions(response.data.transactions || []);
      calculateSummary(response.data.transactions || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError('Failed to fetch transactions. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const calculateSummary = (transactions) => {
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach((t) => {
      if (t.amount >= 0) totalIncome += t.amount;
      else totalExpenses += Math.abs(t.amount);
    });

    setSummary({
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses
    });
  };

  const filterTransactions = useCallback(() => {
    let filtered = transactions;

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(t => 
        filterType === 'income' ? t.amount >= 0 : t.amount < 0
      );
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(term) || 
        t.category.toLowerCase().includes(term)
      );
    }

    // Filter by time range (simplified for demo)
    if (timeRange !== 'all') {
      const now = new Date();
      let startDate;
      
      switch(timeRange) {
        case 'week':
          startDate = new Date(now.setDate(now.getDate() - 7));
          break;
        case 'month':
          startDate = new Date(now.setMonth(now.getMonth() - 1));
          break;
        case 'quarter':
          startDate = new Date(now.setMonth(now.getMonth() - 3));
          break;
        default:
          startDate = new Date(0); // beginning of time
      }
      
      filtered = filtered.filter(t => new Date(t.date) >= startDate);
    }

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, filterType, timeRange]);

 const prepareChartData = useCallback(() => {
  const categories = {};
  const monthlyData = {};

  filteredTransactions.forEach(t => {
    const date = new Date(t.date);
    const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;

    // Monthly Data (keep both income & expenses for trend chart)
    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = { income: 0, expenses: 0 };
    }

    if (t.amount >= 0) {
      monthlyData[monthYear].income += t.amount;
    } else {
      monthlyData[monthYear].expenses += Math.abs(t.amount);
    }

    // Only include expenses for category breakdown
    if (t.amount < 0) {
      const category = t.category || 'Uncategorized';
      if (!categories[category]) {
        categories[category] = 0;
      }
      categories[category] += Math.abs(t.amount);
    }
  });

  // Category chart data (expenses only)
  const categoryLabels = Object.keys(categories);
  const categoryData = Object.values(categories);

  const categoryChartData = {
    labels: categoryLabels,
    datasets: [
      {
        data: categoryData,
        backgroundColor: [
          '#4F46E5', '#10B981', '#EF4444', '#F59E0B',
          '#8B5CF6', '#EC4899', '#06B6D4', '#F97316'
        ],
        borderWidth: 0,
      },
    ],
  };

  // Monthly trend chart data
  const sortedMonths = Object.keys(monthlyData).sort((a, b) => {
    const [aMonth, aYear] = a.split('/').map(Number);
    const [bMonth, bYear] = b.split('/').map(Number);
    return aYear === bYear ? aMonth - bMonth : aYear - bYear;
  });

  const monthlyIncome = sortedMonths.map(month => monthlyData[month].income);
  const monthlyExpenses = sortedMonths.map(month => monthlyData[month].expenses);

  const monthlyChartData = {
    labels: sortedMonths,
    datasets: [
      {
        label: 'Income',
        data: monthlyIncome,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Expenses',
        data: monthlyExpenses,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  setChartData({
    category: categoryChartData,
    monthly: monthlyChartData,
  });
}, [filteredTransactions]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    maintainAspectRatio: false,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Loading your financial data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md">
          <p className="font-medium">{error}</p>
          <button
            onClick={fetchTransactions}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg flex items-center"
          >
            <FaSyncAlt className="mr-2" /> Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Financial Dashboard</h1>
            <p className="text-gray-600 mt-1">Track and manage your finances</p>
          </div>
          <Link
            to="/add"
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center mt-4 md:mt-0"
          >
            <FaPlusCircle className="mr-2" /> Add Transaction
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl shadow-md p-6 border border-green-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-green-700 font-medium">Total Income</p>
                <p className="text-2xl font-bold text-green-800">{formatCurrency(summary.totalIncome)}</p>
                <p className="text-sm text-green-600 mt-1">All time</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FaMoneyCheckAlt className="text-green-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl shadow-md p-6 border border-red-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-red-700 font-medium">Total Expenses</p>
                <p className="text-2xl font-bold text-red-800">{formatCurrency(summary.totalExpenses)}</p>
                <p className="text-sm text-red-600 mt-1">All time</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <FaMoneyBillWave className="text-red-600 text-xl" />
              </div>
            </div>
          </div>

          <div className={`bg-gradient-to-r rounded-xl shadow-md p-6 border ${
            summary.balance >= 0 
              ? 'from-blue-50 to-blue-100 border-blue-100' 
              : 'from-red-50 to-red-100 border-red-100'
          }`}>
            <div className="flex justify-between items-center">
              <div>
                <p className={summary.balance >= 0 ? "text-blue-700 font-medium" : "text-red-700 font-medium"}>
                  Balance
                </p>
                <p className={`text-2xl font-bold ${summary.balance >= 0 ? 'text-blue-800' : 'text-red-800'}`}>
                  {formatCurrency(summary.balance)}
                </p>
                <p className={`text-sm mt-1 ${summary.balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                  Current financial status
                </p>
              </div>
              <div className={`p-3 rounded-full ${summary.balance >= 0 ? 'bg-blue-100' : 'bg-red-100'}`}>
                {summary.balance >= 0 ? (
                  <FaPiggyBank className="text-blue-600 text-xl" />
                ) : (
                  <FaChartLine className="text-red-600 text-xl" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">Income vs Expenses Trend</h2>
  <div className="h-80">
    {chartData.monthly ? (
      <Line 
        data={chartData.monthly} 
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                usePointStyle: true,
                padding: 20,
                font: {
                  size: 12,
                  weight: '500'
                }
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              titleColor: '#1F2937',
              bodyColor: '#1F2937',
              borderColor: '#E5E7EB',
              borderWidth: 1,
              padding: 12,
              boxPadding: 6,
              usePointStyle: true,
              callbacks: {
                label: function(context) {
                  return `${context.dataset.label}: ${formatCurrency(context.raw)}`;
                }
              }
            },
            title: {
              display: true,
              text: 'Monthly Financial Trends',
              font: { 
                size: 16,
                weight: '600'
              },
              padding: {
                bottom: 20
              },
              color: '#1F2937'
            }
          },
          scales: {
            x: {
              grid: {
                display: false,
                drawBorder: false
              },
              ticks: {
                color: '#6B7280',
                font: {
                  size: 11
                },
                maxRotation: 0,
                callback: function(value, index, values) {
                  // Format date as "MMM YY" (e.g., Jan 23)
                  const dateParts = this.getLabelForValue(value).split('/');
                  if (dateParts.length === 2) {
                    const month = new Date(2000, parseInt(dateParts[0]) - 1).toLocaleString('default', { month: 'short' });
                    return `${month} '${dateParts[1].slice(2)}`;
                  }
                  return this.getLabelForValue(value);
                }
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(229, 231, 235, 0.5)',
                drawBorder: false
              },
              ticks: {
                color: '#6B7280',
                font: {
                  size: 11
                },
                callback: function(value) {
                  if (value >= 1000) {
                    return '$' + (value / 1000).toFixed(0) + 'k';
                  }
                  return '$' + value;
                }
              }
            }
          },
          elements: {
            point: {
              radius: 4,
              hoverRadius: 6,
              borderWidth: 2
            },
            line: {
              tension: 0.3,
              borderWidth: 2
            }
          },
          interaction: {
            mode: 'index',
            intersect: false
          }
        }} 
      />
    ) : (
      <div className="h-full flex items-center justify-center text-gray-500">
        No data available for chart
      </div>
    )}
  </div>
</div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Spending by Category</h2>
            <div className="h-80">
              {chartData.category ? (
                <Doughnut 
                  data={chartData.category} 
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      title: {
                        display: true,
                        text: 'Expense Distribution',
                        font: { size: 16 }
                      }
                    }
                  }} 
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  No data available for chart
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Transactions Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">Recent Transactions</h2>
            
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex space-x-2">
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="income">Income</option>
                  <option value="expense">Expenses</option>
                </select>
                
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                </select>
              </div>
            </div>
          </div>

          {filteredTransactions.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500 mb-4">No transactions found.</p>
              <Link
                to="/add"
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg inline-flex items-center"
              >
                <FaPlusCircle className="mr-2" /> Add Your First Transaction
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{transaction.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {transaction.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(transaction.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <span className={transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {formatCurrency(transaction.amount)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          to={`/${transaction._id}/edit`}
                          className="text-blue-600 hover:text-blue-900 mr-4 transition-colors"
                        >
                          <FaEdit className="inline mr-1" /> Edit
                        </Link>
                        <Link
                          to={`/${transaction._id}/delete`}
                          className="text-red-600 hover:text-red-900 transition-colors"
                        >
                          <FaTrash className="inline mr-1" /> Delete
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
