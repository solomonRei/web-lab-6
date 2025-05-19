import { useState, useEffect } from 'react';
import { toast } from '../components/ui/use-toast';
import type { Seat, SeatType, SeatStatus } from '../types/flight';
import { useApp } from '../context/AppContext';

const PRICE_MULTIPLIERS = {
  economy: 1,
  comfort: 1.5,
  business: 2.5,
};

const COLUMNS = ['A', 'B', 'C', '', 'D', 'E', 'F'];

interface SeatSelectorProps {
  basePrice: number;
  onComplete: (selectedSeats: Seat[], totalPrice: number) => void;
}

export function SeatSelector({ basePrice, onComplete }: SeatSelectorProps) {
  const { currency, convertPrice } = useApp();
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Generate a realistic airplane seating layout
  useEffect(() => {
    const newSeats: Seat[] = [];
    for (let row = 1; row <= 2; row++) {
      for (const col of COLUMNS) {
        if (col) {
          const seatId = `${row}${col}`;
          newSeats.push({
            id: seatId,
            row,
            column: col,
            type: 'business',
            status: Math.random() > 0.7 ? 'occupied' : 'available' as SeatStatus,
            price: Math.round(basePrice * PRICE_MULTIPLIERS.business),
          });
        }
      }
    }

    for (let row = 3; row <= 7; row++) {
      for (const col of COLUMNS) {
        if (col) {
          const seatId = `${row}${col}`;
          newSeats.push({
            id: seatId,
            row,
            column: col,
            type: 'comfort',
            status: Math.random() > 0.5 ? 'occupied' : 'available' as SeatStatus,
            price: Math.round(basePrice * PRICE_MULTIPLIERS.comfort),
          });
        }
      }
    }

    for (let row = 8; row <= 30; row++) {
      for (const col of COLUMNS) {
        if (col) {
          const seatId = `${row}${col}`;
          newSeats.push({
            id: seatId,
            row,
            column: col,
            type: 'economy',
            status: Math.random() > 0.3 ? 'occupied' : 'available' as SeatStatus,
            price: Math.round(basePrice * PRICE_MULTIPLIERS.economy),
          });
        }
      }
    }

    setSeats(newSeats);
  }, [basePrice]);

  useEffect(() => {
    const price = selectedSeats.reduce((total, seat) => total + seat.price, 0);
    setTotalPrice(price);
  }, [selectedSeats]);

  const toggleSeat = (seatId: string) => {
    const newSeats = seats.map(seat => {
      if (seat.id === seatId && seat.status !== 'occupied') {
        const newStatus: SeatStatus = seat.status === 'available' ? 'selected' : 'available';
        return { ...seat, status: newStatus };
      }
      return seat;
    });

    setSeats(newSeats);
    
    const updatedSelectedSeats = newSeats.filter(seat => seat.status === 'selected');
    setSelectedSeats(updatedSelectedSeats);
  };

  const handleComplete = () => {
    if (selectedSeats.length === 0) {
      toast({
        title: "No seats selected",
        description: "Please select at least one seat to continue.",
        variant: "destructive"
      });
      return;
    }
    
    onComplete(selectedSeats, totalPrice);
  };

  // Group seats by row for display
  const seatsByRow = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {} as Record<number, Seat[]>);

  return (
    <div className="w-full max-w-4xl mx-auto bg-card p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Select Your Seats</h2>
        <div className="text-sm text-muted-foreground">
          Current currency: <span className="font-medium">{currency === 'USD' ? 'US Dollar' : currency === 'EUR' ? 'Euro' : 'Moldovan Leu'}</span>
          <div className="text-xs">You can change the currency in the navigation bar</div>
        </div>
      </div>
      
      {/* Seat legend */}
      <div className="flex justify-center mb-6 space-x-6">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-sky-200 border border-sky-400 rounded mr-2"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-emerald-300 border border-emerald-500 rounded mr-2"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-gray-300 border border-gray-500 rounded mr-2"></div>
          <span>Occupied</span>
        </div>
      </div>
      
      <div className="flex justify-center mb-8">
        <div className="bg-gray-800 text-white py-2 px-8 rounded-t-lg">Cockpit</div>
      </div>
      
      {/* Airplane layout */}
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[600px]">
          {/* Cabin sections */}
          <div className="mb-8">
            <div className="text-center font-semibold mb-2 text-blue-600">Business Class</div>
            {/* Business class rows */}
            {Object.entries(seatsByRow)
              .filter(([rowNum]) => parseInt(rowNum) <= 2)
              .map(([rowNum, rowSeats]) => (
                <div key={rowNum} className="flex justify-center mb-2">
                  <div className="w-8 text-center font-medium">{rowNum}</div>
                  <div className="flex space-x-2">
                    {COLUMNS.map((col, idx) => {
                      if (!col) return <div key={`gap-${idx}`} className="w-8"></div>;
                      const seat = rowSeats.find(s => s.column === col);
                      if (!seat) return null;
                      
                      return (
                        <button
                          key={seat.id}
                          className={`w-10 h-10 rounded-t-lg flex items-center justify-center text-xs font-semibold ${
                            seat.status === 'occupied'
                              ? 'bg-gray-300 cursor-not-allowed'
                              : seat.status === 'selected'
                              ? 'bg-emerald-300 border-2 border-emerald-500'
                              : 'bg-sky-200 hover:bg-sky-300 border border-sky-400'
                          }`}
                          onClick={() => toggleSeat(seat.id)}
                          disabled={seat.status === 'occupied'}
                        >
                          {seat.id}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
          </div>
          
          <div className="mb-8">
            <div className="text-center font-semibold mb-2 text-teal-600">Comfort Class</div>
            {/* Comfort class rows */}
            {Object.entries(seatsByRow)
              .filter(([rowNum]) => parseInt(rowNum) > 2 && parseInt(rowNum) <= 7)
              .map(([rowNum, rowSeats]) => (
                <div key={rowNum} className="flex justify-center mb-2">
                  <div className="w-8 text-center font-medium">{rowNum}</div>
                  <div className="flex space-x-2">
                    {COLUMNS.map((col, idx) => {
                      if (!col) return <div key={`gap-${idx}`} className="w-8"></div>;
                      const seat = rowSeats.find(s => s.column === col);
                      if (!seat) return null;
                      
                      return (
                        <button
                          key={seat.id}
                          className={`w-10 h-10 rounded-t-lg flex items-center justify-center text-xs font-semibold ${
                            seat.status === 'occupied'
                              ? 'bg-gray-300 cursor-not-allowed'
                              : seat.status === 'selected'
                              ? 'bg-emerald-300 border-2 border-emerald-500'
                              : 'bg-sky-200 hover:bg-sky-300 border border-sky-400'
                          }`}
                          onClick={() => toggleSeat(seat.id)}
                          disabled={seat.status === 'occupied'}
                        >
                          {seat.id}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
          </div>
          
          <div>
            <div className="text-center font-semibold mb-2 text-gray-600">Economy Class</div>
            {/* Economy class rows */}
            {Object.entries(seatsByRow)
              .filter(([rowNum]) => parseInt(rowNum) > 7)
              .map(([rowNum, rowSeats]) => (
                <div key={rowNum} className="flex justify-center mb-2">
                  <div className="w-8 text-center font-medium">{rowNum}</div>
                  <div className="flex space-x-2">
                    {COLUMNS.map((col, idx) => {
                      if (!col) return <div key={`gap-${idx}`} className="w-8"></div>;
                      const seat = rowSeats.find(s => s.column === col);
                      if (!seat) return null;
                      
                      return (
                        <button
                          key={seat.id}
                          className={`w-10 h-10 rounded-t-lg flex items-center justify-center text-xs font-semibold ${
                            seat.status === 'occupied'
                              ? 'bg-gray-300 cursor-not-allowed'
                              : seat.status === 'selected'
                              ? 'bg-emerald-300 border-2 border-emerald-500'
                              : 'bg-sky-200 hover:bg-sky-300 border border-sky-400'
                          }`}
                          onClick={() => toggleSeat(seat.id)}
                          disabled={seat.status === 'occupied'}
                        >
                          {seat.id}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      
      {/* Selected seats summary */}
      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h3 className="font-semibold mb-2">Selected Seats</h3>
        {selectedSeats.length === 0 ? (
          <p>No seats selected</p>
        ) : (
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedSeats.map(seat => (
                <div key={seat.id} className="bg-emerald-100 border border-emerald-300 rounded px-2 py-1">
                  {seat.id} ({seat.type}) - {convertPrice(seat.price)}
                </div>
              ))}
            </div>
            <div className="text-right font-bold">
              Total: {convertPrice(totalPrice)}
            </div>
            <button
              onClick={handleComplete}
              className="mt-4 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium w-full"
            >
              Confirm Selection
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 