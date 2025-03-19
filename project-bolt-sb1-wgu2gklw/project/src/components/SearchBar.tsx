import React, { useState } from 'react';
import { Search, Calendar, MapPin, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log({ searchQuery, date, location, priceRange });
  };

  return (
    <form onSubmit={handleSearch} className="bg-white rounded-xl shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div 
          className="relative"
          whileTap={{ scale: 0.98 }}
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
        </motion.div>

        <motion.div 
          className="relative"
          whileTap={{ scale: 0.98 }}
        >
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
        </motion.div>

        <motion.div 
          className="relative"
          whileTap={{ scale: 0.98 }}
        >
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all appearance-none bg-white"
          >
            <option value="">Select Location</option>
            <option value="new-york">New York</option>
            <option value="los-angeles">Los Angeles</option>
            <option value="chicago">Chicago</option>
            <option value="miami">Miami</option>
            <option value="las-vegas">Las Vegas</option>
          </select>
        </motion.div>

        <motion.div 
          className="relative"
          whileTap={{ scale: 0.98 }}
        >
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5" />
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all appearance-none bg-white"
          >
            <option value="">Price Range</option>
            <option value="0-50">Under $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-200">$100 - $200</option>
            <option value="200+">$200+</option>
          </select>
        </motion.div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="mt-6 w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
      >
        Search Events
      </motion.button>
    </form>
  );
}