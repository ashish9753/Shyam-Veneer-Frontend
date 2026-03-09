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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-6">
      <div className="container mx-auto">
        {/* Header Section with Wood Theme */}
        <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 rounded-2xl shadow-2xl p-8 mb-6 border-4 border-amber-700">
          <div className="flex items-center space-x-4">
            <div className="bg-amber-100 p-4 rounded-xl shadow-lg">
              <svg className="w-12 h-12 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-amber-50 tracking-wide drop-shadow-lg">Notifications (Demo)</h1>
              <p className="text-amber-200 mt-1 text-sm">Session Storage - Data expires in 10 minutes</p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-50 border-4 border-blue-300 rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-blue-800 mb-2">Total</h3>
            <p className="text-4xl font-bold text-blue-600">{stats.total}</p>
            <p className="text-sm text-blue-700 mt-2 font-medium">All notifications</p>
          </div>
          <div className="bg-orange-50 border-4 border-orange-300 rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-orange-800 mb-2">Unread</h3>
            <p className="text-4xl font-bold text-orange-600">{stats.unread}</p>
            <p className="text-sm text-orange-700 mt-2 font-medium">Pending review</p>
          </div>
          <div className="bg-green-50 border-4 border-green-300 rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-green-800 mb-2">Read</h3>
            <p className="text-4xl font-bold text-green-600">{stats.read}</p>
            <p className="text-sm text-green-700 mt-2 font-medium">Acknowledged</p>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border-4 border-amber-200">
          <div className="divide-y-2 divide-amber-100">
            {notifications.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <div className="flex flex-col items-center">
                  <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <p className="text-lg font-semibold">No notifications available</p>
                  <p className="text-sm mt-1">You're all caught up!</p>
                </div>
              </div>
            ) : (
              notifications.map(notification => (
                <div
                  key={notification._id}
                  className={`p-6 ${!notification.IsReaded ? 'bg-amber-50' : 'bg-white'} hover:bg-amber-100 transition-colors`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {!notification.IsReaded && (
                          <span className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></span>
                        )}
                        <h3 className="text-lg font-semibold text-gray-900">{notification.CustomerName}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 ml-6">{notification.Message}</p>
                      <p className="text-xs text-gray-400 mt-2 ml-6">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                    {!notification.IsReaded && (
                      <button
                        onClick={() => markAsRead(notification._id)}
                        className="ml-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
                      >
                        Mark as Read
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemoNotifications;
