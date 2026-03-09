import React, { useState, useEffect } from 'react';
import { demoStorage } from '../../utils/demoStorage';

function DemoNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = () => {
    const data = demoStorage.getItem('notifications') || [];
    setNotifications(data);
  };

  const markAsRead = (id) => {
    const currentNotifications = demoStorage.getItem('notifications') || [];
    const updated = currentNotifications.map(notif =>
      notif._id === id ? { ...notif, IsReaded: true } : notif
    );
    demoStorage.setItem('notifications', updated);
    fetchNotifications();
  };

  const getStatistics = () => {
    const total = notifications.length;
    const unread = notifications.filter(notif => !notif.IsReaded).length;
    const read = notifications.filter(notif => notif.IsReaded).length;
    return { total, unread, read };
  };

  const stats = getStatistics();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-900 mb-2">Notifications (Demo)</h1>
        <p className="text-sm text-indigo-600 mb-8">Session Storage - Data expires in 10 minutes</p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-sm font-medium text-gray-500">Total</h3>
            <p className="text-3xl font-bold text-indigo-600">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-sm font-medium text-gray-500">Unread</h3>
            <p className="text-3xl font-bold text-red-600">{stats.unread}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-sm font-medium text-gray-500">Read</h3>
            <p className="text-3xl font-bold text-green-600">{stats.read}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="divide-y divide-gray-200">
            {notifications.map(notification => (
              <div
                key={notification._id}
                className={`p-6 ${!notification.IsReaded ? 'bg-blue-50' : 'bg-white'}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{notification.CustomerName}</h3>
                    <p className="text-sm text-gray-600 mt-1">{notification.Message}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {!notification.IsReaded && (
                    <button
                      onClick={() => markAsRead(notification._id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              </div>
            ))}
            {notifications.length === 0 && (
              <div className="p-6 text-center text-gray-500">
                No notifications available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemoNotifications;
