// Demo Storage Utility with 10-minute expiry
const EXPIRY_TIME = 10 * 60 * 1000; // 10 minutes in milliseconds

class DemoStorage {
  constructor() {
    this.prefix = 'demo_';
  }

  // Set data with expiry timestamp
  setItem(key, value) {
    const item = {
      value: value,
      timestamp: Date.now(),
      expiry: Date.now() + EXPIRY_TIME
    };
    sessionStorage.setItem(this.prefix + key, JSON.stringify(item));
  }

  // Get data and check if it's expired
  getItem(key) {
    const itemStr = sessionStorage.getItem(this.prefix + key);
    
    if (!itemStr) {
      return null;
    }

    try {
      const item = JSON.parse(itemStr);
      
      // Check if expired
      if (Date.now() > item.expiry) {
        this.removeItem(key);
        return null;
      }
      
      return item.value;
    } catch (error) {
      console.error('Error parsing session storage item:', error);
      return null;
    }
  }

  // Remove specific item
  removeItem(key) {
    sessionStorage.removeItem(this.prefix + key);
  }

  // Clear all demo data
  clearAll() {
    const keysToRemove = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith(this.prefix)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => sessionStorage.removeItem(key));
  }

  // Check if data is still valid (not expired)
  isValid(key) {
    const itemStr = sessionStorage.getItem(this.prefix + key);
    if (!itemStr) return false;
    
    try {
      const item = JSON.parse(itemStr);
      return Date.now() <= item.expiry;
    } catch {
      return false;
    }
  }

  // Get remaining time in minutes
  getRemainingTime(key) {
    const itemStr = sessionStorage.getItem(this.prefix + key);
    if (!itemStr) return 0;
    
    try {
      const item = JSON.parse(itemStr);
      const remaining = item.expiry - Date.now();
      return Math.max(0, Math.floor(remaining / 60000)); // Convert to minutes
    } catch {
      return 0;
    }
  }

  // Initialize demo data with sample data
  initializeDemoData() {
    // Sample Buy data
    const sampleBuyData = [
      {
        _id: 'demo_buy_1',
        CustomerName: 'Demo Supplier A',
        ItemName: 'Teak Veneer',
        Under: 'Premium',
        Quantity: 100,
        Amount: 50000,
        VatAmount: 9000,
        BillNumber: 'BUY001',
        PhoneNumber: '9876543210',
        VehicleNumber: 'MH12AB1234',
        PaymentStatus: 'Pending',
        PaymentDeadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        ModeofPayment: '',
        DeliveryAddress: '123 Demo Street, Mumbai',
        createdAt: new Date().toISOString(),
        paymentHistory: []
      },
      {
        _id: 'demo_buy_2',
        CustomerName: 'Demo Supplier B',
        ItemName: 'Oak Veneer',
        Under: 'Standard',
        Quantity: 75,
        Amount: 35000,
        VatAmount: 6300,
        BillNumber: 'BUY002',
        PhoneNumber: '9876543211',
        VehicleNumber: 'MH12CD5678',
        PaymentStatus: 'Confirmed',
        PaymentDeadline: '',
        ModeofPayment: 'Bank Transfer',
        DeliveryAddress: '456 Demo Road, Pune',
        createdAt: new Date().toISOString(),
        paymentHistory: []
      }
    ];

    // Sample Sell data
    const sampleSellData = [
      {
        _id: 'demo_sell_1',
        CustomerName: 'Demo Customer A',
        ItemName: 'Walnut Veneer',
        Under: 'Premium',
        Quantity: 50,
        Amount: 75000,
        VatAmount: 13500,
        BillNumber: 'SELL001',
        CustomCharges: 2000,
        PhoneNumber: '9876543212',
        VehicleNumber: 'MH12EF9012',
        PaymentStatus: 'Pending',
        PaymentDeadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        ModeofPayment: '',
        DeliveryAddress: '789 Demo Avenue, Delhi',
        createdAt: new Date().toISOString(),
        paymentHistory: []
      },
      {
        _id: 'demo_sell_2',
        CustomerName: 'Demo Customer B',
        ItemName: 'Pine Veneer',
        Under: 'Standard',
        Quantity: 100,
        Amount: 45000,
        VatAmount: 8100,
        BillNumber: 'SELL002',
        CustomCharges: 1500,
        PhoneNumber: '9876543213',
        VehicleNumber: 'MH12GH3456',
        PaymentStatus: 'Confirmed',
        PaymentDeadline: '',
        ModeofPayment: 'Cash',
        DeliveryAddress: '321 Demo Lane, Bangalore',
        createdAt: new Date().toISOString(),
        paymentHistory: []
      }
    ];

    // Sample Other Credit data
    const sampleOtherCreditData = [
      {
        _id: 'demo_credit_1',
        Name: 'Demo Income Source',
        Amount: 25000,
        ModeofPayment: 'Bank Transfer',
        Category: 'Rental',
        PaymentStatus: 'Confirmed',
        Description: 'Monthly rent received',
        createdAt: new Date().toISOString(),
        paymentHistory: []
      }
    ];

    // Sample Other Debit data
    const sampleOtherDebitData = [
      {
        _id: 'demo_debit_1',
        Name: 'Demo Expense',
        Amount: 15000,
        ModeofPayment: 'Cash',
        Category: 'Utilities',
        PaymentStatus: 'Confirmed',
        Description: 'Electricity bill',
        createdAt: new Date().toISOString(),
        paymentHistory: []
      }
    ];

    // Sample Bank data
    const sampleBankData = [
      {
        _id: 'demo_bank_1',
        bankName: 'Demo Bank Ltd',
        accountNumber: '1234567890',
        accountHolderName: 'Shyam Veneer',
        ifscCode: 'DEMO0001234',
        branchName: 'Main Branch',
        accountType: 'Current',
        contactPerson: 'Demo Manager',
        contactNumber: '9876543214',
        address: '999 Bank Street, Mumbai',
        isActive: true,
        balance: 500000,
        createdAt: new Date().toISOString()
      }
    ];

    // Sample Notifications data
    const sampleNotificationsData = [
      {
        _id: 'demo_notif_1',
        CustomerName: 'Demo Customer A',
        TransactionType: 'Sell',
        Message: 'Payment deadline approaching in 3 days',
        Amount: 75000,
        PaymentDeadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        IsReaded: false,
        NotificationDate: new Date().toISOString(),
        createdAt: new Date().toISOString()
      }
    ];

    // Initialize all demo data
    this.setItem('buyData', sampleBuyData);
    this.setItem('sellData', sampleSellData);
    this.setItem('otherCreditData', sampleOtherCreditData);
    this.setItem('otherDebitData', sampleOtherDebitData);
    this.setItem('bankData', sampleBankData);
    this.setItem('notificationsData', sampleNotificationsData);
  }
}

export const demoStorage = new DemoStorage();
export default demoStorage;
