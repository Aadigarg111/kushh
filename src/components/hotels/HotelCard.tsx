import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Heart, 
  MapPin, 
  Wifi, 
  Pool, 
  Car, 
  Utensils,
  Sparkles,
  Eye,
  Share2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useHotelStore } from '../../stores/hotelStore';
import { Hotel } from '../../stores/hotelStore';

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  const navigate = useNavigate();
  const { toggleSavedHotel, toggleComparedHotel, savedHotels, comparedHotels } = useHotelStore();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isSaved = savedHotels.includes(hotel.id);
  const isCompared = comparedHotels.includes(hotel.id);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSavedHotel(hotel.id);
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleComparedHotel(hotel.id);
  };

  const handleViewDetails = () => {
    navigate(`/hotel/${hotel.id}`);
  };

  const amenities = [
    { icon: Wifi, available: hotel.features.wifi, label: 'WiFi' },
    { icon: Pool, available: hotel.features.pool, label: 'Pool' },
    { icon: Car, available: hotel.features.parking, label: 'Parking' },
    { icon: Utensils, available: hotel.features.restaurant, label: 'Restaurant' },
  ];

  return (
    <motion.div
      className="perspective w-full h-96"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`transform-3d w-full h-full relative ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Front Side */}
        <div className="backface-hidden absolute inset-0">
          <div className="glass-card h-full rounded-2xl overflow-hidden group cursor-pointer">
            {/* Image Section */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={hotel.images[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'}
                alt={hotel.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Top Actions */}
              <div className="absolute top-3 right-3 flex space-x-2">
                <motion.button
                  onClick={handleSave}
                  className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
                    isSaved 
                      ? 'bg-red-500/80 text-white' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                </motion.button>
                
                <motion.button
                  onClick={handleCompare}
                  className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
                    isCompared 
                      ? 'bg-blue-500/80 text-white' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Share2 className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Price Tag */}
              <div className="absolute bottom-3 left-3">
                <div className="glass-card px-3 py-1 rounded-full">
                  <span className="text-white font-semibold text-sm">
                    ${hotel.price.amount}
                  </span>
                  {hotel.price.originalAmount && (
                    <span className="text-white/60 line-through text-xs ml-1">
                      ${hotel.price.originalAmount}
                    </span>
                  )}
                </div>
              </div>

              {/* Rating */}
              <div className="absolute top-3 left-3">
                <div className="glass-card px-2 py-1 rounded-full flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-white text-xs font-medium">
                    {hotel.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-white text-lg line-clamp-1">
                  {hotel.name}
                </h3>
                <div className="flex items-center space-x-1">
                  {[...Array(hotel.starRating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              <div className="flex items-center text-gray-300 text-sm mb-3">
                <MapPin className="w-3 h-3 mr-1" />
                <span>{hotel.location.city}, {hotel.location.country}</span>
              </div>

              <p className="text-gray-300 text-sm line-clamp-2 mb-4">
                {hotel.description}
              </p>

              {/* Amenities */}
              <div className="flex items-center space-x-3 mb-4">
                {amenities.slice(0, 4).map((amenity, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-1 text-xs ${
                      amenity.available ? 'text-green-400' : 'text-gray-500'
                    }`}
                  >
                    <amenity.icon className="w-3 h-3" />
                    <span>{amenity.label}</span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {hotel.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-white/10 text-white text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <motion.button
                  onClick={handleViewDetails}
                  className="flex-1 luxury-gradient py-2 px-4 rounded-lg text-white font-medium text-sm hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Details
                </motion.button>
                
                <motion.button
                  onClick={() => setIsFlipped(true)}
                  className="glass-button p-2 rounded-lg text-white hover:bg-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Eye className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className="backface-hidden absolute inset-0 rotate-y-180">
          <div className="glass-card h-full rounded-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white text-lg">Hotel Highlights</h3>
              <motion.button
                onClick={() => setIsFlipped(false)}
                className="glass-button p-2 rounded-lg text-white hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye className="w-4 h-4" />
              </motion.button>
            </div>

            <div className="flex-1 space-y-4">
              {/* Reviews */}
              <div className="glass-card p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">Reviews</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white text-sm">{hotel.reviews.average}</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  {hotel.reviews.count} verified reviews
                </p>
              </div>

              {/* Availability */}
              <div className="glass-card p-3 rounded-lg">
                <span className="text-white font-medium block mb-2">Availability</span>
                <p className="text-gray-300 text-sm">
                  {hotel.availability.availableRooms} rooms available
                </p>
                <p className="text-gray-300 text-sm">
                  Check-in: {hotel.availability.checkIn}
                </p>
              </div>

              {/* Special Features */}
              <div className="glass-card p-3 rounded-lg">
                <span className="text-white font-medium block mb-2">Special Features</span>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-300 text-sm">Premium Experience</span>
                </div>
              </div>
            </div>

            <motion.button
              onClick={handleViewDetails}
              className="w-full luxury-gradient py-3 px-4 rounded-lg text-white font-medium hover:shadow-lg transition-all duration-300 mt-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Book Now
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HotelCard;
