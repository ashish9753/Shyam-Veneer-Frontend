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
  // 10-minute session timeout
  const SESSION_TIMEOUT = 10 * 60 * 1000; // 10 minutes in milliseconds
  
  // Initialize demo mode state directly from sessionStorage to prevent race condition
  const [isDemoMode, setIsDemoMode] = useState(() => {
    const savedDemoMode = sessionStorage.getItem('isDemoMode');
    const savedTimestamp = sessionStorage.getItem('demoModeTimestamp');
    
    if (savedDemoMode === 'true' && savedTimestamp) {
      const timeElapsed = Date.now() - parseInt(savedTimestamp);
      // Check if session is still valid (within 10 minutes)
      if (timeElapsed < SESSION_TIMEOUT) {
        return true;
      } else {
        // Session expired, clear storage
        sessionStorage.removeItem('isDemoMode');
        sessionStorage.removeItem('demoModeTimestamp');
        sessionStorage.removeItem('demoData');
        return false;
      }
    }
    return false;
  });
  
  const [demoData, setDemoData] = useState(() => {
    // Initialize demo data from sessionStorage if in demo mode
    const savedDemoMode = sessionStorage.getItem('isDemoMode');
    const savedTimestamp = sessionStorage.getItem('demoModeTimestamp');
    
    if (savedDemoMode === 'true' && savedTimestamp) {
      const timeElapsed = Date.now() - parseInt(savedTimestamp);
      if (timeElapsed < SESSION_TIMEOUT) {
        const savedDemoData = sessionStorage.getItem('demoData');
        if (savedDemoData) {
          try {
            return JSON.parse(savedDemoData);
          } catch (error) {
            console.error('Error parsing demo data:', error);
          }
        }
      }
    }
    
    return {
      transactions: [],
      banks: [],
      accounts: [],
      notifications: [],
      balance: { totalBalance: 0, cashBalance: 0, bankBalance: 0 }
    };
  });

  // Save demo mode state changes (but don't overwrite timestamp on restore)
  useEffect(() => {
    if (!isDemoMode) {
      // Exiting demo mode - clear everything
      sessionStorage.removeItem('isDemoMode');
      sessionStorage.removeItem('demoModeTimestamp');
      sessionStorage.removeItem('demoData');
    }
    // Note: When entering demo mode, timestamp is set in enterDemoMode()
  }, [isDemoMode]);

  // Save demo data to sessionStorage whenever it changes
  useEffect(() => {
    if (isDemoMode) {
      sessionStorage.setItem('demoData', JSON.stringify(demoData));
    }
  }, [demoData, isDemoMode]);

  const enterDemoMode = () => {
    setIsDemoMode(true);
    // Set timestamp when actively entering demo mode
    sessionStorage.setItem('isDemoMode', 'true');
    sessionStorage.setItem('demoModeTimestamp', Date.now().toString());
    
    // Initialize with realistic sample data
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
    
    setDemoData({
      transactions: [
        {
          _id: 'demo-buy-1',
          type: 'buy',
          CustomerName: 'Demo Supplier A',
          ItemName: 'Premium Plywood',
          Amount: 15000,
          Quantity: 100,
          OrderNumber: 'ORD-DEMO-001',
          PaymentStatus: 'Confirmed',
          Payments: [{ amount: 15000, date: twoDaysAgo.toISOString() }],
          date: twoDaysAgo.toISOString(),
          createdAt: twoDaysAgo.toISOString()
        },
        {
          _id: 'demo-buy-2',
          type: 'buy',
          CustomerName: 'Demo Supplier B',
          ItemName: 'Wood Veneer',
          Amount: 8000,
          Quantity: 50,
          OrderNumber: 'ORD-DEMO-002',
          PaymentStatus: 'Pending',
          Payments: [],
          date: yesterday.toISOString(),
          createdAt: yesterday.toISOString()
        },
        {
          _id: 'demo-sell-1',
          type: 'sell',
          CustomerName: 'Demo Customer X',
          ItemName: 'Finished Plywood',
          Amount: 25000,
          Quantity: 75,
          OrderNumber: 'ORD-DEMO-003',
          PaymentStatus: 'Confirmed',
          Payments: [{ amount: 25000, date: yesterday.toISOString() }],
          date: yesterday.toISOString(),
          createdAt: yesterday.toISOString()
        },
        {
          _id: 'demo-sell-2',
          type: 'sell',
          CustomerName: 'Demo Customer Y',
          ItemName: 'Luxury Veneer',
          Amount: 18000,
          Quantity: 60,
          OrderNumber: 'ORD-DEMO-004',
          PaymentStatus: 'Pending',
          Payments: [],
          date: now.toISOString(),
          createdAt: now.toISOString()
        },
        {
          _id: 'demo-credit-1',
          type: 'other-credit',
          Name: 'Misc Income',
          Amount: 5000,
          Category: 'Consultation Fee',
          PaymentStatus: 'Confirmed',
          Payments: [{ amount: 5000, date: twoDaysAgo.toISOString() }],
          date: twoDaysAgo.toISOString(),
          createdAt: twoDaysAgo.toISOString()
        },
        {
          _id: 'demo-debit-1',
          type: 'other-debit',
          Name: 'Office Expenses',
          Amount: 3000,
          Category: 'Utilities',
          PaymentStatus: 'Confirmed',
          Payments: [{ amount: 3000, date: yesterday.toISOString() }],
          date: yesterday.toISOString(),
          createdAt: yesterday.toISOString()
        }
      ],
      banks: [
        {
          _id: 'demo-bank-1',
          bankName: 'Demo Bank of India',
          accountNumber: '1234567890',
          ifscCode: 'DEMO0001234',
          balance: 45000,
          status: 'Active',
          createdAt: new Date().toISOString()
        },
        {
          _id: 'demo-bank-2',
          bankName: 'Demo HDFC Bank',
          accountNumber: '9876543210',
          ifscCode: 'DEMO0005678',
          balance: 30000,
          status: 'Active',
          createdAt: new Date().toISOString()
        }
      ],
      accounts: [],
      notifications: [
        {
          _id: 'demo-notif-1',
          type: 'info',
          message: 'Welcome to Demo Mode! You can explore all features safely.',
          read: false,
          createdAt: new Date().toISOString()
        },
        {
          _id: 'demo-notif-2',
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
    sessionStorage.removeItem('isDemoMode');
    sessionStorage.removeItem('demoModeTimestamp');
    sessionStorage.removeItem('demoData');
  };

  // Helper functions to manipulate demo data
  const addDemoTransaction = (transaction) => {
    setDemoData(prev => ({
      ...prev,
      transactions: [...prev.transactions, transaction]
    }));
  };

  const updateDemoTransaction = (id, updates) => {
    setDemoData(prev => ({
      ...prev,
      transactions: prev.transactions.map(t => 
        (t.id === id || t._id === id) ? { ...t, ...updates } : t
      )
    }));
  };

  const deleteDemoTransaction = (id) => {
    setDemoData(prev => ({
      ...prev,
      transactions: prev.transactions.filter(t => t.id !== id && t._id !== id)
    }));
  };

  const addDemoBank = (bank) => {
    setDemoData(prev => ({
      ...prev,
      banks: [...prev.banks, bank]
    }));
  };

  const updateDemoBank = (id, updates) => {
    setDemoData(prev => ({
      ...prev,
      banks: prev.banks.map(b => (b.id === id || b._id === id) ? { ...b, ...updates } : b)
    }));
  };

  const deleteDemoBank = (id) => {
    setDemoData(prev => ({
      ...prev,
      banks: prev.banks.filter(b => b.id !== id && b._id !== id)
    }));
  };

  const addDemoNotification = (notification) => {
    setDemoData(prev => ({
      ...prev,
      notifications: [...prev.notifications, notification]
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
