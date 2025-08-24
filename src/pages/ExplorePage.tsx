import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Map, 
  Filter, 
  Grid, 
  List, 
  Star, 
  Heart,
  Sliders,
  X,
  Search,
  Globe
} from 'lucide-react';
import { useHotelStore } from '../stores/hotelStore';
import HotelCard from '../components/hotels/HotelCard';
import SearchBar from '../components/search/SearchBar';
import { AnimatePresence } from 'framer-motion';

const ExplorePage: React.FC = () => {
  const { hotels, filteredHotels, searchFilters, updateSearchFilters } = useHotelStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample hotel data for demonstration
  const sampleHotels = [
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
    },
    {
      id: '2',
      name: 'Ocean View Resort',
      location: { city: 'Maldives', country: 'Maldives', coordinates: [3.2028, 73.2207] },
      rating: 4.9,
      price: { amount: 1200, currency: 'USD' },
      images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400'],
      amenities: ['Private Beach', 'Spa', 'Water Sports', 'Fine Dining'],
      description: 'Overwater bungalows with stunning ocean views.',
      tags: ['Beach', 'Luxury', 'Romantic'],
      starRating: 5,
      reviews: { count: 892, average: 4.9 },
      availability: { checkIn: '2024-01-15', checkOut: '2024-01-20', availableRooms: 8 },
      features: {
        wifi: true, pool: true, spa: true, gym: true, restaurant: true, parking: false, petFriendly: false
      }
    },
    {
      id: '3',
      name: 'Mountain Lodge',
      location: { city: 'Swiss Alps', country: 'Switzerland', coordinates: [46.8182, 8.2275] },
      rating: 4.7,
      price: { amount: 380, currency: 'USD', originalAmount: 450 },
      images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400'],
      amenities: ['Skiing', 'Spa', 'Restaurant', 'Fireplace'],
      description: 'Cozy mountain retreat with panoramic alpine views.',
      tags: ['Mountain', 'Adventure', 'Cozy'],
      starRating: 4,
      reviews: { count: 567, average: 4.7 },
      availability: { checkIn: '2024-01-15', checkOut: '2024-01-20', availableRooms: 15 },
      features: {
        wifi: true, pool: false, spa: true, gym: false, restaurant: true, parking: true, petFriendly: true
      }
    }
  ];

  useEffect(() => {
    // Initialize with sample data if empty
    if (hotels.length === 0) {
      // In a real app, this would come from an API
      console.log('Loading sample hotel data...');
    }
  }, [hotels]);

  const categories = [
    { id: 'all', label: 'All Hotels', count: sampleHotels.length },
    { id: 'luxury', label: 'Luxury', count: 45 },
    { id: 'beach', label: 'Beach', count: 32 },
    { id: 'mountain', label: 'Mountain', count: 28 },
    { id: 'city', label: 'City', count: 67 },
    { id: 'boutique', label: 'Boutique', count: 23 },
  ];

  const displayedHotels = sampleHotels; // In real app, this would be filteredHotels

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
            Explore <span className="text-gradient">Destinations</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Discover the world's most exclusive hotels and create unforgettable memories
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <SearchBar />
        </motion.div>

        {/* Controls */}
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between mb-8 gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Categories */}
          <div className="flex items-center space-x-4 overflow-x-auto pb-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'luxury-gradient text-white'
                    : 'glass-button text-white hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.label} ({category.count})
              </motion.button>
            ))}
          </div>

          {/* View Controls */}
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                showFilters 
                  ? 'luxury-gradient text-white' 
                  : 'glass-button text-white hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </motion.button>

            <div className="flex items-center glass-card rounded-lg p-1">
              <motion.button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'luxury-gradient text-white' 
                    : 'text-white hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Grid className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'luxury-gradient text-white' 
                    : 'text-white hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <List className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-lg">Advanced Filters</h3>
                  <motion.button
                    onClick={() => setShowFilters(false)}
                    className="glass-button p-2 rounded-lg text-white hover:bg-white/20"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Price Range */}
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Price Range</label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        value={searchFilters.priceRange[1]}
                        onChange={(e) => updateSearchFilters({ 
                          priceRange: [searchFilters.priceRange[0], parseInt(e.target.value)] 
                        })}
                        className="w-full"
                      />
                      <div className="flex justify-between text-white text-xs">
                        <span>$0</span>
                        <span>${searchFilters.priceRange[1]}</span>
                      </div>
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

                  {/* Amenities */}
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Amenities</label>
                    <div className="space-y-2">
                      {['WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Parking'].map(amenity => (
                        <label key={amenity} className="flex items-center space-x-2 text-white text-sm">
                          <input
                            type="checkbox"
                            className="rounded border-white/20 bg-transparent"
                          />
                          <span>{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Location Type */}
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Location Type</label>
                    <div className="space-y-2">
                      {['City Center', 'Beachfront', 'Mountain', 'Airport', 'Downtown'].map(location => (
                        <label key={location} className="flex items-center space-x-2 text-white text-sm">
                          <input
                            type="checkbox"
                            className="rounded border-white/20 bg-transparent"
                          />
                          <span>{location}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Count */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-white/70">
            Showing {displayedHotels.length} hotels
          </p>
        </motion.div>

        {/* Hotel Grid/List */}
        <motion.div
          className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
              : 'space-y-6'
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {displayedHotels.map((hotel, index) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 + index * 0.1 }}
            >
              <HotelCard hotel={hotel} />
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.button
            className="luxury-gradient px-8 py-4 rounded-full text-white font-semibold text-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Load More Hotels
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default ExplorePage;
