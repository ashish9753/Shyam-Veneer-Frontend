import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    PhoneNo: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { login } = useAuth();

  // Product images for animated showcase
  const productImages = [
    { src: '/laxury/Luxury Sofa Set.jpg', label: 'Luxury Sofa' },
    { src: '/Ply/p1.jpg', label: 'Premium Plywood' },
    { src: '/laxury/King Size Bed.jpg', label: 'King Size Bed' },
    { src: '/Ply/p3.jpg', label: 'Marine Plywood' },
    { src: '/laxury/DiningTableSet.jpg', label: 'Dining Set' },
    { src: '/Ply/p5.jpg', label: 'Decorative Ply' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!isLogin) {
      if (!formData.fullName?.trim() || !formData.email?.trim() || !formData.password?.trim() || !formData.PhoneNo?.trim()) {
        setError('All fields are required');
        setLoading(false);
        return;
      }
    }

    try {
      const url = isLogin 
        ? 'https://shyam-veneer-backend-1.onrender.com/api/v1/user/login'
        : 'https://shyam-veneer-backend-1.onrender.com/api/v1/user/register';
      
      const body = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const data = await response.json();

      if (!response.ok) throw new Error(data?.message || `Server error: ${response.status}`);

      if (data.success) {
        login(data.data, data.token);
        navigate('/');
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Connection timeout. Please check your internet connection.');
      } else if (err.message.includes('Failed to fetch')) {
        setError('Unable to connect to server. Please try again.');
      } else {
        setError(err.message || 'An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ fullName: '', email: '', password: '', PhoneNo: '' });
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-6xl h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden relative">
        
        {/* Showcase Panel - Swaps sides based on login/signup */}
        <div 
          className={`absolute w-1/2 h-full transition-all duration-700 ease-in-out ${
            isLogin ? 'left-0' : 'left-1/2'
          }`}
        >
          <div className="h-full bg-gradient-to-br from-orange-600 via-amber-600 to-orange-700 p-12 flex flex-col justify-center items-center text-white relative overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
              <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full animate-bounce"></div>
              <div className="absolute top-1/2 right-10 w-16 h-16 bg-white rounded-full animate-ping"></div>
            </div>

            <div className="relative z-10 text-center mb-8">
              <div className="w-24 h-24 mx-auto bg-white rounded-3xl shadow-2xl flex items-center justify-center mb-6 transform hover:rotate-12 transition-transform">
                <span className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-700 bg-clip-text text-transparent">SV</span>
              </div>
              <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">Shyam Veneer</h2>
              <p className="text-xl opacity-90 mb-8">Premium Plywood Solutions</p>
            </div>

            {/* Product Showcase Cards */}
            <div className="relative w-full max-w-sm">
              {productImages.map((product, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 transform ${
                    index === currentImageIndex
                      ? 'opacity-100 scale-100 rotate-0'
                      : index === (currentImageIndex - 1 + productImages.length) % productImages.length
                      ? 'opacity-0 scale-95 -rotate-6 translate-x-8'
                      : 'opacity-0 scale-95 rotate-6 -translate-x-8'
                  }`}
                >
                  <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform">
                    <img 
                      src={product.src} 
                      alt={product.label}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50">
                      <h3 className="font-bold text-amber-900 text-lg text-center">{product.label}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots Indicator */}
            <div className="flex gap-2 mt-72">
              {productImages.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentImageIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Form Panel - Swaps sides based on login/signup */}
        <div 
          className={`absolute w-1/2 h-full transition-all duration-700 ease-in-out ${
            isLogin ? 'left-1/2' : 'left-0'
          }`}
        >
          <div className="h-full bg-white p-12 flex flex-col justify-center overflow-y-auto">
            <div className="max-w-md mx-auto w-full">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {isLogin ? 'Sign in to Shyam Veneer' : 'Create Account'}
              </h1>
              <p className="text-gray-600 mb-8">
                {isLogin ? 'Enter your credentials to continue' : 'Fill in your details to get started'}
              </p>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6 animate-shake">
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required={!isLogin}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Enter your password"
                  />
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="PhoneNo"
                      value={formData.PhoneNo}
                      onChange={handleChange}
                      required={!isLogin}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="Enter your phone number"
                    />
                  </div>
                )}

                {isLogin && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <button type="button" className="text-sm text-orange-600 hover:text-orange-700 font-semibold">
                      Forgot Password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : (isLogin ? 'Sign in' : 'Sign up')}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    onClick={toggleMode}
                    className="text-orange-600 hover:text-orange-700 font-semibold hover:underline"
                  >
                    {isLogin ? 'Sign Up now' : 'Sign in'}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;