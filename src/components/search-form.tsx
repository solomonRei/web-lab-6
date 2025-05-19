import { useState } from 'react';
import { useApp } from '../context/AppContext';

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
            required
          >
            <option value="">Select city</option>
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
            required
          >
            <option value="">Select city</option>
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
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90"
      >
        Search Flights
      </button>
    </form>
  );
} 