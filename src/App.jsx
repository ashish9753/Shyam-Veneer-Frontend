import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Header from './components/Header';
import SessionManager from './components/SessionManager';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Buy from './pages/Buy';
import Sell from './pages/Sell';
import Accounting from './pages/Accounting';
import Banks from './pages/Banks';
import OtherCredit from './pages/OtherCredit';
import OtherDebit from './pages/OtherDebit';
import NotificationsFixed from './pages/NotificationsFixed';
import './App.css';

// Main App component that uses auth context
const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50">
        <div className="animate-pulse">
          {/* Header skeleton */}
          <div className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <div className="h-8 bg-gray-300 rounded w-40"></div>
                <div className="flex space-x-4">
                  <div className="h-8 bg-gray-300 rounded w-16"></div>
                  <div className="h-8 bg-gray-300 rounded w-20"></div>
                  <div className="h-8 bg-gray-300 rounded w-24"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Hero section skeleton */}
          <div className="relative min-h-[600px] bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-6 px-4 max-w-5xl mx-auto">
                <div className="h-6 bg-gray-300/70 rounded-full w-80 mx-auto"></div>
                <div className="h-16 bg-gray-300/70 rounded w-96 mx-auto"></div>
                <div className="h-8 bg-gray-300/70 rounded w-64 mx-auto"></div>
                <div className="h-6 bg-gray-300/70 rounded w-80 mx-auto"></div>
                <div className="flex gap-4 justify-center mt-8">
                  <div className="h-12 bg-gray-300/70 rounded w-40"></div>
                  <div className="h-12 bg-gray-300/70 rounded w-32"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Products sections skeleton */}
          <div className="py-16 px-4">
            {/* Ply products section */}
            <div className="text-center mb-10">
              <div className="h-10 bg-gray-300 rounded w-80 mx-auto mb-4"></div>
              <div className="w-24 h-1 bg-gray-300 mx-auto rounded-full"></div>
            </div>
            <div className="overflow-hidden py-4 mb-16">
              <div className="flex gap-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex-shrink-0 w-72 bg-white rounded-xl shadow-lg p-5 space-y-4">
                    <div className="h-56 bg-gray-300 rounded-lg"></div>
                    <div className="space-y-2">
                      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                      <div className="h-8 bg-gray-300 rounded w-2/3"></div>
                      <div className="h-10 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Furniture products section */}
            <div className="text-center mb-10">
              <div className="h-10 bg-gray-300 rounded w-80 mx-auto mb-4"></div>
              <div className="w-24 h-1 bg-gray-300 mx-auto rounded-full"></div>
            </div>
            <div className="overflow-hidden py-4 mb-16">
              <div className="flex gap-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex-shrink-0 w-72 bg-white rounded-xl shadow-lg p-5 space-y-4">
                    <div className="h-56 bg-gray-300 rounded-lg"></div>
                    <div className="space-y-2">
                      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                      <div className="h-8 bg-gray-300 rounded w-2/3"></div>
                      <div className="h-10 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Contact section skeleton */}
          <div className="bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 py-16">
            <div className="text-center px-4 max-w-4xl mx-auto space-y-6">
              <div className="h-12 bg-gray-300/70 rounded w-96 mx-auto"></div>
              <div className="h-6 bg-gray-300/70 rounded w-80 mx-auto"></div>
              <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mt-8">
                <div className="h-12 bg-gray-300/70 rounded w-52"></div>
                <div className="h-12 bg-gray-300/70 rounded w-40"></div>
              </div>
              <div className="mt-12 pt-12 space-y-3">
                <div className="h-6 bg-gray-300/70 rounded w-48 mx-auto"></div>
                <div className="h-8 bg-gray-300/70 rounded w-64 mx-auto"></div>
              </div>
            </div>
          </div>
          
          {/* Chatbot button skeleton */}
          <div className="fixed bottom-6 right-6">
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated, show login page
  if (!isAuthenticated()) {
    return <Login />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SessionManager />
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Admin Only Routes */}
          <Route 
            path="/buy" 
            element={
              <ProtectedRoute adminOnly={true}>
                <Buy />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/sell" 
            element={
              <ProtectedRoute adminOnly={true}>
                <Sell />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/accounting" 
            element={
              <ProtectedRoute adminOnly={true}>
                <Accounting />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/banks" 
            element={
              <ProtectedRoute adminOnly={true}>
                <Banks />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/other-credit" 
            element={
              <ProtectedRoute adminOnly={true}>
                <OtherCredit />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/other-debit" 
            element={
              <ProtectedRoute adminOnly={true}>
                <OtherDebit />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/notifications" 
            element={
              <ProtectedRoute adminOnly={true}>
                <NotificationsFixed />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

// Main App wrapper with AuthProvider and NotificationProvider
function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <AppContent />
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
