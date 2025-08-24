import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin } from 'lucide-react';
import { useHotelStore } from '../stores/hotelStore';
import HotelCard from '../components/hotels/HotelCard';

const SearchPage: React.FC = () => {
  const { searchFilters } = useHotelStore();

  // Sample search results
  const searchResults = [
    {
      id: '1',
      name: 'Luxury Palace Hotel',
      location: { city: 'Paris', country: 'France', coordinates: [48.8566, 2.3522] },
      rating: 4.8,
      price: { amount: 450, currency: 'USD', originalAmount: 550 },
      images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'],
      amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant'],
      description: 'Experience luxury at its finest in the heart of Paris.',
      tags: ['Luxury', 'Romantic', 'City Center'],
      starRating: 5,
      reviews: { count: 1247, average: 4.8 },
      availability: { checkIn: '2024-01-15', checkOut: '2024-01-20', availableRooms: 12 },
      features: {
        wifi: true, pool: true, spa: true, gym: true, restaurant: true, parking: true, petFriendly: false
      }
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">
            Search <span className="text-gradient">Results</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Found {searchResults.length} hotels matching your criteria
          </p>
        </motion.div>

        {/* Search Summary */}
        <motion.div
          className="glass-card p-6 rounded-2xl mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center space-x-4">
            <Search className="w-6 h-6 text-primary-400" />
            <div>
              <h3 className="text-white font-semibold">Search Criteria</h3>
              <p className="text-gray-300">
                {searchFilters.destination || 'Any destination'} • 
                {searchFilters.checkIn && searchFilters.checkOut 
                  ? ` ${searchFilters.checkIn} to ${searchFilters.checkOut}` 
                  : ' Any dates'} • 
                {searchFilters.guests} guest{searchFilters.guests > 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {searchResults.map((hotel, index) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
            >
              <HotelCard hotel={hotel} />
            </motion.div>
          ))}
        </motion.div>

        {/* No Results Message */}
        {searchResults.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="w-24 h-24 mx-auto mb-6 glass-card rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">No hotels found</h3>
            <p className="text-gray-300 mb-6">
              Try adjusting your search criteria or browse our featured hotels
            </p>
            <motion.button
              className="luxury-gradient px-8 py-4 rounded-full text-white font-semibold hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse All Hotels
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
