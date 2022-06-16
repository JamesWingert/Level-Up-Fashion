import { MoonIcon, SunIcon } from '@heroicons/react/outline';
import React, { useEffect } from 'react';
import { useTheme } from 'react-daisyui';
const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setTheme('dracula');
  }, []);
  return (
    <div className="items-center mx-auto">
      <label className="swap swap-rotate">
        <input className="hidden " type="checkbox" id="swap" />
        {theme === 'dracula' ? (
          <SunIcon
            onClick={() => setTheme('pastel')}
            className="w-8 h-8  cursor-pointer swap-off"
          />
        ) : (
          <MoonIcon
            onClick={() => setTheme('dracula')}
            className="w-8 h-8 cursor-pointer swap-on"
          />
        )}
      </label>
    </div>
  );
};

export default ThemeSwitcher;
