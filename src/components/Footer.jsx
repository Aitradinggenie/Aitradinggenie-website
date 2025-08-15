import { useState, useEffect } from 'react';

function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer>
      <p>&copy; <span id="year">{year}</span> AI Trading Genie</p>
    </footer>
  );
}

export default Footer;
