import React, { useState } from 'react';
import BuySellDashboard from './BuySellDashboard';
import CreateBuySell from './CreateBuySell';
import PaymentManagement from './PaymentManagement';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTransactionCreated = (newTransaction) => {
    // Refresh dashboard if it's active
    if (activeTab === 'dashboard') {
      // The dashboard component will handle its own refresh
      console.log('New transaction created:', newTransaction);
    }
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <BuySellDashboard />;
      case 'create':
        return <CreateBuySell onTransactionCreated={handleTransactionCreated} />;
      case 'payments':
        return <PaymentManagement />;
      default:
        return <BuySellDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
              Annapurna Veneer - Business Management System
            </h1>
            
            <nav className="flex space-x-1">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: '📊' },
                { id: 'create', label: 'Create Transaction', icon: '➕' },
                { id: 'payments', label: 'Payment Management', icon: '💰' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-6">
        {renderActiveComponent()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="text-center text-gray-600">
            <p>© 2025 Annapurna Veneer. All rights reserved.</p>
            <p className="text-sm mt-1">Business Management System - Buy/Sell Operations</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;