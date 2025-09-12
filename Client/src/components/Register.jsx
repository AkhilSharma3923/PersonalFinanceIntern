import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaWallet, FaChartLine, FaPiggyBank } from 'react-icons/fa';

const Register = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://personal-finance-intern.vercel.app";

  const features = [
    { title: "Expense Tracking", description: "Monitor every transaction with precision", icon: <FaWallet className="text-green-500 w-6 h-6" /> },
    { title: "Financial Insights", description: "Get actionable insights from your spending patterns", icon: <FaChartLine className="text-green-500 w-6 h-6" /> },
    { title: "Goal Management", description: "Achieve your financial dreams faster", icon: <FaPiggyBank className="text-green-500 w-6 h-6" /> },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const endpoint = isRegister ? '/api/users/register' : '/api/users/login';
      const { data } = await axios.post(`${backendUrl}${endpoint}`, { name, email, password }, { withCredentials: true });
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden bg-gray-50">
      {/* Left - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-12 h-screen">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center shadow-md">
              <FaWallet className="text-white text-2xl" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">{isRegister ? "Create Account" : "Welcome Back"}</h1>
          <p className="text-gray-500 text-center mb-6">{isRegister ? "Join thousands mastering their finances" : "Sign in to continue your journey"}</p>

          <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
            {error && <div className="bg-red-50 text-red-600 px-4 py-2 rounded mb-4 text-sm">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                />
              )}
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-teal-700 transition disabled:opacity-50"
              >
                {loading ? "Processing..." : isRegister ? "Create Account" : "Sign In"}
              </button>
            </form>

            <p className="text-center text-gray-500 mt-4 text-sm">
              {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
              <button onClick={() => setIsRegister(!isRegister)} className="text-green-600 font-semibold hover:text-green-700">
                {isRegister ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right - Features (Visible only on large screens) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 to-teal-600 text-white p-12 flex-col justify-center h-screen overflow-hidden">
        <h2 className="text-3xl font-bold mb-6">Why Choose FinanceTracker?</h2>
        <div className="space-y-6">
          {features.map((f, i) => (
            <div key={i} className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                {f.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="text-green-100 text-sm">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Register;