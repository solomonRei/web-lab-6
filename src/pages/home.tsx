import { useState } from 'react';
import { SearchForm } from '../components/search-form';
import { FlightCard } from '../components/flight-card';
import { useApp } from '../context/AppContext';
import type { Flight } from '../types/flight';
import { Button } from '../components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function HomePage() {
  const { flights } = useApp();
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>(flights);
  const [currentPage, setCurrentPage] = useState(1);
  const flightsPerPage = 6;

  const handleSearch = (filters: { from: string; to: string; date: string }) => {
    setCurrentPage(1); // Reset to first page when new search is performed
    
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

  // Calculate pagination values
  const totalPages = Math.ceil(filteredFlights.length / flightsPerPage);
  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = filteredFlights.slice(indexOfFirstFlight, indexOfLastFlight);

  // Handle page navigation
  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers for pagination
  const pageNumbers = [];
  const maxPageButtons = 5;
  
  if (totalPages <= maxPageButtons) {
    // Show all page numbers if total pages are less than max buttons
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    // Show limited page numbers with ellipsis
    if (currentPage <= 3) {
      // Near the start
      for (let i = 1; i <= 4; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push('...');
      pageNumbers.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      // Near the end
      pageNumbers.push(1);
      pageNumbers.push('...');
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Middle
      pageNumbers.push(1);
      pageNumbers.push('...');
      pageNumbers.push(currentPage - 1);
      pageNumbers.push(currentPage);
      pageNumbers.push(currentPage + 1);
      pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Find Your Flight</h1>
      <div className="mb-8">
        <SearchForm onSearch={handleSearch} />
      </div>
      
      {filteredFlights.length > 0 ? (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {currentFlights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <Button 
                variant="outline" 
                size="icon"
                onClick={goToPrevPage} 
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              {pageNumbers.map((pageNumber, index) => (
                pageNumber === '...' ? (
                  <span key={`ellipsis-${index}`} className="px-2">...</span>
                ) : (
                  <Button
                    key={`page-${pageNumber}`}
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    size="sm"
                    onClick={() => goToPage(pageNumber as number)}
                    className="min-w-8"
                  >
                    {pageNumber}
                  </Button>
                )
              ))}
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={goToNextPage} 
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          <div className="text-center text-sm text-muted-foreground mt-4">
            Showing {indexOfFirstFlight + 1}-{Math.min(indexOfLastFlight, filteredFlights.length)} of {filteredFlights.length} flights
          </div>
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No flights found matching your criteria</p>
          <p className="mt-2">Try adjusting your search parameters</p>
        </div>
      )}
    </div>
  );
} 