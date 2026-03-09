import React, { createContext, useContext, useState, useEffect } from 'react';

const DemoModeContext = createContext();

export const useDemoMode = () => {
  const context = useContext(DemoModeContext);
  if (!context) {
    throw new Error('useDemoMode must be used within a DemoModeProvider');
  }
  return context;
};

export const DemoModeProvider = ({ children }) => {
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [demoData, setDemoData] = useState({
    transactions: [],
    banks: [],
    accounts: [],
    notifications: [],
    balance: { totalBalance: 0, cashBalance: 0, bankBalance: 0 }
  });

  // Initialize demo mode from sessionStorage on mount
  useEffect(() => {
    const savedDemoMode = sessionStorage.getItem('isDemoMode');
    if (savedDemoMode === 'true') {
      setIsDemoMode(true);
      const savedDemoData = sessionStorage.getItem('demoData');
      if (savedDemoData) {
        try {
          setDemoData(JSON.parse(savedDemoData));
        } catch (error) {
          console.error('Error parsing demo data:', error);
        }
      }
    }
  }, []);

  // Save demo mode state to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('isDemoMode', isDemoMode.toString());
    if (!isDemoMode) {
      sessionStorage.removeItem('demoData');
    }
  }, [isDemoMode]);

  // Save demo data to sessionStorage whenever it changes
  useEffect(() => {
    if (isDemoMode) {
      sessionStorage.setItem('demoData', JSON.stringify(demoData));
    }
  }, [demoData, isDemoMode]);

  const enterDemoMode = () => {
    setIsDemoMode(true);
    // Initialize with realistic sample data
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
    
    setDemoData({
      transactions: [
        {
          id: 'demo-buy-1',
          type: 'buy',
          CustomerName: 'Demo Supplier A',
          ItemName: 'Premium Plywood',
          Amount: 15000,
          PaymentStatus: 'Paid',
          date: twoDaysAgo.toISOString(),
          createdAt: twoDaysAgo.toISOString()
        },
        {
          id: 'demo-buy-2',
          type: 'buy',
          CustomerName: 'Demo Supplier B',
          ItemName: 'Wood Veneer',
          Amount: 8000,
          PaymentStatus: 'Pending',
          date: yesterday.toISOString(),
          createdAt: yesterday.toISOString()
        },
        {
          id: 'demo-sell-1',
          type: 'sell',
          CustomerName: 'Demo Customer X',
          ItemName: 'Finished Plywood',
          Amount: 25000,
          PaymentStatus: 'Paid',
          date: yesterday.toISOString(),
          createdAt: yesterday.toISOString()
        },
        {
          id: 'demo-sell-2',
          type: 'sell',
          CustomerName: 'Demo Customer Y',
          ItemName: 'Luxury Veneer',
          Amount: 18000,
          PaymentStatus: 'Pending',
          date: now.toISOString(),
          createdAt: now.toISOString()
        },
        {
          id: 'demo-credit-1',
          type: 'other-credit',
          CustomerName: 'Misc Income',
          ItemName: 'Consultation Fee',
          Amount: 5000,
          PaymentStatus: 'Paid',
          date: twoDaysAgo.toISOString(),
          createdAt: twoDaysAgo.toISOString()
        },
        {
          id: 'demo-debit-1',
          type: 'other-debit',
          CustomerName: 'Office Expenses',
          ItemName: 'Utilities',
          Amount: 3000,
          PaymentStatus: 'Paid',
          date: yesterday.toISOString(),
          createdAt: yesterday.toISOString()
        }
      ],
      banks: [
        {
          id: 'demo-bank-1',
          bankName: 'Demo Bank of India',
          accountNumber: '1234567890',
          ifscCode: 'DEMO0001234',
          balance: 45000,
          createdAt: new Date().toISOString()
        },
        {
          id: 'demo-bank-2',
          bankName: 'Demo HDFC Bank',
          accountNumber: '9876543210',
          ifscCode: 'DEMO0005678',
          balance: 30000,
          createdAt: new Date().toISOString()
        }
      ],
      accounts: [],
      notifications: [
        {
          id: 'demo-notif-1',
          type: 'info',
          message: 'Welcome to Demo Mode! You can explore all features safely.',
          read: false,
          createdAt: new Date().toISOString()
        },
        {
          id: 'demo-notif-2',
          type: 'warning',
          message: 'Demo: Payment pending from Demo Customer Y - ₹18,000',
          read: false,
          createdAt: new Date().toISOString()
        }
      ],
      balance: { 
        totalBalance: 75000,
        cashBalance: 0,
        bankBalance: 75000
      }
    });
  };

  const exitDemoMode = () => {
    setIsDemoMode(false);
    setDemoData({
      transactions: [],
      banks: [],
      accounts: [],
      notifications: [],
      balance: { totalBalance: 0, cashBalance: 0, bankBalance: 0 }
    });
    sessionStorage.removeItem('demoData');
  };

  // Helper functions to manipulate demo data
  const addDemoTransaction = (transaction) => {
    setDemoData(prev => ({
      ...prev,
      transactions: [...prev.transactions, { ...transaction, id: `demo-${Date.now()}` }]
    }));
  };

  const updateDemoTransaction = (id, updates) => {
    setDemoData(prev => ({
      ...prev,
      transactions: prev.transactions.map(t => t.id === id ? { ...t, ...updates } : t)
    }));
  };

  const deleteDemoTransaction = (id) => {
    setDemoData(prev => ({
      ...prev,
      transactions: prev.transactions.filter(t => t.id !== id)
    }));
  };

  const addDemoBank = (bank) => {
    setDemoData(prev => ({
      ...prev,
      banks: [...prev.banks, { ...bank, id: `demo-bank-${Date.now()}` }]
    }));
  };

  const updateDemoBank = (id, updates) => {
    setDemoData(prev => ({
      ...prev,
      banks: prev.banks.map(b => b.id === id ? { ...b, ...updates } : b)
    }));
  };

  const deleteDemoBank = (id) => {
    setDemoData(prev => ({
      ...prev,
      banks: prev.banks.filter(b => b.id !== id)
    }));
  };

  const addDemoNotification = (notification) => {
    setDemoData(prev => ({
      ...prev,
      notifications: [...prev.notifications, { ...notification, id: `demo-notif-${Date.now()}` }]
    }));
  };

  const updateDemoBalance = (balance) => {
    setDemoData(prev => ({
      ...prev,
      balance: { ...prev.balance, ...balance }
    }));
  };

  const getDemoTransactions = (type = null) => {
    if (type) {
      return demoData.transactions.filter(t => t.type === type);
    }
    return demoData.transactions;
  };

  const getDemoBanks = () => {
    return demoData.banks;
  };

  const getDemoBalance = () => {
    return demoData.balance;
  };

  const getDemoNotifications = () => {
    return demoData.notifications;
  };

  return (
    <DemoModeContext.Provider
      value={{
        isDemoMode,
        enterDemoMode,
        exitDemoMode,
        demoData,
        addDemoTransaction,
        updateDemoTransaction,
        deleteDemoTransaction,
        addDemoBank,
        updateDemoBank,
        deleteDemoBank,
        addDemoNotification,
        updateDemoBalance,
        getDemoTransactions,
        getDemoBanks,
        getDemoBalance,
        getDemoNotifications
      }}
    >
      {children}
    </DemoModeContext.Provider>
  );
};

export default DemoModeProvider;
