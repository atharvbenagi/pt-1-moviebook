import { create } from 'zustand';

interface Seat {
  id: string;
  row: string;
  number: number;
  price: number;
  status: 'available' | 'selected' | 'booked';
}

interface BookingStore {
  selectedSeats: Seat[];
  selectSeat: (seat: Seat) => void;
  unselectSeat: (seatId: string) => void;
  clearSelection: () => void;
  totalPrice: number;
}

export const useBookingStore = create<BookingStore>((set) => ({
  selectedSeats: [],
  selectSeat: (seat) =>
    set((state) => ({
      selectedSeats: [...state.selectedSeats, seat],
      totalPrice: state.totalPrice + seat.price,
    })),
  unselectSeat: (seatId) =>
    set((state) => ({
      selectedSeats: state.selectedSeats.filter((seat) => seat.id !== seatId),
      totalPrice: state.totalPrice - (state.selectedSeats.find((seat) => seat.id === seatId)?.price || 0),
    })),
  clearSelection: () => set({ selectedSeats: [], totalPrice: 0 }),
  totalPrice: 0,
}));