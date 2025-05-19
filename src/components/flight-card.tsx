import { Heart, Plane, ArmchairIcon } from 'lucide-react';
import { useState } from 'react';
import type { Flight, Seat } from '../types/flight';
import { useApp } from '../context/AppContext';
import { SeatSelector } from './seat-selector';

interface FlightCardProps {
  flight: Flight;
}

export function FlightCard({ flight }: FlightCardProps) {
  const { addBooking, removeBooking, toggleFavorite, isFavorite, isBooked } = useApp();
  const [showSeatSelector, setShowSeatSelector] = useState(false);

  // Handle seat selection completion
  const handleSeatSelectionComplete = (selectedSeats: Seat[], totalPrice: number) => {
    // Add the flight to bookings with selected seats
    addBooking({
      ...flight,
      selectedSeats,
      totalPrice
    });
    
    // Close the seat selector
    setShowSeatSelector(false);
  };

  return (
    <>
      {showSeatSelector ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-5xl overflow-auto rounded-lg bg-background">
            <div className="sticky top-0 flex items-center justify-between bg-background p-4 shadow-sm">
              <h3 className="text-lg font-semibold">
                {flight.departure.city} to {flight.arrival.city}
              </h3>
              <button
                onClick={() => setShowSeatSelector(false)}
                className="rounded-full p-2 hover:bg-muted"
              >
                ✕
              </button>
            </div>
            <SeatSelector 
              basePrice={flight.price} 
              onComplete={handleSeatSelectionComplete} 
            />
          </div>
        </div>
      ) : (
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Plane className="h-5 w-5 text-primary" />
              <span className="font-semibold">{flight.airline}</span>
            </div>
            <button
              onClick={() => toggleFavorite(flight)}
              className={`rounded-full p-2 transition-colors ${
                isFavorite(flight.id)
                  ? 'text-red-500 hover:text-red-600'
                  : 'text-gray-400 hover:text-gray-500'
              }`}
            >
              <Heart className="h-5 w-5" fill={isFavorite(flight.id) ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">From</p>
              <p className="font-semibold">{flight.departure.city}</p>
              <p className="text-sm text-muted-foreground">{flight.departure.airport}</p>
              <p className="font-medium">{flight.departure.time}</p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="h-0.5 w-full bg-border" />
              <p className="mt-2 text-sm text-muted-foreground">{flight.duration}</p>
              <p className="text-xs text-muted-foreground">
                {flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">To</p>
              <p className="font-semibold">{flight.arrival.city}</p>
              <p className="text-sm text-muted-foreground">{flight.arrival.airport}</p>
              <p className="font-medium">{flight.arrival.time}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="text-xl font-bold text-primary">
                {flight.price.toLocaleString('ru-RU')} ₽
              </p>
            </div>

            {isBooked(flight.id) ? (
              <button
                onClick={() => removeBooking(flight.id)}
                className="rounded-md bg-destructive px-4 py-2 font-medium text-destructive-foreground transition-colors hover:bg-destructive/90"
              >
                Cancel
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => addBooking(flight)}
                  className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Book
                </button>
                <button
                  onClick={() => setShowSeatSelector(true)}
                  className="flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600"
                >
                  <ArmchairIcon className="h-4 w-4" />
                  Select Seats
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
} 