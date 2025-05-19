import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar } from 'lucide-react';

interface SearchFormProps {
  onSearch: (filters: {
    from: string;
    to: string;
    date: string;
  }) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const { flights } = useApp();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [minDate, setMinDate] = useState('');

  // Set minimum date to today
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    setMinDate(`${year}-${month}-${day}`);
  }, []);

  const cities = Array.from(
    new Set([
      ...flights.map((flight) => flight.departure.city),
      ...flights.map((flight) => flight.arrival.city),
    ])
  ).sort();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ from, to, date });
  };

  const handleClear = () => {
    setFrom('');
    setTo('');
    setDate('');
    onSearch({ from: '', to: '', date: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border bg-card p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label htmlFor="from" className="block text-sm font-medium text-muted-foreground">
            From
          </label>
          <select
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Any city</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="to" className="block text-sm font-medium text-muted-foreground">
            To
          </label>
          <select
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Any city</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-muted-foreground">
            Date
          </label>
          <div className="relative">
            <input
              type="date"
              id="date"
              value={date}
              min={minDate}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:dark:invert"
            />
            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          className="flex-1 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90"
        >
          Search Flights
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="rounded-md bg-secondary px-4 py-2 font-medium text-secondary-foreground hover:bg-secondary/90"
        >
          Clear
        </button>
      </div>
    </form>
  );
} 