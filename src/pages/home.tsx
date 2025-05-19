import { useState } from 'react';
import { SearchForm } from '../components/search-form';
import { FlightCard } from '../components/flight-card';
import { useApp } from '../context/AppContext';
import type { Flight } from '../types/flight';

export function HomePage() {
  const { flights } = useApp();
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>(flights);

  const handleSearch = (filters: { from: string; to: string; date: string }) => {
    const filtered = flights.filter(
      (flight) =>
        flight.departure.city === filters.from &&
        flight.arrival.city === filters.to &&
        flight.date === filters.date
    );
    setFilteredFlights(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Find Your Flight</h1>
      <div className="mb-8">
        <SearchForm onSearch={handleSearch} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredFlights.map((flight) => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
      </div>
    </div>
  );
} 