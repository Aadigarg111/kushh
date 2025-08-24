import React from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Star, Heart, Calendar } from 'lucide-react';

const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">
            My <span className="text-gradient">Profile</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Manage your account settings and preferences
          </p>
        </motion.div>

        <motion.div
          className="glass-card p-8 rounded-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <User className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-semibold text-white mb-2">Profile Coming Soon</h2>
          <p className="text-gray-300 mb-6">
            User profile management features will be available soon
          </p>
          <motion.button
            className="luxury-gradient px-8 py-4 rounded-full text-white font-semibold text-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Hotels
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
