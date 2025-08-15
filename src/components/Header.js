import { NavLink } from 'react-router-dom';
import { useState } from 'react';

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    document.body.className = `theme-${theme === 'dark' ? 'light' : 'dark'}`;
  };

  return (
    <header className="site-header" data-elevate>
      <div className="container nav">
        <NavLink to="/" className="brand" aria-label="AI Trading Genie home">
          <svg className="logo" viewBox="0 0 64 64" aria-hidden="true">
            <use href="#logo-symbol"></use>
          </svg>
          <span>AI Trading Genie</span>
        </NavLink>
        <button className="nav-toggle" aria-expanded={isNavOpen} onClick={toggleNav}>
          <span></span><span></span><span></span>
        </button>
        <nav id="navMenu" className={`menu ${isNavOpen ? 'open' : ''}`}>
          <NavLink to="/features">Features</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="/faq">FAQ</NavLink>
          <NavLink to="/contact" className="btn btn--ghost">Contact</NavLink>
          <button className="theme-switch" onClick={toggleTheme} aria-label="Toggle dark mode">
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
