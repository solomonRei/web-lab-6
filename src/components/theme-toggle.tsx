import { Moon, Sun } from 'lucide-react';
import { useTheme } from './theme-provider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="rounded-md p-2 hover:bg-accent hover:text-accent-foreground relative"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
} 