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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-6">
      <div className="container mx-auto">
        {/* Header Section with Wood Theme */}
        <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 rounded-2xl shadow-2xl p-8 mb-6 border-4 border-amber-700">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-amber-100 p-4 rounded-xl shadow-lg">
                <svg className="w-12 h-12 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-amber-50 tracking-wide drop-shadow-lg">Accounting Dashboard (Demo)</h1>
                <p className="text-amber-200 mt-1 text-sm">Session Storage - Data expires in 10 minutes</p>
              </div>
            </div>
            <button 
              onClick={calculateSummary}
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-3 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-amber-500"
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh Data
              </span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Income Card */}
          <div className="bg-green-50 border-4 border-green-300 rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-green-800 mb-2">Total Income</h3>
            <p className="text-3xl font-bold text-green-600">₹{summary.totalIncome.toLocaleString('en-IN')}</p>
            <p className="text-sm text-green-700 mt-2 font-medium">
              Sell: ₹{summary.totalSellAmount.toLocaleString()} + Other Credit: ₹{summary.totalOtherCreditAmount.toLocaleString()}
            </p>
          </div>

          {/* Expenses Card */}
          <div className="bg-red-50 border-4 border-red-300 rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-red-800 mb-2">Total Expenses</h3>
            <p className="text-3xl font-bold text-red-600">₹{summary.totalExpenses.toLocaleString('en-IN')}</p>
            <p className="text-sm text-red-700 mt-2 font-medium">
              Buy: ₹{summary.totalBuyAmount.toLocaleString()} + Other Debit: ₹{summary.totalOtherDebitAmount.toLocaleString()}
            </p>
          </div>

          {/* Profit/Loss Card */}
          <div className={`${summary.profitLoss >= 0 ? 'bg-emerald-50 border-emerald-300' : 'bg-orange-50 border-orange-300'} border-4 rounded-2xl shadow-xl p-6`}>
            <h3 className={`text-xl font-bold ${summary.profitLoss >= 0 ? 'text-emerald-800' : 'text-orange-800'} mb-2`}>
              {summary.profitLoss >= 0 ? 'Profit 💰' : 'Loss 📉'}
            </h3>
            <p className={`text-3xl font-bold ${summary.profitLoss >= 0 ? 'text-emerald-600' : 'text-orange-600'}`}>
              ₹{Math.abs(summary.profitLoss).toLocaleString('en-IN')}
            </p>
            <p className={`text-sm ${summary.profitLoss >= 0 ? 'text-emerald-700' : 'text-orange-700'} mt-2 font-medium`}>
              Income - Expenses
            </p>
          </div>

          {/* Transactions Card */}
          <div className="bg-blue-50 border-4 border-blue-300 rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-blue-800 mb-2">Total Transactions</h3>
            <p className="text-3xl font-bold text-blue-600">
              {(demoStorage.getItem('buy') || []).length + 
               (demoStorage.getItem('sell') || []).length + 
               (demoStorage.getItem('otherCredits') || []).length + 
               (demoStorage.getItem('otherDebits') || []).length}
            </p>
            <p className="text-sm text-blue-700 mt-2 font-medium">
              All recorded transactions
            </p>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Buy & Sell Breakdown */}
          <div className="bg-white border-4 border-amber-200 rounded-2xl shadow-xl p-6">
            <h3 className="text-2xl font-bold text-amber-900 mb-4 flex items-center">
              <svg className="w-7 h-7 mr-2 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Buy & Sell Transactions
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl">
                <span className="font-semibold text-red-800">Total Buy</span>
                <span className="text-xl font-bold text-red-600">₹{summary.totalBuyAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                <span className="font-semibold text-green-800">Total Sell</span>
                <span className="text-xl font-bold text-green-600">₹{summary.totalSellAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Other Transactions Breakdown */}
          <div className="bg-white border-4 border-amber-200 rounded-2xl shadow-xl p-6">
            <h3 className="text-2xl font-bold text-amber-900 mb-4 flex items-center">
              <svg className="w-7 h-7 mr-2 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Other Transactions
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                <span className="font-semibold text-blue-800">Other Credits</span>
                <span className="text-xl font-bold text-blue-600">₹{summary.totalOtherCreditAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-orange-50 rounded-xl">
                <span className="font-semibold text-orange-800">Other Debits</span>
                <span className="text-xl font-bold text-orange-600">₹{summary.totalOtherDebitAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemoAccounting;
