import { MoonIcon, SunIcon } from '@heroicons/react/outline';
import React, { useEffect } from 'react';
import { useTheme } from 'react-daisyui';
const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setTheme('dracula');
  }, []);
  return (
    <div className="mx-auto items-center">
      {/* eslint-disable-next-line tailwindcss/no-custom-classname*/}
      <label className="swap swap-rotate">
        <input className="hidden " type="checkbox" id="swap" />
        {theme === 'dracula' ? (
          <SunIcon
            onClick={() => setTheme('pastel')}
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className="swap-off h-8  w-8 cursor-pointer"
          />
        ) : (
          <MoonIcon
            onClick={() => setTheme('dracula')}
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className="swap-on h-8 w-8 cursor-pointer"
          />
        )}
      </label>
    </div>
  );
};

export default ThemeSwitcher;
