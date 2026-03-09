import React, { useState, useEffect } from 'react';
import { demoStorage } from '../../utils/demoStorage';

function DemoOtherDebit() {
  const [transactions, setTransactions] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    Name: '',
    Amount: '',
    ModeofPayment: 'Cash',
    Category: 'Rent',
    PaymentStatus: 'Confirmed',
    Description: '',
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {
    const data = demoStorage.getItem('otherDebits') || [];
    setTransactions(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      _id: 'demo-debit-' + Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
    };
    const currentTransactions = demoStorage.getItem('otherDebits') || [];
    demoStorage.setItem('otherDebits', [...currentTransactions, newTransaction]);
    setShowAddModal(false);
    setFormData({
      Name: '',
      Amount: '',
      ModeofPayment: 'Cash',
      Category: 'Rent',
      PaymentStatus: 'Confirmed',
      Description: '',
    });
    fetchTransactions();
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this transaction?')) {
      const currentTransactions = demoStorage.getItem('otherDebits') || [];
      demoStorage.setItem('otherDebits', currentTransactions.filter(t => t._id !== id));
      fetchTransactions();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-6">
      <div className="container mx-auto">
        {/* Header Section with Wood Theme */}
        <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 rounded-2xl shadow-2xl p-8 mb-6 border-4 border-amber-700">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-amber-100 p-4 rounded-xl shadow-lg">
                <svg className="w-12 h-12 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-amber-50 tracking-wide drop-shadow-lg">Other Debits (Demo)</h1>
                <p className="text-amber-200 mt-1 text-sm">Session Storage - Data expires in 10 minutes</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-red-500"
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Debit
              </span>
            </button>
          </div>
        </div>

        {/* Transactions Table with Wood Theme */}
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border-4 border-amber-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y-2 divide-amber-200">
              <thead className="bg-gradient-to-r from-red-700 via-red-600 to-red-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider border-r border-red-500">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider border-r border-red-500">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider border-r border-red-500">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider border-r border-red-500">Payment Mode</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider border-r border-red-500">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y-2 divide-red-100">
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-lg font-semibold">No debit transactions found</p>
                        <p className="text-sm mt-1">Click \"Add Debit\" to create your first transaction</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  transactions.map(transaction => (
                    <tr key={transaction._id} className="hover:bg-red-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.Name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">₹{parseFloat(transaction.Amount).toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.Category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.ModeofPayment}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          {transaction.PaymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button 
                          onClick={() => handleDelete(transaction._id)} 
                          className="text-red-600 hover:text-red-900 font-semibold hover:underline transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Add Debit</h2>
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
                  <option value="Rent">Rent</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Salary">Salary</option>
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
                  <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">Submit</button>
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

export default DemoOtherDebit;
