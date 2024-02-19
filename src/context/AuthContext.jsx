// AuthContext.js

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(storedIsLoggedIn);

  
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/login");

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error(
            "Failed to fetch user information:",
            response.statusText
          );
        
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      }

      setIsLoading(false);
    };

    fetchUserData();
  }, []);

  const login = async () => {
    setIsLoggedIn(true);

    try {
      const response = await fetch("http://localhost:3001/api/login");

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        console.error("Failed to fetch user information:", response.statusText);
     
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
    }

    localStorage.setItem("isLoggedIn", "true");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);

    localStorage.removeItem("isLoggedIn");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
