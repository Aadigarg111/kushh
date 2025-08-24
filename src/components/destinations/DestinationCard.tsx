import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DestinationCardProps {
  name: string;
  country: string;
  image: string;
  rating: number;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ 
  name, 
  country, 
  image, 
  rating 
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/search', { 
      state: { destination: `${name}, ${country}` } 
    });
  };

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
    >
      {/* Background Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={`${name}, ${country}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          {/* Top Section */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-white/80" />
              <span className="text-white/80 text-sm">{country}</span>
            </div>
            
            <div className="flex items-center space-x-1 glass-card px-2 py-1 rounded-full">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-white text-xs font-medium">{rating}</span>
            </div>
          </div>

          {/* Bottom Section */}
          <div>
            <h3 className="text-white text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-400 group-hover:to-luxury-400 transition-all duration-300">
              {name}
            </h3>
            
            <motion.div
              className="flex items-center space-x-2 text-white/80 text-sm"
              initial={{ opacity: 0, x: -20 }}
              whileHover={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span>Explore hotels</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.div>
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-primary-500/20 to-luxury-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationCard;
