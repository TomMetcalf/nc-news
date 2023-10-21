import { useTheme } from '../contexts/ThemeContext';

export default function LightModeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <a onClick={toggleTheme} className="light-mode-toggle">
      {isDarkMode ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    </a>
  );
}
