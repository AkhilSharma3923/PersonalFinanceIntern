import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaWallet, FaChartLine, FaPlusCircle, FaPiggyBank, FaRegSmileBeam, FaMobileAlt, FaShieldAlt, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Home = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "Expense Tracking",
      description: "Easily log your expenses and monitor where your money goes every month.",
      icon: <FaWallet className="text-green-600 w-8 h-8" />
    },
    {
      title: "Financial Insights",
      description: "Visualize your spending trends with charts and get actionable financial insights.",
      icon: <FaChartLine className="text-green-600 w-8 h-8" />
    },
    {
      title: "Goal Management",
      description: "Set savings goals, track progress, and achieve financial stability faster.",
      icon: <FaPiggyBank className="text-green-600 w-8 h-8" />
    }
  ];

  return (
    <div className="bg-white min-h-screen font-sans">
   
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-teal-600 text-white py-20 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 space-y-6 z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Master Your Money <br className="hidden md:block" /> With <span className="text-green-200">Ease</span>
            </h1>
            <p className="text-lg md:text-xl text-green-100 max-w-lg">
              Track expenses, manage your income, and achieve your financial goals with our intuitive Personal Finance Tracker.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <Link
                to="/register"
                className="bg-white text-green-700 font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-green-50 transition text-center"
              >
                Start Free Trial
              </Link>
              <Link
                to="/add"
                className="bg-green-800 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-green-900 transition flex items-center justify-center"
              >
                <FaPlusCircle className="mr-2" /> Add Transaction
              </Link>
            </div>
            <div className="flex items-center pt-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-xs font-bold">
                    {i}K+
                  </div>
                ))}
              </div>
              <p className="ml-4 text-green-100">Active users saving money every day</p>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center relative">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-green-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-teal-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl p-6 text-gray-800 z-10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Recent Transactions</h3>
                  <span className="text-sm text-green-600 font-bold">€2,458.90</span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">Salary Deposit</h4>
                      <p className="text-sm text-gray-500">Today</p>
                    </div>
                    <span className="text-green-600 font-bold">+€3,200.00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">Grocery Store</h4>
                      <p className="text-sm text-gray-500">Yesterday</p>
                    </div>
                    <span className="text-red-600 font-bold">-€86.50</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">Netflix Subscription</h4>
                      <p className="text-sm text-gray-500">May 14</p>
                    </div>
                    <span className="text-red-600 font-bold">-€15.99</span>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <Link 
                    to="/add" 
                    className="text-green-600 hover:text-green-800 font-medium text-sm flex items-center justify-center"
                  >
                    View All Transactions <span className="ml-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="text-4xl font-bold text-green-600 mb-2">92%</div>
              <p className="text-gray-600">of users save more money within the first month</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="text-4xl font-bold text-green-600 mb-2">€2,300+</div>
              <p className="text-gray-600">average annual savings for regular users</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="text-4xl font-bold text-green-600 mb-2">4.8/5</div>
              <p className="text-gray-600">customer satisfaction rating across platforms</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features Designed for You</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Everything you need to take control of your finances and build a secure future</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{features[currentFeature].title}</h3>
                <p className="text-gray-600">{features[currentFeature].description}</p>
              </div>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start p-4 rounded-lg cursor-pointer transition ${index === currentFeature ? 'bg-green-50 border-l-4 border-green-600' : 'hover:bg-gray-50'}`}
                    onClick={() => setCurrentFeature(index)}
                  >
                    <div className="mr-4 mt-1">{feature.icon}</div>
                    <div>
                      <h4 className="font-semibold">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Monthly Budget</h3>
                    <span className="text-sm text-green-600 font-bold">75% used</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{width: '75%'}}></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Income</p>
                      <p className="text-xl font-bold text-green-700">€4,200</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Expenses</p>
                      <p className="text-xl font-bold text-red-700">€2,850</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Top Categories</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Food & Dining</span>
                        <span className="font-medium">€620</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Transportation</span>
                        <span className="font-medium">€380</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Entertainment</span>
                        <span className="font-medium">€210</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="flex justify-center mb-4">
                <FaMobileAlt className="text-green-600 w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mobile Access</h3>
              <p className="text-gray-600">Manage your finances on the go with our iOS and Android apps</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="flex justify-center mb-4">
                <FaShieldAlt className="text-green-600 w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Bank-Level Security</h3>
              <p className="text-gray-600">Your data is encrypted and protected with the highest security standards</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="flex justify-center mb-4">
                <FaRegSmileBeam className="text-green-600 w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
              <p className="text-gray-600">Intuitive interface designed for everyone, from beginners to experts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Join thousands of satisfied users who transformed their financial lives</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center text-green-800 font-bold mr-4">JD</div>
                <div>
                  <h4 className="font-semibold">John Doe</h4>
                  <p className="text-green-600 text-sm">Saved €4,200 in 6 months</p>
                </div>
              </div>
              <p className="text-gray-600">"This app completely changed how I manage my money. I've saved more in half a year than I did in the previous two years combined!"</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center text-green-800 font-bold mr-4">SM</div>
                <div>
                  <h4 className="font-semibold">Sarah Miller</h4>
                  <p className="text-green-600 text-sm">Business Owner</p>
                </div>
              </div>
              <p className="text-gray-600">"As a small business owner, keeping track of finances was always stressful. FinTrack Pro made it simple and even enjoyable!"</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center text-green-800 font-bold mr-4">RJ</div>
                <div>
                  <h4 className="font-semibold">Robert Johnson</h4>
                  <p className="text-green-600 text-sm">Paid off €15,000 debt</p>
                </div>
              </div>
              <p className="text-gray-600">"The visual reports helped me understand my spending patterns. I've paid off all my credit card debt thanks to this amazing tool."</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Financial Future?
          </h2>
          <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto mb-10">
            Join thousands of users who are already taking control of their finances and building wealth.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/register"
              className="bg-white text-green-700 font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-green-50 transition"
            >
              Start Your Free Trial
            </Link>
            <Link
              to="/demo"
              className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-white hover:text-green-700 transition"
            >
              Watch Demo
            </Link>
          </div>
          <p className="mt-6 text-green-200">No credit card required • Cancel anytime</p>
        </div>
      </section>

     <footer className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
           <Link to="/" className="flex-shrink-0 flex items-center mb-4">
                         <FaWallet className="h-8 w-8 text-white" />
                         <span className="ml-2 text-white text-xl font-bold">FinanceTracker</span>
                       </Link>
            <p className="text-green-100">
              Take control of your financial future, one transaction at a time.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-gray-200 transition">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-gray-200 transition">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-gray-200 transition">
                <FaLinkedinIn />
              </a>
              <a href="#" className="hover:text-gray-200 transition">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="hover:text-gray-200 transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-gray-200 transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#case-studies" className="hover:text-gray-200 transition">
                  Case Studies
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#blog" className="hover:text-gray-200 transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#help-center" className="hover:text-gray-200 transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-gray-200 transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-gray-200 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#careers" className="hover:text-gray-200 transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gray-200 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-green-500 mt-8 pt-8 text-center text-green-100">
          <p>© 2025 FinanceTracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Home;