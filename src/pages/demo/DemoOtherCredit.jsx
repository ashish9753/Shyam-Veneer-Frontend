import React, { useState, useEffect } from 'react';
import { demoStorage } from '../../utils/demoStorage';

function DemoOtherCredit() {
  const [transactions, setTransactions] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    Name: '',
    Amount: '',
    ModeofPayment: 'Cash',
    Category: 'Grant',
    PaymentStatus: 'Confirmed',
    Description: '',
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {
    const data = demoStorage.getItem('otherCredits') || [];
    setTransactions(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      _id: 'demo-credit-' + Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
    };
    const currentTransactions = demoStorage.getItem('otherCredits') || [];
    demoStorage.setItem('otherCredits', [...currentTransactions, newTransaction]);
    setShowAddModal(false);
    setFormData({
      Name: '',
      Amount: '',
      ModeofPayment: 'Cash',
      Category: 'Grant',
      PaymentStatus: 'Confirmed',
      Description: '',
    });
    fetchTransactions();
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this transaction?')) {
      const currentTransactions = demoStorage.getItem('otherCredits') || [];
      demoStorage.setItem('otherCredits', currentTransactions.filter(t => t._id !== id));
      fetchTransactions();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-green-900">Other Credits (Demo)</h1>
            <p className="text-sm text-green-600 mt-1">Session Storage - Data expires in 10 minutes</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            Add Credit
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Amount</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Payment Mode</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map(transaction => (
                <tr key={transaction._id}>
                  <td className="px-6 py-4 text-sm text-gray-900">{transaction.Name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">₹{transaction.Amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{transaction.Category}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{transaction.ModeofPayment}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {transaction.PaymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button onClick={() => handleDelete(transaction._id)} className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Add Credit</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.Name}
                  onChange={(e) => setFormData({...formData, Name: e.target.value})}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={formData.Amount}
                  onChange={(e) => setFormData({...formData, Amount: e.target.value})}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
                <select
                  value={formData.Category}
                  onChange={(e) => setFormData({...formData, Category: e.target.value})}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="Grant">Grant</option>
                  <option value="Loan">Loan</option>
                  <option value="Other">Other</option>
                </select>
                <textarea
                  placeholder="Description"
                  value={formData.Description}
                  onChange={(e) => setFormData({...formData, Description: e.target.value})}
                  className="w-full px-3 py-2 border rounded"
                  rows="3"
                ></textarea>
                <div className="flex gap-2">
                  <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
                  <button type="button" onClick={() => setShowAddModal(false)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DemoOtherCredit;
