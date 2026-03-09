# Demo Mode Integration Guide

## Overview
Demo mode allows normal users to experience admin features without affecting the database. Data is stored in session storage and persists only while the page is not refreshed.

## What's Been Implemented

### 1. DemoModeContext (`src/contexts/DemoModeContext.jsx`)
- Manages demo mode state
- Stores demo data in session storage
- Provides helper functions for CRUD operations on demo data

### 2. Updated Components
- **Header**: Shows "Try Demo Admin" button for normal users
- **ProtectedRoute**: Allows demo mode users to access admin routes
- **App.jsx**: Wrapped with DemoModeProvider

## How to Use Demo Mode in Your Pages

### Import the Hook
```javascript
import { useDemoMode } from '../contexts/DemoModeContext';
```

### Check Demo Mode State
```javascript
const { isDemoMode, getDemoTransactions, addDemoTransaction } = useDemoMode();
```

### Example: Updating a Page to Support Demo Mode

#### Before (Using API only):
```javascript
const Buy = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const response = await api.get('/transactions/buy');
    setTransactions(response.data);
  };

  const handleAddTransaction = async (data) => {
    await api.post('/transactions/buy', data);
    fetchTransactions();
  };
  
  return (
    // JSX
  );
};
```

#### After (Supporting Demo Mode):
```javascript
import { useDemoMode } from '../contexts/DemoModeContext';

const Buy = () => {
  const [transactions, setTransactions] = useState([]);
  const { isDemoMode, getDemoTransactions, addDemoTransaction } = useDemoMode();

  useEffect(() => {
    fetchTransactions();
  }, [isDemoMode]); // Re-fetch when demo mode changes

  const fetchTransactions = async () => {
    if (isDemoMode) {
      // Get data from demo mode context
      const demoTransactions = getDemoTransactions('buy');
      setTransactions(demoTransactions);
    } else {
      // Get data from API
      const response = await api.get('/transactions/buy');
      setTransactions(response.data);
    }
  };

  const handleAddTransaction = async (data) => {
    if (isDemoMode) {
      // Add to demo mode context
      addDemoTransaction({ ...data, type: 'buy' });
      // Refresh local state
      const demoTransactions = getDemoTransactions('buy');
      setTransactions(demoTransactions);
    } else {
      // Save to API
      await api.post('/transactions/buy', data);
      fetchTransactions();
    }
  };
  
  return (
    // JSX - Add demo mode indicator
    <div>
      {isDemoMode && (
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4">
          <p className="font-bold">Demo Mode Active</p>
          <p>Changes will not be saved to the database.</p>
        </div>
      )}
      {/* Rest of your JSX */}
    </div>
  );
};
```

## Available Demo Mode Functions

### Transaction Management
- `getDemoTransactions(type)` - Get transactions by type ('buy', 'sell', etc.)
- `addDemoTransaction(transaction)` - Add a new transaction
- `updateDemoTransaction(id, updates)` - Update an existing transaction
- `deleteDemoTransaction(id)` - Delete a transaction

### Bank Management
- `getDemoBanks()` - Get all banks
- `addDemoBank(bank)` - Add a new bank
- `updateDemoBank(id, updates)` - Update a bank
- `deleteDemoBank(id)` - Delete a bank

### Balance Management
- `getDemoBalance()` - Get current balance
- `updateDemoBalance(balance)` - Update balance

### Notifications
- `getDemoNotifications()` - Get all notifications
- `addDemoNotification(notification)` - Add a new notification

## Pages That Need To Be Updated

To fully support demo mode, update these pages:

1. **Buy.jsx** - Buy transactions
2. **Sell.jsx** - Sell transactions
3. **OtherCredit.jsx** - Other credit transactions
4. **OtherDebit.jsx** - Other debit transactions
5. **Accounting.jsx** - Account summary and balance
6. **Banks.jsx** - Bank management
7. **NotificationsFixed.jsx** - Notifications

## Demo Mode Behavior

### What Happens When User Enters Demo Mode:
1. Demo mode flag is set in session storage
2. Sample data is initialized in demo context
3. User sees admin navigation and features
4. Header shows "DEMO MODE" banner
5. User role displays as "Demo Admin"

### What Happens When User Exits Demo Mode:
1. Demo mode flag is removed from session storage
2. All demo data is cleared
3. User returns to normal user view
4. Admin navigation is hidden

### What Happens On Page Refresh:
- Demo mode state is preserved (stored in session storage)
- Demo data is preserved (stored in session storage)
- Closing the browser tab/window will clear all demo data

## Best Practices

1. **Always check demo mode** before making API calls
2. **Show visual indicators** when in demo mode
3. **Don't mix data** - Keep demo data separate from real data
4. **Handle errors gracefully** - Demo mode should never fail
5. **Provide feedback** - Let users know data is not being saved

## Testing Demo Mode

1. Login as a normal user (non-admin)
2. Click "Try Demo Admin" button in header
3. Navigate to admin pages (Buy, Sell, Accounting, etc.)
4. Add/Edit/Delete data
5. Refresh the page - data should persist
6. Click "Exit Demo Mode" - demo data should be cleared
7. Open a new tab/window - demo state should not be shared

## Security Notes

- Demo mode does NOT grant actual admin privileges
- API calls in demo mode are blocked
- Real database is never affected
- Demo data is stored only in browser session storage
- Demo mode is cleared when browser tab is closed
