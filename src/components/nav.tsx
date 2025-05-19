import { Link, useLocation } from 'react-router-dom';
import { Plane, Heart, Calendar } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { CurrencySelector } from './currency-selector';

export function Nav() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <Plane className="h-6 w-6 text-primary" />
          <span>FlightBooker</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive('/')
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            <Plane className="h-4 w-4" />
            <span>Flights</span>
          </Link>

          <Link
            to="/bookings"
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive('/bookings')
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            <Calendar className="h-4 w-4" />
            <span>Bookings</span>
          </Link>

          <Link
            to="/favorites"
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive('/favorites')
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            <Heart className="h-4 w-4" />
            <span>Favorites</span>
          </Link>

          <div className="mx-2">
            <CurrencySelector />
          </div>
          
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
} 