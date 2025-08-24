import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  Star, 
  Heart, 
  MapPin, 
  Calendar,
  Users,
  Search,
  Play,
  Award,
  Shield,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useHotelStore } from '../stores/hotelStore';
import { useAuthStore } from '../stores/authStore';
import HotelCard from '../components/hotels/HotelCard';
import SearchBar from '../components/search/SearchBar';
import DestinationCard from '../components/destinations/DestinationCard';
import FeatureCard from '../components/ui/FeatureCard';

const HomePage: React.FC = () => {
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const { hotels, filteredHotels } = useHotelStore();
  
  const [activeTab, setActiveTab] = useState('explore');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Parallax effects
  const heroY = useTransform(scrollY, [0, 500], [0, -100]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const titleScale = useTransform(scrollY, [0, 300], [1, 0.8]);

  // Sample data
  const featuredHotels = hotels.slice(0, 6);
  const popularDestinations = [
    { name: 'Paris', country: 'France', image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400', rating: 4.8 },
    { name: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400', rating: 4.7 },
    { name: 'New York', country: 'USA', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400', rating: 4.6 },
    { name: 'Dubai', country: 'UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400', rating: 4.9 },
  ];

  const features = [
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Curated selection of luxury hotels worldwide',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Your data and payments are protected',
      color: 'from-green-400 to-blue-500'
    },
    {
      icon: Zap,
      title: 'Instant Booking',
      description: 'Book your stay in seconds with AI assistance',
      color: 'from-purple-400 to-pink-500'
    }
  ];

  useEffect(() => {
    // Initialize with sample data if empty
    if (hotels.length === 0) {
      // This would normally come from an API
      console.log('Loading sample hotel data...');
    }
  }, [hotels]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Background Video/Image */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-pink-900/50" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <motion.h1 
            className="text-6xl md:text-8xl font-display font-bold text-white mb-6"
            style={{ scale: titleScale }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gradient">Discover</span>
            <br />
            <span className="text-white">Luxury</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Experience the world's most exclusive hotels with our AI-powered booking platform
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <SearchBar />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              onClick={() => navigate('/explore')}
              className="luxury-gradient px-8 py-4 rounded-full text-white font-semibold text-lg flex items-center space-x-2 hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Start Exploring</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              onClick={() => setIsVideoPlaying(true)}
              className="glass-card px-8 py-4 rounded-full text-white font-semibold text-lg flex items-center space-x-2 hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-white/10 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Why Choose <span className="text-gradient">LuxStay</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Experience the future of luxury travel with our cutting-edge platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Popular <span className="text-gradient">Destinations</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Explore the world's most sought-after destinations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((destination, index) => (
              <motion.div
                key={destination.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <DestinationCard {...destination} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Featured <span className="text-gradient">Hotels</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Discover handpicked luxury accommodations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredHotels.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <HotelCard hotel={hotel} />
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => navigate('/explore')}
              className="luxury-gradient px-8 py-4 rounded-full text-white font-semibold text-lg flex items-center space-x-2 mx-auto hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View All Hotels</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '10K+', label: 'Hotels Worldwide' },
              { number: '500K+', label: 'Happy Guests' },
              { number: '50+', label: 'Countries' },
              { number: '24/7', label: 'Support' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-5xl font-display font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-white/70 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
