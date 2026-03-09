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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Bank Accounts (Demo)</h1>
            <p className="text-sm text-gray-600 mt-1">Session Storage - Data expires in 10 minutes</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            {showAddForm ? 'Cancel' : 'Add Bank Account'}
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">Add Bank Account</h2>
            <form onSubmit={handleAddBank} className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Bank Name"
                value={formData.bankName}
                onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                required
                className="px-3 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="Account Number"
                value={formData.accountNumber}
                onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                required
                className="px-3 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="Account Holder Name"
                value={formData.accountHolderName}
                onChange={(e) => setFormData({...formData, accountHolderName: e.target.value})}
                required
                className="px-3 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="IFSC Code"
                value={formData.ifscCode}
                onChange={(e) => setFormData({...formData, ifscCode: e.target.value})}
                required
                className="px-3 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="Branch Name"
                value={formData.branchName}
                onChange={(e) => setFormData({...formData, branchName: e.target.value})}
                required
                className="px-3 py-2 border rounded"
              />
              <select
                value={formData.accountType}
                onChange={(e) => setFormData({...formData, accountType: e.target.value})}
                className="px-3 py-2 border rounded"
              >
                <option value="Current">Current</option>
                <option value="Savings">Savings</option>
              </select>
              <div className="col-span-2">
                <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                  Add Bank
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banks.map(bank => (
            <div key={bank._id} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{bank.bankName}</h3>
              <p className="text-sm text-gray-600">Acc: {bank.accountNumber}</p>
              <p className="text-sm text-gray-600">Holder: {bank.accountHolderName}</p>
              <p className="text-sm text-gray-600">IFSC: {bank.ifscCode}</p>
              <p className="text-sm text-gray-600">Branch: {bank.branchName}</p>
              <p className="text-sm text-gray-600">Type: {bank.accountType}</p>
              <button
                onClick={() => handleDelete(bank._id)}
                className="mt-4 text-red-600 hover:text-red-800 text-sm font-semibold"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DemoBanks;
