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
        <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 rounded-2xl shadow-2xl p-8 mb-8 border-4 border-amber-700">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-amber-50 tracking-wide drop-shadow-lg">Sell Dashboard (Demo)</h1>
              <p className="text-amber-200 mt-1 text-sm">Session Storage - Data expires in 10 minutes</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-3 rounded-xl font-semibold shadow-xl"
            >
              Add Sell Order
            </button>
          </div>
        </div>

        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border-4 border-amber-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-amber-700 to-amber-600">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-amber-50 uppercase">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-amber-50 uppercase">Item</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-amber-50 uppercase">Quantity</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-amber-50 uppercase">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-amber-50 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-amber-50 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map(order => (
                  <tr key={order._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.CustomerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.ItemName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.Quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{order.Amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${order.PaymentStatus === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {order.PaymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button onClick={() => handleDelete(order._id)} className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">Add Sell Order</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Customer Name"
                  value={formData.CustomerName}
                  onChange={(e) => setFormData({...formData, CustomerName: e.target.value})}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={formData.Quantity}
                  onChange={(e) => setFormData({...formData, Quantity: e.target.value})}
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
                <div className="flex gap-2">
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
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

export default DemoSell;
