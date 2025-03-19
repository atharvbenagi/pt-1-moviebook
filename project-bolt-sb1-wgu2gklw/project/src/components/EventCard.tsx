import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Star } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { BookingModal } from './BookingModal';

interface EventCardProps {
  id: string;
  title: string;
  type: 'movie' | 'concert' | 'event';
  image: string;
  date: Date;
  venue: string;
  duration: string;
  price: number;
}

export function EventCard({ title, type, image, date, venue, duration, price }: EventCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300"
      >
        <div className="relative h-48">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWishlist}
            className={`absolute top-4 right-4 p-2 rounded-full ${
              isWishlisted ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-700'
            }`}
          >
            <Star className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </motion.button>
          <div className="absolute bottom-4 left-4">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              From ${price}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
          <div className="space-y-3 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span>{format(date, 'PPP')}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span>{venue}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>{duration}</span>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
            className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg font-semibold"
          >
            Book Now
          </motion.button>
        </div>
      </motion.div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={{ title, date, venue }}
      />
    </>
  );
}