import { FlightCard } from '../components/flight-card';
import { useApp } from '../context/AppContext';

export function BookingsPage() {
  const { bookings } = useApp();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Your Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-center text-muted-foreground">No bookings yet</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <FlightCard key={booking.id} flight={booking} />
          ))}
        </div>
      )}
    </div>
  );
} 