# Demo Mode Feature

## Overview
Demo mode allows users to explore the website's functionality without connecting to the backend API. All data is stored in sessionStorage with a 10-minute expiration time.

## Features Created

### 1. Demo Storage Utility (`src/utils/demoStorage.js`)
- Manages sessionStorage with automatic 10-minute expiration
- Provides sample data initialization
- Includes methods: `setItem`, `getItem`, `removeItem`, `clearAll`, `getRemainingTime`, `initializeSampleData`

### 2. Demo Mode Context (`src/contexts/DemoModeContext.jsx`)
- Manages demo mode state across the application
- Tracks remaining time
- Provides: `isDemoMode`, `enterDemoMode`, `exitDemoMode`, `remainingTime`

### 3. Demo Pages (`src/pages/demo/`)
All demo pages use sessionStorage instead of API calls:
- **DemoBuy.jsx** - Buy order management
- **DemoSell.jsx** - Sell order management
- **DemoAccounting.jsx** - Financial summary dashboard
- **DemoBanks.jsx** - Bank account management
- **DemoOtherCredit.jsx** - Other credit transactions
- **DemoOtherDebit.jsx** - Other debit transactions
- **DemoNotifications.jsx** - Notification management

### 4. Demo Mode Routes
- `/demo/buy` - Demo buy page
- `/demo/sell` - Demo sell page
- `/demo/accounting` - Demo accounting page
- `/demo/banks` - Demo banks page
- `/demo/other-credit` - Demo other credit page
- `/demo/other-debit` - Demo other debit page
- `/demo/notifications` - Demo notifications page

### 5. User Interface Updates

#### Header Component
- Added "Demo Mode" button in desktop navigation
- Shows "Exit Demo" with remaining time when in demo mode
- Mobile menu includes demo mode toggle

#### Home Page
- Added "Try Demo Mode" button in hero section
- Prominent call-to-action for users to try the demo

## How It Works

1. **Entering Demo Mode:**
   - Click "Demo Mode" or "Try Demo Mode" button
   - Sample data is automatically loaded into sessionStorage
   - User is redirected to `/demo/buy`
   - Timer starts for 10-minute expiration

2. **Using Demo Mode:**
   - All CRUD operations work with sessionStorage
   - No API calls are made
   - Data persists across demo pages
   - Remaining time is displayed in header

3. **Exiting Demo Mode:**
   - Click "Exit Demo" button
   - All demo data is cleared from sessionStorage
   - User is redirected to home page
   - Data automatically expires after 10 minutes

## Sample Data
The demo includes sample data for:
- Buy orders (2 sample orders)
- Sell orders (1 sample order)
- Bank accounts (1 sample account)
- Other credits (1 sample transaction)
- Other debits (1 sample transaction)
- Notifications (1 sample notification)

## Technical Implementation

### Session Storage Structure
```javascript
{
  "demo_buy": [...],
  "demo_buy_expiry": timestamp,
  "demo_sell": [...],
  "demo_sell_expiry": timestamp,
  // ... other data types
  "demo_mode_active": "true"
}
```

### Expiration Logic
- Each data item has a corresponding expiry timestamp
- Data is checked on read and automatically removed if expired
- Timer updates every minute to show remaining time
- Auto-cleanup on expiration

## Usage for Users

### For Regular Users
1. Visit the home page
2. Click "Try Demo Mode" in the hero section
3. Explore all features without logging in
4. See how the website works with sample data
5. Exit demo mode when done

### For Admin Users
1. Log in to the account
2. Click "Demo Mode" in the header
3. Test features with sample data
4. Exit to return to real data

## Benefits
- No API calls - faster performance
- No database impact - safe testing
- 10-minute auto-expiry - prevents stale data
- Full feature demonstration - users can see everything
- Easy toggle - switch between demo and real mode
