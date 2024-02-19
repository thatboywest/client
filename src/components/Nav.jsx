import React from 'react';
import LogoutButton from '../components/Logoutbutton';
import { useAuth } from '../context/AuthContext'; 
import './Nav.css';

function Nav() {
 
  const { isLoggedIn, } = useAuth();

  return (
    <nav>
      {isLoggedIn ? (
        <>
          <p>Welcome,!</p>
      <LogoutButton/>
        </>
      ) : (
        <p>Please log in</p>
      )}
    </nav>
  );
};

export default Nav;
