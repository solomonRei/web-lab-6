import { useApp } from '../context/AppContext';
import type { Currency } from '../context/AppContext';
import { DollarSign, Euro, CoinsIcon } from 'lucide-react';

export function CurrencySelector() {
  const { currency, setCurrency } = useApp();

  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency);
  };

  return (
    <div className="flex items-center gap-2 bg-muted/50 p-2 rounded-full">
      <button
        onClick={() => handleCurrencyChange('USD')}
        className={`flex items-center justify-center w-8 h-8 rounded-full ${
          currency === 'USD' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
        }`}
        aria-label="US Dollar"
      >
        <DollarSign className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => handleCurrencyChange('EUR')}
        className={`flex items-center justify-center w-8 h-8 rounded-full ${
          currency === 'EUR' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
        }`}
        aria-label="Euro"
      >
        <Euro className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => handleCurrencyChange('MDL')}
        className={`flex items-center justify-center w-8 h-8 rounded-full ${
          currency === 'MDL' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
        }`}
        aria-label="Moldovan Leu"
      >
        <CoinsIcon className="w-4 h-4" />
      </button>
    </div>
  );
} 