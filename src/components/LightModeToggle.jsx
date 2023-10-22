import { useTheme } from '../contexts/ThemeContext';

export default function LightModeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <a onClick={toggleTheme} className="light-mode-toggle">
      {isDarkMode ? (
        <>
          <i className="fa fa-moon-o lightmode-icon" aria-hidden="true"></i>
          <span className="lightmode-text">Dark Mode</span>
        </>
      ) : (
        <>
          <i className="fa-regular fa-sun lightmode-icon"></i>
          <span className="lightmode-text">Light Mode</span>
        </>
      )}
    </a>
  );
}
