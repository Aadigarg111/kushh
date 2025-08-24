import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Hotel {
  id: string;
  name: string;
  location: {
    city: string;
    country: string;
    coordinates: [number, number];
  };
  rating: number;
  price: {
    amount: number;
    currency: string;
    originalAmount?: number;
  };
  images: string[];
  amenities: string[];
  description: string;
  tags: string[];
  starRating: number;
  reviews: {
    count: number;
    average: number;
  };
  availability: {
    checkIn: string;
    checkOut: string;
    availableRooms: number;
  };
  features: {
    wifi: boolean;
    pool: boolean;
    spa: boolean;
    gym: boolean;
    restaurant: boolean;
    parking: boolean;
    petFriendly: boolean;
  };
}

export interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookingDate: string;
}

interface SearchFilters {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  priceRange: [number, number];
  starRating: number[];
  amenities: string[];
  vibe: string[];
}

interface HotelState {
  hotels: Hotel[];
  filteredHotels: Hotel[];
  bookings: Booking[];
  searchFilters: SearchFilters;
  savedHotels: string[];
  comparedHotels: string[];
  setHotels: (hotels: Hotel[]) => void;
  setFilteredHotels: (hotels: Hotel[]) => void;
  addBooking: (booking: Booking) => void;
  cancelBooking: (bookingId: string) => void;
  updateSearchFilters: (filters: Partial<SearchFilters>) => void;
  toggleSavedHotel: (hotelId: string) => void;
  toggleComparedHotel: (hotelId: string) => void;
  clearComparison: () => void;
}

export const useHotelStore = create<HotelState>()(
  persist(
    (set, get) => ({
      hotels: [],
      filteredHotels: [],
      bookings: [],
      searchFilters: {
        destination: '',
        checkIn: '',
        checkOut: '',
        guests: 1,
        rooms: 1,
        priceRange: [0, 10000],
        starRating: [],
        amenities: [],
        vibe: [],
      },
      savedHotels: [],
      comparedHotels: [],
      setHotels: (hotels: Hotel[]) => set({ hotels, filteredHotels: hotels }),
      setFilteredHotels: (hotels: Hotel[]) => set({ filteredHotels: hotels }),
      addBooking: (booking: Booking) => {
        const currentBookings = get().bookings;
        set({ bookings: [...currentBookings, booking] });
      },
      cancelBooking: (bookingId: string) => {
        const currentBookings = get().bookings;
        set({
          bookings: currentBookings.map(booking =>
            booking.id === bookingId
              ? { ...booking, status: 'cancelled' as const }
              : booking
          ),
        });
      },
      updateSearchFilters: (filters: Partial<SearchFilters>) => {
        const currentFilters = get().searchFilters;
        set({ searchFilters: { ...currentFilters, ...filters } });
      },
      toggleSavedHotel: (hotelId: string) => {
        const currentSaved = get().savedHotels;
        const isSaved = currentSaved.includes(hotelId);
        set({
          savedHotels: isSaved
            ? currentSaved.filter(id => id !== hotelId)
            : [...currentSaved, hotelId],
        });
      },
      toggleComparedHotel: (hotelId: string) => {
        const currentCompared = get().comparedHotels;
        const isCompared = currentCompared.includes(hotelId);
        set({
          comparedHotels: isCompared
            ? currentCompared.filter(id => id !== hotelId)
            : [...currentCompared, hotelId],
        });
      },
      clearComparison: () => set({ comparedHotels: [] }),
    }),
    {
      name: 'hotel-storage',
    }
  )
);
