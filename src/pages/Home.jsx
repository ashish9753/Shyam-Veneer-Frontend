import { Link } from 'react-router-dom';
import { useState } from 'react';

const Home = () => {
  const [activeTab, setActiveTab] = useState('current');

  // Current business offerings
  const currentServices = [
    {
      title: 'Premium Plywood Manufacturing',
      description: 'ISI certified raw plywood materials with superior strength and durability',
      icon: '🪵',
      status: 'Available Now'
    },
    {
      title: 'Quality Veneer Supply',
      description: 'Wide range of decorative and structural veneer materials',
      icon: '🎨',
      status: 'Available Now'
    },
    {
      title: 'Block Board Production',
      description: 'High-grade block boards for construction and furniture base',
      icon: '🧱',
      status: 'Available Now'
    },
    {
      title: 'Raw Material Trading',
      description: 'Wholesale supply of wood raw materials to manufacturers',
      icon: '📦',
      status: 'Available Now'
    },
  ];

  // Future expansion plans
  const futureServices = [
    {
      title: 'Complete Furniture Solutions',
      description: 'Ready-to-use furniture including beds, wardrobes, and dining sets',
      icon: '🛏️',
      status: 'Coming Soon',
      eta: 'Q2 2026'
    },
    {
      title: 'Custom Wood Design Studio',
      description: 'Bespoke furniture design and manufacturing services',
      icon: '🎨',
      status: 'Coming Soon', 
      eta: 'Q3 2026'
    },
    {
      title: 'Home Interior Solutions',
      description: 'Complete home interior design and installation services',
      icon: '🏠',
      status: 'Coming Soon',
      eta: 'Q4 2026'
    },
    {
      title: 'Modular Kitchen Systems',
      description: 'Modern modular kitchen design and installation',
      icon: '🍳',
      status: 'Coming Soon',
      eta: 'Q1 2027'
    },
  ];

  const currentProducts = [
    {
      name: 'Marine Grade Plywood',
      description: 'Waterproof BWR/BWP grade plywood for marine and outdoor use',
      price: 'Starting from ₹120/sq.ft',
      image: '🌊',
      category: 'Raw Material'
    },
    {
      name: 'Commercial Plywood',
      description: 'High-grade MR plywood for furniture and interior applications',
      price: 'Starting from ₹85/sq.ft',
      image: '🏢',
      category: 'Raw Material'
    },
    {
      name: 'Decorative Veneer',
      description: 'Premium wood veneers in teak, mahogany, and oak finishes',
      price: 'Starting from ₹150/sq.ft',
      image: '✨',
      category: 'Raw Material'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <span className="inline-block bg-amber-600 text-amber-100 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                🌟 Leading Plywood Raw Material Supplier
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Shyam Veneer
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-amber-100">
              Premium Plywood Raw Materials Today
            </p>
            <p className="text-lg md:text-xl mb-8 text-amber-200">
              Complete Wood & Furniture Solutions Tomorrow
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/buy"
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:from-amber-600 hover:to-amber-700 transform hover:scale-105 transition-all"
              >
                🛒 Order Raw Materials
              </Link>
              <button
                onClick={() => setActiveTab('future')}
                className="border-2 border-amber-300 text-amber-100 px-8 py-4 rounded-xl font-bold hover:bg-amber-300 hover:text-amber-900 transition-all"
              >
                🚀 See Future Plans
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Business Evolution Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">Our Business Journey</h2>
            <p className="text-xl text-amber-700">From Raw Materials to Complete Solutions</p>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-amber-100 rounded-2xl p-2 inline-flex">
              <button
                onClick={() => setActiveTab('current')}
                className={`px-8 py-3 rounded-xl font-bold transition-all ${
                  activeTab === 'current'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg'
                    : 'text-amber-700 hover:bg-amber-200'
                }`}
              >
                🏭 Current Business
              </button>
              <button
                onClick={() => setActiveTab('future')}
                className={`px-8 py-3 rounded-xl font-bold transition-all ${
                  activeTab === 'future'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg'
                    : 'text-amber-700 hover:bg-amber-200'
                }`}
              >
                🚀 Future Vision
              </button>
            </div>
          </div>

          {/* Current Services */}
          {activeTab === 'current' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {currentServices.map((service, index) => (
                <div key={index} className="bg-gradient-to-br from-amber-50 to-orange-100 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-amber-200">
                  <div className="text-5xl mb-4 text-center">{service.icon}</div>
                  <h3 className="text-xl font-bold text-amber-900 mb-2">{service.title}</h3>
                  <p className="text-amber-700 mb-4">{service.description}</p>
                  <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    ✅ {service.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Future Services */}
          {activeTab === 'future' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {futureServices.map((service, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-blue-200">
                  <div className="text-5xl mb-4 text-center">{service.icon}</div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">{service.title}</h3>
                  <p className="text-blue-700 mb-4">{service.description}</p>
                  <div className="space-y-2">
                    <span className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                      🚀 {service.status}
                    </span>
                    <div className="text-sm font-semibold text-blue-600">
                      📅 Expected: {service.eta}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Current Products Section */}
      <section className="py-16 bg-gradient-to-r from-amber-100 to-orange-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">Current Product Range</h2>
            <p className="text-xl text-amber-700">Premium Raw Materials Available Now</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentProducts.map((product, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all transform hover:scale-105 border-4 border-amber-200">
                <div className="p-8 text-center">
                  <div className="text-7xl mb-4">{product.image}</div>
                  <span className="inline-block bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-4">
                    {product.category}
                  </span>
                  <h3 className="text-2xl font-bold text-amber-900 mb-3">{product.name}</h3>
                  <p className="text-amber-700 mb-4">{product.description}</p>
                  <Link
                    to="/buy"
                    className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-xl font-bold hover:from-amber-700 hover:to-amber-800 transition-all transform hover:scale-105 inline-block shadow-lg"
                  >
                    🛒 Order Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Vision Section */}
      <section className="py-16 bg-gradient-to-r from-amber-900 to-amber-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">🌟 Our Vision for Tomorrow</h2>
            <p className="text-xl mb-8 text-amber-100">
              Transforming from plywood raw material supplier to complete wood & furniture solutions provider
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-2xl">
                <div className="text-4xl mb-3">🏭</div>
                <h3 className="text-xl font-bold mb-2">Today</h3>
                <p className="text-amber-200">Premium Plywood Raw Materials & Veneer Supply</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-2xl">
                <div className="text-4xl mb-3">🔄</div>
                <h3 className="text-xl font-bold mb-2">2026-2027</h3>
                <p className="text-amber-200">Expanding to Complete Wood Processing & Furniture Manufacturing</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-2xl">
                <div className="text-4xl mb-3">🚀</div>
                <h3 className="text-xl font-bold mb-2">Future</h3>
                <p className="text-amber-200">One-Stop Shop for All Wood & Furniture Needs</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/buy"
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:from-amber-600 hover:to-orange-600 transition-all transform hover:scale-105 shadow-2xl"
              >
                🛒 Start Your Order Today
              </Link>
              <Link
                to="/register"
                className="border-2 border-amber-300 text-amber-100 px-8 py-4 rounded-xl font-bold hover:bg-amber-300 hover:text-amber-900 transition-all"
              >
                👥 Join Our Network
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
