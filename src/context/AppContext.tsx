import { createContext, useContext, useEffect, useState } from 'react';
import type { Flight, Booking, Favorite } from '../types/flight';
import { flights } from '../data/flights';

interface AppContextType {
  flights: Flight[];
  bookings: Booking[];
  favorites: Favorite[];
  addBooking: (flight: Flight) => void;
  removeBooking: (flightId: string) => void;
  toggleFavorite: (flight: Flight) => void;
  isFavorite: (flightId: string) => boolean;
  isBooked: (flightId: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    const savedBookings = localStorage.getItem('bookings');
    const savedFavorites = localStorage.getItem('favorites');

    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

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