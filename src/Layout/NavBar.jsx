import React, { useState } from 'react';
import Logo from '../assets/Images/LogoParisTour.png';
import { Link } from 'react-router-dom';
import '../css/NavBar.css';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className='MainNavWrapper'>
      <nav className='NavBarWrapper'>
        <Link to="/">
          <img src={Logo} alt="logo" className='Logo' />
        </Link>
        <div className={`Hamburger ${menuOpen ? 'Open' : ''}`} onClick={toggleMenu}>
          {menuOpen ? '✖' : '☰'}
        </div>
        <ul className={`NavMenu ${menuOpen ? 'Open' : ''}`}>
          <li className='NavLi'>
            <Link to="/" className='NavLink' onClick={closeMenu}>Home</Link>
          </li>
          {/* <li className='NavLi'>
            <a href="#SeeOurTourNavLink" className='NavLink' onClick={closeMenu}>Destinations</a>
          </li> */}
          <li className='NavLi'>
            <Link to="/Privatisation" className='NavLink' onClick={closeMenu}>Our Vehicule</Link>
          </li>
          <li className='NavLi'>
            <Link to="/Contact" className='NavLink' onClick={closeMenu}>Contact Us</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
