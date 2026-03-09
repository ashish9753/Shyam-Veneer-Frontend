import React, { createContext, useContext, useState, useEffect } from 'react';
import { demoStorage } from '../utils/demoStorage';

const DemoModeContext = createContext();

export const useDemoMode = () => {
  const context = useContext(DemoModeContext);
  if (!context) {
    throw new Error('useDemoMode must be used within DemoModeProvider');
  }
  return context;
};

export const DemoModeProvider = ({ children }) => {
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    // Check if demo mode is active
    const demoActive = sessionStorage.getItem('demo_mode_active');
    if (demoActive === 'true') {
      setIsDemoMode(true);
      updateRemainingTime();
    }
  }, []);

  useEffect(() => {
    if (isDemoMode) {
      const interval = setInterval(() => {
        updateRemainingTime();
      }, 60000); // Update every minute

      return () => clearInterval(interval);
    }
  }, [isDemoMode]);

  const updateRemainingTime = () => {
    const time = demoStorage.getRemainingTime('buy');
    setRemainingTime(time);
    if (time <= 0 && isDemoMode) {
      exitDemoMode();
    }
  };

  const enterDemoMode = () => {
    demoStorage.clearAll();
    demoStorage.initializeSampleData();
    sessionStorage.setItem('demo_mode_active', 'true');
    setIsDemoMode(true);
    updateRemainingTime();
  };

  const exitDemoMode = () => {
    demoStorage.clearAll();
    sessionStorage.removeItem('demo_mode_active');
    setIsDemoMode(false);
    setRemainingTime(0);
  };

  return (
    <DemoModeContext.Provider value={{ isDemoMode, enterDemoMode, exitDemoMode, remainingTime }}>
      {children}
    </DemoModeContext.Provider>
  );
};
