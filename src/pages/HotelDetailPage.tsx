import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Heart, 
  Share2, 
  Calendar, 
  Users, 
  Wifi, 
  Pool, 
  Car, 
  Utensils,
  Spa,
  Gym,
  ArrowLeft,
  Play,
  Camera
} from 'lucide-react';
import { useHotelStore } from '../stores/hotelStore';
import { useNavigate } from 'react-router-dom';

const HotelDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toggleSavedHotel, savedHotels } = useHotelStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedRoomType, setSelectedRoomType] = useState('standard');

  // Sample hotel data
  const hotel = {
    id: '1',
    name: 'Luxury Palace Hotel',
    location: { city: 'Paris', country: 'France', coordinates: [48.8566, 2.3522] },
    rating: 4.8,
    price: { amount: 450, currency: 'USD', originalAmount: 550 },
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800'
    ],
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Parking'],
    description: 'Experience luxury at its finest in the heart of Paris. Our 5-star hotel offers world-class amenities, stunning views of the Eiffel Tower, and impeccable service that will make your stay unforgettable.',
    tags: ['Luxury', 'Romantic', 'City Center', 'Eiffel Tower View'],
    starRating: 5,
    reviews: { count: 1247, average: 4.8 },
    availability: { checkIn: '2024-01-15', checkOut: '2024-01-20', availableRooms: 12 },
    features: {
      wifi: true, pool: true, spa: true, gym: true, restaurant: true, parking: true, petFriendly: false
    }
  };

  const roomTypes = [
    { id: 'standard', name: 'Standard Room', price: 450, description: 'Comfortable room with city view' },
    { id: 'deluxe', name: 'Deluxe Room', price: 650, description: 'Spacious room with Eiffel Tower view' },
    { id: 'suite', name: 'Luxury Suite', price: 1200, description: 'Premium suite with private balcony' },
  ];

  const isSaved = savedHotels.includes(hotel.id);

  const handleSave = () => {
    toggleSavedHotel(hotel.id);
  };

  const amenities = [
    { icon: Wifi, label: 'Free WiFi', available: hotel.features.wifi },
    { icon: Pool, label: 'Swimming Pool', available: hotel.features.pool },
    { icon: Spa, label: 'Spa & Wellness', available: hotel.features.spa },
    { icon: Gym, label: 'Fitness Center', available: hotel.features.gym },
    { icon: Utensils, label: 'Restaurant', available: hotel.features.restaurant },
    { icon: Car, label: 'Free Parking', available: hotel.features.parking },
  ];

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <motion.button
        onClick={() => navigate(-1)}
        className="fixed top-24 left-6 z-50 glass-card p-3 rounded-full text-white hover:bg-white/20 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowLeft className="w-5 h-5" />
      </motion.button>

      {/* Image Carousel */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <img
          src={hotel.images[currentImageIndex]}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Image Navigation */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {hotel.images.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentImageIndex === index ? 'bg-white' : 'bg-white/50'
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 flex space-x-2">
          <motion.button
            onClick={handleSave}
            className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 ${
              isSaved 
                ? 'bg-red-500/80 text-white' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          </motion.button>
          
          <motion.button
            className="p-3 rounded-full backdrop-blur-md bg-white/20 text-white hover:bg-white/30 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Share2 className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                    {hotel.name}
                  </h1>
                  <div className="flex items-center space-x-4 text-gray-300">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{hotel.location.city}, {hotel.location.country}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{hotel.rating}</span>
                      <span>({hotel.reviews.count} reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">
                    ${hotel.price.amount}
                  </div>
                  {hotel.price.originalAmount && (
                    <div className="text-gray-400 line-through">
                      ${hotel.price.originalAmount}
                    </div>
                  )}
                  <div className="text-sm text-gray-300">per night</div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {hotel.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/10 text-white text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              className="glass-card p-6 rounded-2xl mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold text-white mb-4">About this hotel</h2>
              <p className="text-gray-300 leading-relaxed">
                {hotel.description}
              </p>
            </motion.div>

            {/* Amenities */}
            <motion.div
              className="glass-card p-6 rounded-2xl mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-2xl font-semibold text-white mb-6">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      amenity.available ? 'bg-white/10' : 'bg-gray-800/50'
                    }`}
                  >
                    <amenity.icon className={`w-5 h-5 ${
                      amenity.available ? 'text-green-400' : 'text-gray-500'
                    }`} />
                    <span className={`text-sm ${
                      amenity.available ? 'text-white' : 'text-gray-500'
                    }`}>
                      {amenity.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Room Types */}
            <motion.div
              className="glass-card p-6 rounded-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-2xl font-semibold text-white mb-6">Room Types</h2>
              <div className="space-y-4">
                {roomTypes.map((room) => (
                  <motion.div
                    key={room.id}
                    onClick={() => setSelectedRoomType(room.id)}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                      selectedRoomType === room.id
                        ? 'luxury-gradient text-white'
                        : 'glass-button text-white hover:bg-white/20'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{room.name}</h3>
                        <p className="text-sm opacity-80">{room.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold">${room.price}</div>
                        <div className="text-sm opacity-80">per night</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Booking Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="glass-card p-6 rounded-2xl sticky top-24">
              <h3 className="text-2xl font-semibold text-white mb-6">Book Your Stay</h3>
              
              {/* Date Selection */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Check-in</label>
                  <input
                    type="date"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                  />
                </div>
                
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Check-out</label>
                  <input
                    type="date"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                  />
                </div>
                
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Guests</label>
                  <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white">
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num} className="bg-gray-800">
                        {num} Guest{num > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Summary */}
              <div className="border-t border-white/20 pt-4 mb-6">
                <div className="flex justify-between text-white mb-2">
                  <span>Room rate (3 nights)</span>
                  <span>${hotel.price.amount * 3}</span>
                </div>
                <div className="flex justify-between text-white mb-2">
                  <span>Taxes & fees</span>
                  <span>${Math.round(hotel.price.amount * 3 * 0.15)}</span>
                </div>
                <div className="flex justify-between text-white font-semibold text-lg">
                  <span>Total</span>
                  <span>${Math.round(hotel.price.amount * 3 * 1.15)}</span>
                </div>
              </div>

              {/* Book Button */}
              <motion.button
                className="w-full luxury-gradient py-4 rounded-lg text-white font-semibold text-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book Now
              </motion.button>

              {/* Virtual Tour */}
              <motion.button
                className="w-full mt-4 glass-button py-3 rounded-lg text-white font-medium hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play className="w-4 h-4" />
                <span>Virtual Tour</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailPage;
