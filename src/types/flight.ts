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
}

export interface Booking extends Flight {
  bookingDate: string;
}

export interface Favorite extends Flight {
  favoriteDate: string;
} 