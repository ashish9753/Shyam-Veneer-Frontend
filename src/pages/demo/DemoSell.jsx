import React, { useState, useEffect } from 'react';
import { demoStorage } from '../../utils/demoStorage';

function DemoSell() {
  const [orders, setOrders] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    CustomerName: '',
    ItemName: 'Goliya',
    Under: 'Sundry Debitors',
    Quantity: '',
    Amount: '',
    VatAmount: '',
    BillNumber: '',
    CustomCharges: '',
    PhoneNumber: '',
    VehicleNumber: '',
    PaymentStatus: 'Pending',
    PaymentDeadline: '',
    ModeofPayment: '',
    DeliveryAddress: '',
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    const data = demoStorage.getItem('sell') || [];
    setOrders(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      _id: 'demo-sell-' + Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
    };
    const currentOrders = demoStorage.getItem('sell') || [];
    demoStorage.setItem('sell', [...currentOrders, newOrder]);
    setShowAddModal(false);
    setFormData({
      CustomerName: '',
      ItemName: 'Goliya',
      Under: 'Sundry Debitors',
      Quantity: '',
      Amount: '',
      VatAmount: '',
      BillNumber: '',
      CustomCharges: '',
      PhoneNumber: '',
      VehicleNumber: '',
      PaymentStatus: 'Pending',
      PaymentDeadline: '',
      ModeofPayment: '',
      DeliveryAddress: '',
    });
    fetchOrders();
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this order?')) {
      const currentOrders = demoStorage.getItem('sell') || [];
      demoStorage.setItem('sell', currentOrders.filter(o => o._id !== id));
      fetchOrders();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section with Wood Theme */}
        <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 rounded-2xl shadow-2xl p-8 mb-8 border-4 border-amber-700">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-amber-100 p-4 rounded-xl shadow-lg">
                <svg className="w-12 h-12 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-amber-50 tracking-wide drop-shadow-lg">Sell Dashboard (Demo)</h1>
                <p className="text-amber-200 mt-1 text-sm">Session Storage - Data expires in 10 minutes</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-3 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-amber-500"
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Sell Order
              </span>
            </button>
          </div>
        </div>

        {/* Orders Table with Wood Theme */}
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border-4 border-amber-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y-2 divide-amber-200">
              <thead className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-amber-50 uppercase tracking-wider border-r border-amber-600">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-amber-50 uppercase tracking-wider border-r border-amber-600">Item</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-amber-50 uppercase tracking-wider border-r border-amber-600">Quantity</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-amber-50 uppercase tracking-wider border-r border-amber-600">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-amber-50 uppercase tracking-wider border-r border-amber-600">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-amber-50 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y-2 divide-amber-100">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-lg font-semibold">No sell orders found</p>
                        <p className="text-sm mt-1">Click "Add Sell Order" to create your first order</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  orders.map(order => (
                    <tr key={order._id} className="hover:bg-amber-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.CustomerName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.ItemName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.Quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">₹{order.Amount?.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.PaymentStatus === 'Confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.PaymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button 
                          onClick={() => handleDelete(order._id)} 
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
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-amber-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-amber-900">Add Sell Order</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-amber-900 mb-2">Customer Name *</label>
                  <input
                    type="text"
                    placeholder="Enter customer name"
                    value={formData.CustomerName}
                    onChange={(e) => setFormData({...formData, CustomerName: e.target.value})}
                    required
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-amber-900 mb-2">Item Name *</label>
                  <input
                    type="text"
                    placeholder="Enter item name"
                    value={formData.ItemName}
                    onChange={(e) => setFormData({...formData, ItemName: e.target.value})}
                    required
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-amber-900 mb-2">Quantity *</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={formData.Quantity}
                      onChange={(e) => setFormData({...formData, Quantity: e.target.value})}
                      required
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-amber-900 mb-2">Amount *</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={formData.Amount}
                      onChange={(e) => setFormData({...formData, Amount: e.target.value})}
                      required
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-amber-900 mb-2">Payment Status</label>
                  <select
                    value={formData.PaymentStatus}
                    onChange={(e) => setFormData({...formData, PaymentStatus: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    Create Order
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowAddModal(false)} 
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-xl font-semibold transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DemoSell;
