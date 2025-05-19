# Flight Booker

A modern client-side flight booking application built with React, TypeScript, and Vite.


## Features

- 🔍 **Flight Search** - Search flights by departure city, destination city, and date
- ✈️ **Booking Management** - Book flights and manage your bookings
- ❤️ **Favorites** - Save your favorite flights for quick booking later
- 🌙 **Theme Support** - Choose between light, dark, and system theme
- 💰 **Multiple Currencies** - View prices in USD, EUR, or MDL
- 🧑‍✈️ **Seat Selection** - Choose your preferred seats with an interactive seat map
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices
- 💾 **Local Storage** - All your data persists between sessions

## Tech Stack

- **React 19** - Latest version with improved performance
- **TypeScript** - Type safety for better development experience
- **Vite** - Fast, modern build tool
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Reusable UI components
- **React Router** - Client-side routing
- **Lucide React** - Beautiful SVG icons

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/flights.git
   cd flights
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173/flights/
   ```

## Project Structure

```
flights/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable UI components
│   ├── context/       # React context for global state management
│   ├── data/          # Mock flight data
│   ├── lib/           # Utility functions
│   ├── pages/         # Application pages
│   ├── types/         # TypeScript type definitions
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── .github/           # GitHub Actions workflows
├── package.json       # Project dependencies and scripts
└── vite.config.ts     # Vite configuration
```

## Development

### Commands

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run deploy` - Deploy the application to GitHub Pages

### State Management

The application uses React Context for state management. The main contexts are:

- `AppContext` - Manages flights, bookings, favorites, and currency
- `ThemeContext` - Manages light/dark theme

All data is persisted in localStorage to maintain state between sessions.

## Deployment

The application is configured for deployment on GitHub Pages:

1. Update the `base` path in `vite.config.ts` if needed
2. Create a GitHub repository
3. Run `npm run deploy` or push to the main branch to trigger GitHub Actions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Flight data is simulated and for demonstration purposes only
- Design inspired by modern booking platforms
- Icons provided by [Lucide](https://lucide.dev/)
