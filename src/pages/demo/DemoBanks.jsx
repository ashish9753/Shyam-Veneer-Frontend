import React, { useState, useEffect } from 'react';
import { demoStorage } from '../../utils/demoStorage';

function DemoBanks() {
  const [banks, setBanks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    bankName: '',
    accountNumber: '',
    accountHolderName: '',
    ifscCode: '',
    branchName: '',
    accountType: 'Current',
  });

  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = () => {
    const data = demoStorage.getItem('banks') || [];
    setBanks(data);
  };

  const handleAddBank = (e) => {
    e.preventDefault();
    const newBank = {
      _id: 'demo-bank-' + Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
    };
    const currentBanks = demoStorage.getItem('banks') || [];
    demoStorage.setItem('banks', [...currentBanks, newBank]);
    setShowAddForm(false);
    setFormData({
      bankName: '',
      accountNumber: '',
      accountHolderName: '',
      ifscCode: '',
      branchName: '',
      accountType: 'Current',
    });
    fetchBanks();
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this bank?')) {
      const currentBanks = demoStorage.getItem('banks') || [];
      demoStorage.setItem('banks', currentBanks.filter(b => b._id !== id));
      fetchBanks();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Wood Theme */}
        <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 rounded-2xl shadow-2xl p-8 mb-6 border-4 border-amber-700">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-amber-100 p-4 rounded-xl shadow-lg">
                <svg className="w-12 h-12 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-amber-50 tracking-wide drop-shadow-lg">Bank Management (Demo)</h1>
                <p className="text-amber-200 mt-1 text-sm">Session Storage - Data expires in 10 minutes</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-3 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-amber-500"
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {showAddForm ? 'Cancel' : 'Add Bank Account'}
              </span>
            </button>
          </div>
        </div>

        {showAddForm && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6 border-4 border-amber-200">
            <h2 className="text-3xl font-bold text-amber-900 mb-6">Add Bank Account</h2>
            <form onSubmit={handleAddBank} className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-2">Bank Name *</label>
                <input
                  type="text"
                  placeholder="Enter bank name"
                  value={formData.bankName}
                  onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                  required
                  className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-2">Account Number *</label>
                <input
                  type="text"
                  placeholder="Enter account number"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                  required
                  className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-2">Account Holder *</label>
                <input
                  type="text"
                  placeholder="Enter holder name"
                  value={formData.accountHolderName}
                  onChange={(e) => setFormData({...formData, accountHolderName: e.target.value})}
                  required
                  className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-2">IFSC Code *</label>
                <input
                  type="text"
                  placeholder="Enter IFSC code"
                  value={formData.ifscCode}
                  onChange={(e) => setFormData({...formData, ifscCode: e.target.value})}
                  required
                  className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-2">Branch Name *</label>
                <input
                  type="text"
                  placeholder="Enter branch name"
                  value={formData.branchName}
                  onChange={(e) => setFormData({...formData, branchName: e.target.value})}
                  required
                  className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-2">Account Type *</label>
                <select
                  value={formData.accountType}
                  onChange={(e) => setFormData({...formData, accountType: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="Current">Current</option>
                  <option value="Savings">Savings</option>
                </select>
              </div>
              <div className="col-span-2">
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Add Bank Account
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banks.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <p className="text-lg font-semibold text-gray-500">No bank accounts found</p>
              <p className="text-sm text-gray-400 mt-1">Click "Add Bank Account" to create one</p>
            </div>
          ) : (
            banks.map(bank => (
              <div key={bank._id} className="bg-white border-4 border-amber-200 rounded-2xl shadow-xl p-6 hover:shadow-2xl hover:border-amber-300 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-amber-900">{bank.bankName}</h3>
                  <span className={`px-3 py-1 rounded-xl text-xs font-semibold ${
                    bank.accountType === 'Current' 
                      ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' 
                      : 'bg-green-100 text-green-800 border-2 border-green-300'
                  }`}>
                    {bank.accountType}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><span className="font-semibold text-amber-900">Account No:</span> ****{bank.accountNumber.slice(-4)}</p>
                  <p><span className="font-semibold text-amber-900">Holder:</span> {bank.accountHolderName}</p>
                  <p><span className="font-semibold text-amber-900">IFSC:</span> {bank.ifscCode}</p>
                  <p><span className="font-semibold text-amber-900">Branch:</span> {bank.branchName}</p>
                </div>
                <button
                  onClick={() => handleDelete(bank._id)}
                  className="mt-4 w-full bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 px-4 py-2 rounded-xl font-semibold transition-colors border-2 border-red-200"
                >
                  Delete Bank
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default DemoBanks;
