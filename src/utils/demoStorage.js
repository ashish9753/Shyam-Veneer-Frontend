// Demo Storage Utility with 10-minute expiry
const DEMO_EXPIRY_TIME = 10 * 60 * 1000; // 10 minutes in milliseconds

const getDemoKey = (key) => `demo_${key}`;
const getExpiryKey = (key) => `demo_${key}_expiry`;

export const demoStorage = {
  // Set data with expiry
  setItem: (key, value) => {
    const demoKey = getDemoKey(key);
    const expiryKey = getExpiryKey(key);
    const expiryTime = Date.now() + DEMO_EXPIRY_TIME;
    
    sessionStorage.setItem(demoKey, JSON.stringify(value));
    sessionStorage.setItem(expiryKey, expiryTime.toString());
  },

  // Get data if not expired
  getItem: (key) => {
    const demoKey = getDemoKey(key);
    const expiryKey = getExpiryKey(key);
    
    const expiryTime = sessionStorage.getItem(expiryKey);
    
    // Check if expired
    if (expiryTime && Date.now() > parseInt(expiryTime)) {
      // Data expired, remove it
      sessionStorage.removeItem(demoKey);
      sessionStorage.removeItem(expiryKey);
      return null;
    }
    
    const data = sessionStorage.getItem(demoKey);
    return data ? JSON.parse(data) : null;
  },

  // Remove item
  removeItem: (key) => {
    const demoKey = getDemoKey(key);
    const expiryKey = getExpiryKey(key);
    sessionStorage.removeItem(demoKey);
    sessionStorage.removeItem(expiryKey);
  },

  // Clear all demo data
  clearAll: () => {
    const keys = Object.keys(sessionStorage);
    keys.forEach(key => {
      if (key.startsWith('demo_')) {
        sessionStorage.removeItem(key);
      }
    });
  },

  // Get remaining time in minutes
  getRemainingTime: (key) => {
    const expiryKey = getExpiryKey(key);
    const expiryTime = sessionStorage.getItem(expiryKey);
    
    if (!expiryTime) return 0;
    
    const remaining = parseInt(expiryTime) - Date.now();
    return remaining > 0 ? Math.ceil(remaining / 60000) : 0;
  },

  // Initialize with sample data
  initializeSampleData: () => {
    // Sample Buy Data
    const sampleBuy = [
      {
        _id: 'demo-buy-1',
        CustomerName: 'Demo Supplier A',
        ItemName: 'Teak Veneer',
        Under: 'Wood',
        Quantity: '100',
        Amount: 50000,
        VatAmount: 6500,
        BillNumber: 'BUY001',
        PhoneNumber: '9876543210',
        VehicleNumber: 'MH12AB1234',
        PaymentStatus: 'Pending',
        PaymentDeadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        ModeofPayment: '',
        DeliveryAddress: 'Mumbai',
        createdAt: new Date().toISOString(),
      },
      {
        _id: 'demo-buy-2',
        CustomerName: 'Demo Supplier B',
        ItemName: 'Oak Veneer',
        Under: 'Wood',
        Quantity: '50',
        Amount: 25000,
        VatAmount: 3250,
        BillNumber: 'BUY002',
        PhoneNumber: '9876543211',
        VehicleNumber: 'MH12CD5678',
        PaymentStatus: 'Confirmed',
        ModeofPayment: 'Bank Transfer',
        DeliveryAddress: 'Pune',
        createdAt: new Date().toISOString(),
      }
    ];

    // Sample Sell Data
    const sampleSell = [
      {
        _id: 'demo-sell-1',
        CustomerName: 'Demo Customer A',
        ItemName: 'Premium Veneer',
        Under: 'Luxury',
        Quantity: '80',
        Amount: 60000,
        VatAmount: 7800,
        BillNumber: 'SELL001',
        CustomCharges: 500,
        PhoneNumber: '9876543220',
        VehicleNumber: 'MH12EF9012',
        PaymentStatus: 'Pending',
        PaymentDeadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        ModeofPayment: '',
        DeliveryAddress: 'Delhi',
        createdAt: new Date().toISOString(),
      }
    ];

    // Sample Banks
    const sampleBanks = [
      {
        _id: 'demo-bank-1',
        bankName: 'HDFC Bank',
        accountNumber: '12345678901',
        accountHolderName: 'Shyam Veneer',
        ifscCode: 'HDFC0001234',
        branchName: 'Mumbai Main',
        accountType: 'Current',
        contactPerson: 'Demo Manager',
        contactNumber: '9876543230',
        address: 'Mumbai, Maharashtra',
        createdAt: new Date().toISOString(),
      }
    ];

    // Sample Other Credits
    const sampleOtherCredits = [
      {
        _id: 'demo-credit-1',
        Name: 'Government Grant',
        Amount: 10000,
        ModeofPayment: 'Bank Transfer',
        Category: 'Grant',
        PaymentStatus: 'Confirmed',
        Description: 'Annual government grant received',
        createdAt: new Date().toISOString(),
      }
    ];

    // Sample Other Debits
    const sampleOtherDebits = [
      {
        _id: 'demo-debit-1',
        Name: 'Office Rent',
        Amount: 15000,
        ModeofPayment: 'Cash',
        Category: 'Rent',
        PaymentStatus: 'Confirmed',
        Description: 'Monthly office rent payment',
        createdAt: new Date().toISOString(),
      }
    ];

    // Sample Notifications
    const sampleNotifications = [
      {
        _id: 'demo-notif-1',
        CustomerName: 'Demo Supplier A',
        TransactionType: 'Buy',
        Message: 'Payment deadline approaching for Buy order BUY001',
        IsReaded: false,
        createdAt: new Date().toISOString(),
      }
    ];

    demoStorage.setItem('buy', sampleBuy);
    demoStorage.setItem('sell', sampleSell);
    demoStorage.setItem('banks', sampleBanks);
    demoStorage.setItem('otherCredits', sampleOtherCredits);
    demoStorage.setItem('otherDebits', sampleOtherDebits);
    demoStorage.setItem('notifications', sampleNotifications);
  }
};
