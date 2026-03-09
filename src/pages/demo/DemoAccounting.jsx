import React, { useState, useEffect } from 'react';
import { demoStorage } from '../../utils/demoStorage';

function DemoAccounting() {
  const [summary, setSummary] = useState({
    totalBuyAmount: 0,
    totalSellAmount: 0,
    totalOtherCreditAmount: 0,
    totalOtherDebitAmount: 0,
    totalIncome: 0,
    totalExpenses: 0,
    profitLoss: 0
  });

  useEffect(() => {
    calculateSummary();
  }, []);

  const calculateSummary = () => {
    const buy = demoStorage.getItem('buy') || [];
    const sell = demoStorage.getItem('sell') || [];
    const otherCredits = demoStorage.getItem('otherCredits') || [];
    const otherDebits = demoStorage.getItem('otherDebits') || [];

    const totalBuyAmount = buy.reduce((sum, item) => sum + (parseFloat(item.Amount) || 0), 0);
    const totalSellAmount = sell.reduce((sum, item) => sum + (parseFloat(item.Amount) || 0), 0);
    const totalOtherCreditAmount = otherCredits.reduce((sum, item) => sum + (parseFloat(item.Amount) || 0), 0);
    const totalOtherDebitAmount = otherDebits.reduce((sum, item) => sum + (parseFloat(item.Amount) || 0), 0);

    const totalIncome = totalSellAmount + totalOtherCreditAmount;
    const totalExpenses = totalBuyAmount + totalOtherDebitAmount;
    const profitLoss = totalIncome - totalExpenses;

    setSummary({
      totalBuyAmount,
      totalSellAmount,
      totalOtherCreditAmount,
      totalOtherDebitAmount,
      totalIncome,
      totalExpenses,
      profitLoss
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-900 mb-8">Accounting Dashboard (Demo)</h1>
        <p className="text-sm text-indigo-600 mb-6">Session Storage - Data expires in 10 minutes</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Buy</h3>
            <p className="text-2xl font-bold text-red-600">₹{summary.totalBuyAmount.toLocaleString('en-IN')}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Sell</h3>
            <p className="text-2xl font-bold text-green-600">₹{summary.totalSellAmount.toLocaleString('en-IN')}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Other Credits</h3>
            <p className="text-2xl font-bold text-blue-600">₹{summary.totalOtherCreditAmount.toLocaleString('en-IN')}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Other Debits</h3>
            <p className="text-2xl font-bold text-orange-600">₹{summary.totalOtherDebitAmount.toLocaleString('en-IN')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Income</h3>
            <p className="text-3xl font-bold text-green-600">₹{summary.totalIncome.toLocaleString('en-IN')}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Expenses</h3>
            <p className="text-3xl font-bold text-red-600">₹{summary.totalExpenses.toLocaleString('en-IN')}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Profit/Loss</h3>
            <p className={`text-3xl font-bold ${summary.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ₹{summary.profitLoss.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemoAccounting;
