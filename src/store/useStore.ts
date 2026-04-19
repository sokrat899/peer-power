import { create } from 'zustand';

type Booking = {
  id: number;
  host_name: string;
  price_per_hour: number;
  power_kw: number;
  rating?: number;
};

type Store = {
  balance: number;
  bookings: Booking[];

  addBooking: (booking: Booking) => boolean;
  setBalance: (amount: number) => void;
  rateBooking: (id: number, rating: number) => void;
};

const COMMISSION = 0.2; // 20%

export const useStore = create<Store>((set, get) => ({
  balance: 20, // стартовый баланс

  bookings: [],

  setBalance: (amount) => set({ balance: amount }),

  addBooking: (booking) => {
    const { balance } = get();

    const totalPrice = booking.price_per_hour;
    const platformFee = totalPrice * COMMISSION;
    const finalPrice = totalPrice + platformFee;

    // ❌ если не хватает денег
    if (balance < finalPrice) {
      alert('Not enough balance 💸');
      return false;
    }

    // ✅ списываем деньги
    set({
      balance: balance - finalPrice,
      bookings: [...get().bookings, booking],
    });

    return true;
  },

  rateBooking: (id, rating) => {
    set({
      bookings: get().bookings.map((b) =>
        b.id === id ? { ...b, rating } : b
      ),
    });
  },
}));