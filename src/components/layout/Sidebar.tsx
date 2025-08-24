import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Map, 
  Calendar, 
  User, 
  Settings, 
  HelpCircle, 
  LogOut,
  X,
  Star,
  TrendingUp,
  Clock
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/', badge: null },
    { icon: Map, label: 'Explore', path: '/explore', badge: 'New' },
    { icon: Calendar, label: 'Bookings', path: '/bookings', badge: '3' },
    { icon: User, label: 'Profile', path: '/profile', badge: null },
    { icon: Star, label: 'Luxury', path: '/luxury', badge: 'Premium' },
    { icon: TrendingUp, label: 'Deals', path: '/deals', badge: 'Hot' },
    { icon: Clock, label: 'Last Minute', path: '/last-minute', badge: '24h' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-64 z-40 glass-card backdrop-blur-xl border-r border-white/10"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 luxury-gradient rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">L</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-display font-bold text-gradient">
                      LuxStay
                    </h2>
                    <p className="text-xs text-gray-400">Premium Travel</p>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="glass-button p-2 rounded-lg hover:bg-white/20 transition-all duration-300 lg:hidden"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Info */}
              {isAuthenticated && user && (
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 luxury-gradient rounded-full flex items-center justify-center">
                      {user.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="w-12 h-12 rounded-full"
                        />
                      ) : (
                        <User className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{user.name}</h3>
                      <p className="text-sm text-gray-400">{user.email}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-400">
                          {user.loyaltyPoints} points
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Menu */}
              <nav className="flex-1 p-6">
                <ul className="space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    
                    return (
                      <motion.li key={item.path}>
                        <button
                          onClick={() => handleNavigation(item.path)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group ${
                            isActive
                              ? 'luxury-gradient text-white shadow-lg'
                              : 'glass-button hover:bg-white/20 text-gray-300 hover:text-white'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                          </div>
                          
                          {item.badge && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.badge === 'New' || item.badge === 'Premium'
                                ? 'bg-blue-500/20 text-blue-400'
                                : item.badge === 'Hot'
                                ? 'bg-red-500/20 text-red-400'
                                : item.badge === '24h'
                                ? 'bg-orange-500/20 text-orange-400'
                                : 'bg-gray-500/20 text-gray-400'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Footer */}
              <div className="p-6 border-t border-white/10">
                <ul className="space-y-2">
                  <motion.li>
                    <button className="w-full flex items-center space-x-3 p-3 rounded-xl glass-button hover:bg-white/20 text-gray-300 hover:text-white transition-all duration-300 group">
                      <Settings className="w-5 h-5" />
                      <span className="font-medium">Settings</span>
                    </button>
                  </motion.li>
                  
                  <motion.li>
                    <button className="w-full flex items-center space-x-3 p-3 rounded-xl glass-button hover:bg-white/20 text-gray-300 hover:text-white transition-all duration-300 group">
                      <HelpCircle className="w-5 h-5" />
                      <span className="font-medium">Help & Support</span>
                    </button>
                  </motion.li>
                  
                  {isAuthenticated && (
                    <motion.li>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 p-3 rounded-xl glass-button hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all duration-300 group"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </motion.li>
                  )}
                </ul>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
