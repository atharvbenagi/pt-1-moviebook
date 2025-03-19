import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Info, AlertCircle } from 'lucide-react';
import { useBookingStore } from '../lib/store';

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const SEATS_PER_ROW = 12;
const SEAT_PRICES = {
  premium: 75,
  standard: 50,
  basic: 35,
};

interface SeatProps {
  id: string;
  row: string;
  number: number;
  status: 'available' | 'selected' | 'booked';
  price: number;
  category: 'premium' | 'standard' | 'basic';
  onSelect: () => void;
}

const Seat: React.FC<SeatProps> = ({ status, row, number, category, onSelect }) => {
  const colors = {
    available: `${category === 'premium' ? 'bg-purple-50 hover:bg-purple-100' : 
                category === 'standard' ? 'bg-blue-50 hover:bg-blue-100' : 
                'bg-gray-50 hover:bg-gray-100'}`,
    selected: `${category === 'premium' ? 'bg-purple-500' : 
               category === 'standard' ? 'bg-blue-500' : 
               'bg-gray-500'} text-white`,
    booked: 'bg-gray-200 cursor-not-allowed',
  };

  return (
    <motion.button
      whileHover={{ scale: status === 'booked' ? 1 : 1.1 }}
      whileTap={{ scale: status === 'booked' ? 1 : 0.95 }}
      onClick={status === 'booked' ? undefined : onSelect}
      className={`w-10 h-10 rounded-t-lg ${colors[status]} shadow-md flex items-center justify-center text-sm font-medium transition-colors relative group`}
      disabled={status === 'booked'}
    >
      {number}
      <div className="absolute invisible group-hover:visible bg-black text-white text-xs py-1 px-2 rounded -top-8 whitespace-nowrap">
        Row {row} · Seat {number}
        {category === 'premium' ? ' · Premium' : 
         category === 'standard' ? ' · Standard' : ' · Basic'}
      </div>
    </motion.button>
  );
};

export const SeatMap: React.FC = () => {
  const { selectedSeats, selectSeat, unselectSeat, totalPrice } = useBookingStore();
  const [timeRemaining, setTimeRemaining] = useState('10:00');

  const getSeatCategory = (row: string): 'premium' | 'standard' | 'basic' => {
    if (['A', 'B'].includes(row)) return 'premium';
    if (['C', 'D', 'E'].includes(row)) return 'standard';
    return 'basic';
  };

  const getSeatPrice = (category: 'premium' | 'standard' | 'basic'): number => {
    return SEAT_PRICES[category];
  };

  const handleSeatClick = (seat: { id: string; row: string; number: number; price: number }) => {
    const isSelected = selectedSeats.some((s) => s.id === seat.id);
    if (isSelected) {
      unselectSeat(seat.id);
    } else {
      if (selectedSeats.length < 8) {
        selectSeat({ ...seat, status: 'selected' });
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Select Your Seats</h2>
            <p className="text-gray-500">Maximum 8 seats per booking</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Time remaining</div>
            <div className="text-xl font-semibold text-red-500">{timeRemaining}</div>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 bg-purple-50 border border-purple-200 rounded" />
            <span>Premium (${SEAT_PRICES.premium})</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded" />
            <span>Standard (${SEAT_PRICES.standard})</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 bg-gray-50 border border-gray-200 rounded" />
            <span>Basic (${SEAT_PRICES.basic})</span>
          </div>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="w-3/4 h-4 bg-gray-800 rounded-lg" />
        </div>

        <div className="space-y-4">
          {ROWS.map((row) => (
            <div key={row} className="flex items-center gap-4">
              <span className="w-6 text-gray-500 font-medium">{row}</span>
              <div className="flex gap-2 flex-1 justify-center">
                {Array.from({ length: SEATS_PER_ROW }).map((_, i) => {
                  const seatNumber = i + 1;
                  const seatId = `${row}${seatNumber}`;
                  const category = getSeatCategory(row);
                  const isSelected = selectedSeats.some((seat) => seat.id === seatId);
                  
                  return (
                    <Seat
                      key={seatId}
                      id={seatId}
                      row={row}
                      number={seatNumber}
                      status={isSelected ? 'selected' : Math.random() > 0.8 ? 'booked' : 'available'}
                      price={getSeatPrice(category)}
                      category={category}
                      onSelect={() => handleSeatClick({
                        id: seatId,
                        row,
                        number: seatNumber,
                        price: getSeatPrice(category),
                      })}
                    />
                  );
                })}
              </div>
              <span className="w-6 text-gray-500 font-medium">{row}</span>
            </div>
          ))}
        </div>
      </div>

      {selectedSeats.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Selected Seats</h3>
              <span className="text-sm text-gray-500">{selectedSeats.length} of 8 maximum</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map((seat) => (
                <div
                  key={seat.id}
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {seat.row}{seat.number}
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <div className="text-gray-600">Total Amount</div>
              <div className="text-2xl font-bold">${totalPrice}</div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg font-semibold"
            >
              Continue to Payment
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};