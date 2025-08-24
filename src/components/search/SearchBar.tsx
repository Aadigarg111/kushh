import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Mic, 
  MapPin, 
  Calendar, 
  Users, 
  Filter,
  X,
  TrendingUp,
  Clock,
  Star
} from 'lucide-react';
import { useHotelStore } from '../../stores/hotelStore';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const { searchFilters, updateSearchFilters } = useHotelStore();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const popularDestinations = [
    'Paris, France',
    'Tokyo, Japan',
    'New York, USA',
    'Dubai, UAE',
    'London, UK',
    'Barcelona, Spain',
    'Rome, Italy',
    'Amsterdam, Netherlands'
  ];

  const quickFilters = [
    { label: 'Luxury', icon: Star, color: 'from-yellow-400 to-orange-500' },
    { label: 'Last Minute', icon: Clock, color: 'from-red-400 to-pink-500' },
    { label: 'Trending', icon: TrendingUp, color: 'from-green-400 to-blue-500' },
  ];

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

  const handleDestinationSelect = (destination: string) => {
    updateSearchFilters({ destination });
    setIsExpanded(false);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <motion.div
        className="glass-card rounded-2xl p-4"
        layout
        animate={{ height: isExpanded ? 'auto' : 'auto' }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center space-x-4">
          {/* Destination Input */}
          <div className="flex-1 relative">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Where are you going?"
                value={searchFilters.destination}
                onChange={(e) => updateSearchFilters({ destination: e.target.value })}
                onFocus={() => setIsExpanded(true)}
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400 text-lg"
              />
            </div>
            
            {/* Popular Destinations Dropdown */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 glass-card rounded-xl p-4 z-50"
                >
                  <div className="space-y-2">
                    <h4 className="text-white font-medium mb-3">Popular Destinations</h4>
                    {popularDestinations.map((destination) => (
                      <motion.button
                        key={destination}
                        onClick={() => handleDestinationSelect(destination)}
                        className="w-full text-left p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 text-white"
                        whileHover={{ x: 5 }}
                      >
                        {destination}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Date Inputs */}
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={searchFilters.checkIn}
              onChange={(e) => updateSearchFilters({ checkIn: e.target.value })}
              className="bg-transparent border-none outline-none text-white text-sm"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={searchFilters.checkOut}
              onChange={(e) => updateSearchFilters({ checkOut: e.target.value })}
              className="bg-transparent border-none outline-none text-white text-sm"
            />
          </div>

          {/* Guests Input */}
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-gray-400" />
            <select
              value={searchFilters.guests}
              onChange={(e) => updateSearchFilters({ guests: parseInt(e.target.value) })}
              className="bg-transparent border-none outline-none text-white text-sm"
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num} className="bg-gray-800">
                  {num} Guest{num > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-3 rounded-lg transition-all duration-300 ${
                showFilters 
                  ? 'luxury-gradient text-white' 
                  : 'glass-button hover:bg-white/20 text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter className="w-5 h-5" />
            </motion.button>

            <motion.button
              onClick={handleVoiceSearch}
              className={`p-3 rounded-lg transition-all duration-300 ${
                isListening 
                  ? 'bg-red-500/20 text-red-400' 
                  : 'glass-button hover:bg-white/20 text-white'
              }`}
              animate={isListening ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5, repeat: isListening ? Infinity : 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mic className="w-5 h-5" />
            </motion.button>

            <motion.button
              onClick={handleSearch}
              className="luxury-gradient p-3 rounded-lg text-white hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-white/10"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Price Range */}
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Price Range</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      value={searchFilters.priceRange[1]}
                      onChange={(e) => updateSearchFilters({ 
                        priceRange: [searchFilters.priceRange[0], parseInt(e.target.value)] 
                      })}
                      className="flex-1"
                    />
                    <span className="text-white text-sm">${searchFilters.priceRange[1]}</span>
                  </div>
                </div>

                {/* Star Rating */}
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Star Rating</label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <motion.button
                        key={star}
                        onClick={() => {
                          const current = searchFilters.starRating;
                          const newRating = current.includes(star)
                            ? current.filter(s => s !== star)
                            : [...current, star];
                          updateSearchFilters({ starRating: newRating });
                        }}
                        className={`p-1 rounded ${
                          searchFilters.starRating.includes(star)
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'text-gray-400 hover:text-yellow-400'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Quick Filters */}
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Quick Filters</label>
                  <div className="flex flex-wrap gap-2">
                    {quickFilters.map((filter) => (
                      <motion.button
                        key={filter.label}
                        className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${filter.color}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <filter.icon className="w-3 h-3 inline mr-1" />
                        {filter.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Backdrop for dropdown */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;
