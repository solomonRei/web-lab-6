# Flight Booker

A modern web application for searching and booking flights, built with React, TypeScript, and Tailwind CSS.

## Features

- Search flights by departure city, arrival city, and date
- Book flights and manage bookings
- Add flights to favorites
- Dark/light theme support
- Responsive design
- Client-side state management with localStorage persistence

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- shadcn/ui components
- Lucide icons

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm 7.x or later

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/flight-booker.git
   cd flight-booker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── context/       # React context for state management
  ├── data/          # Mock data
  ├── pages/         # Page components
  ├── types/         # TypeScript type definitions
  ├── App.tsx        # Main application component
  └── main.tsx       # Application entry point
```

## Features in Detail

### Flight Search
- Filter flights by departure and arrival cities
- Select specific dates
- View flight details including duration, stops, and price

### Bookings
- Book flights with a single click
- View all booked flights
- Cancel bookings
- Persistent storage using localStorage

### Favorites
- Add flights to favorites
- Remove flights from favorites
- View all favorite flights
- Persistent storage using localStorage

### Theme
- Toggle between light and dark themes
- System theme detection
- Persistent theme preference

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
