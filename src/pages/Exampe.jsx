// ExampleComponent.jsx

import React from "react";
import { useAuth } from "../context/AuthContext";

const ExampleComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();

  const handleLogin = () => {
    login(); // Simulates a login action
  };

  const handleLogout = () => {
    logout(); // Simulates a logout action
  };

  return (
    <div>
      <h2>Example Component</h2>
      <p>User: {user ? user.username : "Not logged in"}</p>
      <p>IsAuthenticated: {isAuthenticated ? "Yes" : "No"}</p>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ExampleComponent;
