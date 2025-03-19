import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useBookingStore } from '../lib/store';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    title: string;
    date: Date;
    venue: string;
  };
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, event }) => {
  const { selectedSeats, totalPrice, clearSelection } = useBookingStore();

  if (!isOpen) return null;

  const handleBooking = () => {
    // Here we would integrate with a payment gateway
    alert('Booking successful! Check your email for confirmation.');
    clearSelection();
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Confirm Booking</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">{event.title}</h3>
            <p className="text-gray-600">{event.venue}</p>
            <p className="text-gray-600">{event.date.toLocaleDateString()}</p>
          </div>

          <div className="border-t border-b py-4">
            <h4 className="font-semibold mb-2">Selected Seats</h4>
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map((seat) => (
                <span key={seat.id} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {seat.row}{seat.number}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold">Total Amount:</span>
            <span className="text-xl font-bold">${totalPrice}</span>
          </div>

          <button
            onClick={handleBooking}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Confirm and Pay
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};