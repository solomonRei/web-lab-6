import { FlightCard } from '../components/flight-card';
import { useApp } from '../context/AppContext';

export function BookingsPage() {
  const { bookings, convertPrice } = useApp();
  
  // Function to format date in a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Your Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-center text-muted-foreground">No bookings yet</p>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="mb-4">
                <FlightCard flight={booking} />
              </div>
              
              {/* Show selected seats if any */}
              {booking.selectedSeats && booking.selectedSeats.length > 0 && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2">Selected Seats</h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {booking.selectedSeats.map(seat => (
                      <div key={seat.id} className="bg-blue-600 border border-blue-700 rounded px-2 py-1 text-white">
                        {seat.id} ({seat.type}) - {convertPrice(seat.price)}
                      </div>
                    ))}
                  </div>
                  {booking.totalPrice && (
                    <div className="text-right font-bold mt-2">
                      Total: {convertPrice(booking.totalPrice)}
                    </div>
                  )}
                </div>
              )}
              
              <div className="text-sm text-muted-foreground mt-4">
                Booked on: {formatDate(booking.bookingDate)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 