import { Heart, Plane } from 'lucide-react';
import type { Flight } from '../types/flight';
import { useApp } from '../context/AppContext';

interface FlightCardProps {
  flight: Flight;
}

export function FlightCard({ flight }: FlightCardProps) {
  const { addBooking, removeBooking, toggleFavorite, isFavorite, isBooked } = useApp();

  return (
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

        <button
          onClick={() => (isBooked(flight.id) ? removeBooking(flight.id) : addBooking(flight))}
          className={`rounded-md px-4 py-2 font-medium transition-colors ${
            isBooked(flight.id)
              ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
          }`}
        >
          {isBooked(flight.id) ? 'Cancel' : 'Book'}
        </button>
      </div>
    </div>
  );
} 