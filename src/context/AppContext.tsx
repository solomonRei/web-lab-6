import { createContext, useContext, useEffect, useState } from 'react';
import type { Flight, Booking, Favorite } from '../types/flight';
import { flights } from '../data/flights';

// Currency types
export type Currency = 'USD' | 'EUR' | 'MDL';

interface AppContextType {
  flights: Flight[];
  bookings: Booking[];
  favorites: Favorite[];
  addBooking: (flight: Flight) => void;
  removeBooking: (flightId: string) => void;
  toggleFavorite: (flight: Flight) => void;
  isFavorite: (flightId: string) => boolean;
  isBooked: (flightId: string) => boolean;
  // Currency conversion
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (price: number) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  
  // Currency state
  const [currency, setCurrency] = useState<Currency>('USD');
  const [exchangeRates, setExchangeRates] = useState<Record<Currency, number>>({
    USD: 1,
    EUR: 0.93,
    MDL: 17.8,
  });

  useEffect(() => {
    const savedBookings = localStorage.getItem('bookings');
    const savedFavorites = localStorage.getItem('favorites');
    const savedCurrency = localStorage.getItem('currency');

    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    if (savedCurrency && ['USD', 'EUR', 'MDL'].includes(savedCurrency)) {
      setCurrency(savedCurrency as Currency);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);
  
  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  // Fetch exchange rates (mock implementation)
  useEffect(() => {
    const mockFetchRates = async () => {
      try {
        // Simulate API fetch delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real app, you would fetch from an API like Open Exchange Rates
        setExchangeRates({
          USD: 1,
          EUR: 0.93,
          MDL: 17.8,
        });
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
      }
    };

    mockFetchRates();
  }, []);

  const addBooking = (flight: Flight) => {
    const booking: Booking = {
      ...flight,
      bookingDate: new Date().toISOString(),
    };
    setBookings((prev) => [...prev, booking]);
  };

  const removeBooking = (flightId: string) => {
    setBookings((prev) => prev.filter((booking) => booking.id !== flightId));
  };

  const toggleFavorite = (flight: Flight) => {
    setFavorites((prev) => {
      const isAlreadyFavorite = prev.some((fav) => fav.id === flight.id);
      if (isAlreadyFavorite) {
        return prev.filter((fav) => fav.id !== flight.id);
      } else {
        const favorite: Favorite = {
          ...flight,
          favoriteDate: new Date().toISOString(),
        };
        return [...prev, favorite];
      }
    });
  };

  const isFavorite = (flightId: string) => {
    return favorites.some((fav) => fav.id === flightId);
  };

  const isBooked = (flightId: string) => {
    return bookings.some((booking) => booking.id === flightId);
  };
  
  // Convert price to the selected currency
  const convertPrice = (price: number): string => {
    const converted = price * exchangeRates[currency];
    const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : 'L';
    
    return `${currencySymbol}${Math.round(converted).toLocaleString()}`;
  };

  return (
    <AppContext.Provider
      value={{
        flights,
        bookings,
        favorites,
        addBooking,
        removeBooking,
        toggleFavorite,
        isFavorite,
        isBooked,
        currency,
        setCurrency,
        convertPrice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 