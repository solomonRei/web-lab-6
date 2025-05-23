import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { AppProvider } from './context/AppContext';
import { Nav } from './components/nav';
import { HomePage } from './pages/home';
import { BookingsPage } from './pages/bookings';
import { FavoritesPage } from './pages/favorites';

function App() {
  // Determine the base URL to match the Vite config `base` option for GitHub Pages
  const basename = import.meta.env.BASE_URL;

  return (
    <Router basename={basename}>
      <ThemeProvider defaultTheme="system" storageKey="flight-booker-theme">
        <AppProvider>
          <div className="min-h-screen bg-background">
            <Nav />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/bookings" element={<BookingsPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
              </Routes>
            </main>
          </div>
        </AppProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
