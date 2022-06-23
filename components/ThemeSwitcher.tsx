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
      {themeMode === 'pastel' ? (
        <MoonIcon
          onClick={toggleTheme}
          {...rest}
          className="w-8 h-8 cursor-pointer
          "
        />
      ) : (
        <SunIcon
          onClick={toggleTheme}
          {...rest}
          className="w-8 h-8 cursor-pointer"
        />
      )}
    </Tooltip>
  );
};
export default ThemeSwitcherButton;
