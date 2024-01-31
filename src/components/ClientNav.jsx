// Nav.js

import React, { useState } from "react";
import Logo from '../assets/Logo.png'
import "./Nav.css"; 
import { Link } from "react-router-dom";
import './ClientNav.css'


function ClientNav(params) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav>
        <div className={`nav-container ${isMenuOpen ? "menu-open" : ""}`}>
          <div className="logo">
            <Link to="/Client">
              {" "}
              <img className="logo" src={Logo} height={100} alt="" />
            </Link>
          </div>

          <div
            className={`menu-icon ${isMenuOpen ? "open" : ""}`}
            onClick={toggleMenu}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>

          <ul className={`nav-menu ${isMenuOpen ? "show" : ""}`}>
            <li>
              <Link to="/About-us">About us</Link>
            </li>
            <li>
              <Link to="/Services">What we do</Link>
            </li>
            <li>
              <Link to="/Stations">Stations</Link>
            </li>
            
            <li>
              <Link to="/Track">Track</Link>
            </li>
           
          </ul>
        </div>
      </nav>
    </>
  );
}

export default  ClientNav;
