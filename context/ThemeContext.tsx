import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';
import { useTheme } from 'react-daisyui';
import { Theme } from 'react-daisyui';

import useLocalStorage from '../hooks/useLocalStorage';

type ThemeMode = 'pastel' | 'dracula';
interface ThemeContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);
const useThemeContext = () => useContext(ThemeContext);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { theme, setTheme } = useTheme();
  const isDarkOS = theme === 'dracula';

  const [themeMode, setThemeMode] = useLocalStorage<ThemeMode>(
    'themeMode',
    isDarkOS ? 'dracula' : 'pastel'
  );

  const toggleTheme = () => {
    switch (themeMode) {
      case 'dracula':
        setThemeMode('pastel');
        break;
      case 'pastel':
        setThemeMode('dracula');
        break;
      default:
    }
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <Theme
        className="h-fit bg-base-100"
        dataTheme={themeMode === 'dracula' ? 'dracula' : 'pastel'}
      >
        {children}
      </Theme>
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, useThemeContext };
