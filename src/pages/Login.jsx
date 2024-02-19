// Logincomponent.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";


function Logincomponent() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        const { user, redirect } = responseData;
        login(user); // Ensure that login function is being called
        setMessage("Login successful");
        navigate(redirect);
      } else {
        const responseData = await response.json();
        const { error } = responseData;
        console.error("Authentication error:", error);
        setMessage("Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (isAuthenticated && window.location.pathname !== "/login") {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);


  return (
    <div className="form">
      <form className="form-container" onSubmit={handleSubmit}>
        <center>
          <h1>LOG IN</h1>
        </center>
        <div className="input-group">
          <input
            placeholder="Email"
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button className="submit-button" type="submit">
          Login
        </button>
        <center>
          <p>{message}</p>
        </center>
      </form>
    </div>
  );
}

export default Logincomponent;
