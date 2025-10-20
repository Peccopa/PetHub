import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} Fullstack Dashboard
    </footer>
  );
};

export default Footer;
