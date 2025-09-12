import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaWallet, FaBars, FaTimes, FaHome, FaPlusCircle, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://personalfinanceintern-backend.onrender.com';

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]);

  const toggleMenu = () => setIsOpen(prev => !prev);

  const handleLogout = async () => {
    try {
      await axios.post(`${backendUrl}/api/users/logout`, {}, { withCredentials: true });
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const loggedInNavItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <FaHome className="mr-2" /> },
    { path: '/add', name: 'Add Transaction', icon: <FaPlusCircle className="mr-2" /> },
  ];

  return (
    <nav className="bg-gradient-to-r from-green-600 to-teal-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center text-white text-xl font-bold">
            <FaWallet className="h-8 w-8 mr-2" />
            FinanceTracker
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {loggedInNavItems.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                      location.pathname === item.path
                        ? 'bg-green-700 text-white'
                        : 'text-green-100 hover:bg-green-500 hover:text-white'
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}

                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-green-100 hover:bg-green-500 hover:text-white transition duration-300"
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/register"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-green-100 hover:bg-green-500 hover:text-white transition duration-300"
              >
                <FaUserPlus className="mr-2" />
                Register
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-green-100 hover:text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-green-700">
          {isLoggedIn ? (
            <>
              {loggedInNavItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition duration-300 ${
                    location.pathname === item.path
                      ? 'bg-green-800 text-white'
                      : 'text-green-100 hover:bg-green-600 hover:text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}

              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-green-100 hover:bg-green-600 hover:text-white transition duration-300 w-full text-left"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/register"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-green-100 hover:bg-green-600 hover:text-white transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              <FaUserPlus className="mr-2" />
              Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
