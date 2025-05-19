import { FlightCard } from '../components/flight-card';
import { useApp } from '../context/AppContext';

export function FavoritesPage() {
  const { favorites } = useApp();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Your Favorites</h1>
      {favorites.length === 0 ? (
        <p className="text-center text-muted-foreground">No favorite flights yet</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((favorite) => (
            <FlightCard key={favorite.id} flight={favorite} />
          ))}
        </div>
      )}
    </div>
  );
} 