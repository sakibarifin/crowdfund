import React from 'react';
// Import the CSS file for your Navbar
import logo from '../Illustrations/Blockcrowd_logo.png'; // Import the SVG file
import './../Styles/Navbar.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <ul className="navbar-list">
        <li className="navbar-item"><a href="/" className="navbar-link">About</a></li>
        <li className="navbar-item"><a href="/" className="navbar-link">Blog</a></li>
        <li className="navbar-item"><a href="/" className="navbar-link">FAQ</a></li>
        <li className="navbar-item"><ConnectButton /></li>
      </ul>
    </nav>
  );
}

export default Navbar;
