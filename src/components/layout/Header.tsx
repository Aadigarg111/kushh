import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Menu, 
  Search, 
  Mic, 
  Bell, 
  User, 
  Heart, 
  MapPin,
  Calendar,
  Users
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useHotelStore } from '../../stores/hotelStore';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { isAuthenticated, user } = useAuthStore();
  const { searchFilters, updateSearchFilters } = useHotelStore();
  const navigate = useNavigate();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handleVoiceSearch = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      // In a real app, this would use the Web Speech API
    }, 3000);
  };

  const handleSearch = () => {
    navigate('/search');
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 glass-card backdrop-blur-xl border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="glass-button p-2 rounded-lg hover:bg-white/20 transition-all duration-300"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <motion.div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-8 h-8 luxury-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="text-xl font-display font-bold text-gradient">
                LuxStay
              </span>
            </motion.div>
          </div>

          {/* Center Section - Search Bar */}
          <motion.div
            className={`flex-1 max-w-2xl mx-8 transition-all duration-500 ${
              isSearchExpanded ? 'max-w-4xl' : ''
            }`}
            layout
          >
            <div className="relative">
              <div className="glass-card rounded-2xl p-2 flex items-center space-x-3">
                <div className="flex-1 flex items-center space-x-3">
                  <div className="flex items-center space-x-2 flex-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Where are you going?"
                      value={searchFilters.destination}
                      onChange={(e) => updateSearchFilters({ destination: e.target.value })}
                      className="flex-1 bg-transparent border-none outline-none text-sm placeholder-gray-400"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <input
                      type="date"
                      value={searchFilters.checkIn}
                      onChange={(e) => updateSearchFilters({ checkIn: e.target.value })}
                      className="bg-transparent border-none outline-none text-sm"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <input
                      type="date"
                      value={searchFilters.checkOut}
                      onChange={(e) => updateSearchFilters({ checkOut: e.target.value })}
                      className="bg-transparent border-none outline-none text-sm"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <select
                      value={searchFilters.guests}
                      onChange={(e) => updateSearchFilters({ guests: parseInt(e.target.value) })}
                      className="bg-transparent border-none outline-none text-sm"
                    >
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <motion.button
                    onClick={handleVoiceSearch}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      isListening 
                        ? 'bg-red-500/20 text-red-400' 
                        : 'glass-button hover:bg-white/20'
                    }`}
                    animate={isListening ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.5, repeat: isListening ? Infinity : 0 }}
                  >
                    <Mic className="w-4 h-4" />
                  </motion.button>
                  
                  <motion.button
                    onClick={handleSearch}
                    className="luxury-gradient p-2 rounded-lg text-white hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Search className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            <motion.button
              className="glass-button p-2 rounded-lg hover:bg-white/20 transition-all duration-300 relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center">
                3
              </span>
            </motion.button>
            
            <motion.button
              className="glass-button p-2 rounded-lg hover:bg-white/20 transition-all duration-300 relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full text-xs flex items-center justify-center">
                5
              </span>
            </motion.button>
            
            <motion.button
              onClick={() => navigate('/profile')}
              className="glass-button p-2 rounded-lg hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isAuthenticated && user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-5 h-5 rounded-full"
                />
              ) : (
                <User className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
