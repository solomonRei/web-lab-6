import { useState } from 'react';
import { SearchForm } from '../components/search-form';
import { FlightCard } from '../components/flight-card';
import { useApp } from '../context/AppContext';
import type { Flight } from '../types/flight';

export function HomePage() {
  const { flights } = useApp();
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>(flights);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (filters: { from: string; to: string; date: string }) => {
    setHasSearched(true);
    
    // If all fields are empty, show all flights
    if (!filters.from && !filters.to && !filters.date) {
      setFilteredFlights(flights);
      return;
    }

    console.log("Searching with filters:", filters); // Log the filters
    
    const filtered = flights.filter((flight) => {
      // Match departure city if provided
      const fromMatch = !filters.from || 
        flight.departure.city.toLowerCase().includes(filters.from.toLowerCase());
      
      // Match arrival city if provided
      const toMatch = !filters.to || 
        flight.arrival.city.toLowerCase().includes(filters.to.toLowerCase());
      
      // Match date if provided - log to help debug
      if (filters.date) {
        console.log(`Comparing flight date: ${flight.date} with filter date: ${filters.date}`);
      }
      
      const dateMatch = !filters.date || flight.date === filters.date;
      
      return fromMatch && toMatch && dateMatch;
    });
    
    console.log("Filtered flights:", filtered.length); // Log the result count
    setFilteredFlights(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Find Your Flight</h1>
      <div className="mb-8">
        <SearchForm onSearch={handleSearch} />
      </div>
      
      {filteredFlights.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredFlights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No flights found matching your criteria</p>
          <p className="mt-2">Try adjusting your search parameters</p>
        </div>
      )}
    </div>
  );
} 