import React from 'react';
import './Nav.css';
import Logo from '../assets/Logo.png'

function Nav() {
    return(
        <>
            <div className="navbar">
                <img src={Logo} className="logo"/>
                <button className="button">log out</button>
            </div>
        </>
    )
}

export default Nav;