import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const SessionManager = () => {
  const { user, logout } = useAuth();
  const [timeLeft, setTimeLeft] = useState('');
  const [sessionWarning, setSessionWarning] = useState(false);

  useEffect(() => {
    if (!user) return;

    const updateSessionInfo = () => {
      const loginTime = localStorage.getItem('loginTime');
      const lastActivity = localStorage.getItem('lastActivity');
      
      if (!loginTime || !lastActivity) return;

      const now = Date.now();
      const loginTimestamp = parseInt(loginTime);
      const lastActivityTimestamp = parseInt(lastActivity);
      
      // Session duration: 24 hours
      const sessionExpiry = loginTimestamp + (24 * 60 * 60 * 1000);
      const sessionTimeLeft = sessionExpiry - now;
      
      // Inactivity timeout: 30 minutes
      const inactivityExpiry = lastActivityTimestamp + (30 * 60 * 1000);
      const inactivityTimeLeft = inactivityExpiry - now;
      
      // Use the smaller of the two timeouts
      const effectiveTimeLeft = Math.min(sessionTimeLeft, inactivityTimeLeft);
      
      if (effectiveTimeLeft <= 0) {
        logout();
        return;
      }
      
      // Show warning when less than 5 minutes left
      if (effectiveTimeLeft <= 5 * 60 * 1000) {
        setSessionWarning(true);
      } else {
        setSessionWarning(false);
      }
      
      // Format time display
      const hours = Math.floor(effectiveTimeLeft / (60 * 60 * 1000));
      const minutes = Math.floor((effectiveTimeLeft % (60 * 60 * 1000)) / (60 * 1000));
      
      if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m`);
      } else {
        setTimeLeft(`${minutes}m`);
      }
    };

    // Update immediately
    updateSessionInfo();
    
    // Update every minute
    const interval = setInterval(updateSessionInfo, 60000);
    
    return () => clearInterval(interval);
  }, [user, logout]);

  if (!user) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      {sessionWarning && (
        <div className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg mb-2 animate-pulse">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-semibold">Session expires in {timeLeft}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionManager;