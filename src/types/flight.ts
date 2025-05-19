// Seat types for airplane booking
export type SeatType = 'economy' | 'comfort' | 'business';
export type SeatStatus = 'available' | 'occupied' | 'selected';

export interface Seat {
  id: string;
  row: number;
  column: string;
  type: SeatType;
  status: SeatStatus;
  price: number;
}

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: {
    city: string;
    airport: string;
    time: string;
  };
  arrival: {
    city: string;
    airport: string;
    time: string;
  };
  date: string;
  price: number;
  duration: string;
  stops: number;
  aircraft: string;
  selectedSeats?: Seat[]; // Selected seats for booking
  totalPrice?: number; // Total price including seats
}

export interface Booking extends Flight {
  bookingDate: string;
}

export interface Favorite extends Flight {
  favoriteDate: string;
} 