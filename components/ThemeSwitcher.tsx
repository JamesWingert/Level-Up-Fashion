import { MoonIcon, SunIcon } from '@heroicons/react/outline';
import { Tooltip } from 'react-daisyui';

import { useThemeContext } from '../context/ThemeContext';

const ThemeSwitcherButton = ({ ...rest }) => {
  const { themeMode, toggleTheme } = useThemeContext();
  return (
    <Tooltip
      message="Toggle Theme"
      title={
        themeMode === 'pastel' ? `Switch to dark mode` : `Switch to light mode`
      }
    >
      <div className="items-center mx-auto">
        <label className="swap swap-rotate">
          <input
            className="hidden "
            type="checkbox"
            id="swap"
            onClick={toggleTheme}
            {...rest}
          />
          {themeMode === 'pastel' ? (
            <MoonIcon
              className="w-8 h-8 cursor-pointer swap-off
          "
            />
          ) : (
            <SunIcon className="w-8 h-8 cursor-pointer swap-on" />
          )}
        </label>
      </div>
    </Tooltip>
  );
};
export default ThemeSwitcherButton;
