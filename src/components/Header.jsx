import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.body.classList.toggle('theme-dark', theme === 'dark');
    document.body.classList.toggle('theme-light', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <button
        className="nav-toggle"
        aria-expanded={isMenuOpen}
        onClick={toggleMenu}
      >
        Menu
      </button>
      <nav id="navMenu" className={isMenuOpen ? 'open' : ''}>
        <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
        <NavLink to="/features" onClick={toggleMenu}>Features</NavLink>
        <NavLink to="/dashboard" onClick={toggleMenu}>Dashboard</NavLink>
        <NavLink to="/pricing" onClick={toggleMenu}>Pricing</NavLink>
        <NavLink to="/faq" onClick={toggleMenu}>FAQ</NavLink>
        <NavLink to="/contact" onClick={toggleMenu}>Contact</NavLink>
      </nav>
      <div>
        <input
          type="checkbox"
          id="dmToggle"
          checked={theme === 'dark'}
          onChange={toggleTheme}
        />
        <button id="themeSwitch" onClick={toggleTheme}>
          {theme === 'dark' ? '🌙' : '🌞'}
        </button>
      </div>
    </header>
  );
}

export default Header;
