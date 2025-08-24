import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from './stores/themeStore';
import { useAuthStore } from './stores/authStore';

// Components
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import ThemeToggle from './components/ui/ThemeToggle';
import LoadingScreen from './components/ui/LoadingScreen';

// Pages
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import HotelDetailPage from './pages/HotelDetailPage';
import BookingsPage from './pages/BookingsPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';

// 3D Components
import Globe3D from './components/3d/Globe3D';

const App: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const { isAuthenticated, user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      {/* 3D Background Globe */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Globe3D />
      </div>

      {/* Main Layout */}
      <div className="relative z-10">
        {/* Header */}
        <Header 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen}
        />

        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen} 
          setIsOpen={setSidebarOpen}
        />

        {/* Theme Toggle */}
        <div className="fixed top-24 right-6 z-50">
          <ThemeToggle />
        </div>

        {/* Main Content */}
        <main className={`transition-all duration-500 ${
          sidebarOpen ? 'ml-64' : 'ml-0'
        } pt-20 min-h-screen`}>
          <AnimatePresence mode="wait">
            <Routes>
              <Route 
                path="/" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <HomePage />
                  </motion.div>
                } 
              />
              <Route 
                path="/explore" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ExplorePage />
                  </motion.div>
                } 
              />
              <Route 
                path="/search" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <SearchPage />
                  </motion.div>
                } 
              />
              <Route 
                path="/hotel/:id" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <HotelDetailPage />
                  </motion.div>
                } 
              />
              <Route 
                path="/bookings" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <BookingsPage />
                  </motion.div>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ProfilePage />
                  </motion.div>
                } 
              />
            </Routes>
          </AnimatePresence>
        </main>
      </div>

      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <button className="glass-card p-4 rounded-full luxury-gradient text-white shadow-lg hover:shadow-xl transition-all duration-300 group">
          <div className="w-6 h-6 relative">
            <div className="absolute inset-0 bg-white rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="absolute inset-1 bg-white rounded-full"></div>
          </div>
        </button>
      </motion.div>
    </div>
  );
};

export default App;
