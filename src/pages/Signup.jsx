import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";

const SignupComponent = () => {
  const [userData, setUserData] = useState({
    name: "",
    stationId: "",
    email: "",
    password: "",
    role: "", // New field for the role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/signup",
        userData
      );

      console.log("Signup successful:", response.data);

      setUserData({
        name: "",
        stationId: "",
        email: "",
        password: "",
        role: "",
      });
    } catch (error) {
      console.error(
        "Signup failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="form">
      <div className="signup-card">
        <h2>Signup Form</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={userData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="stationId"
            placeholder="Station ID"
            value={userData.stationId}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
          />

          <div>
            <input
              type="radio"
              name="role"
              value="driver"
              checked={userData.role === "driver"}
              onChange={handleChange}
            />
            <span>Driver</span>
          </div>
          <div>
            <input
              type="radio"
              name="role"
              value="cashier"
              checked={userData.role === "cashier"}
              onChange={handleChange}
            />
            <span>Cashier</span>
          </div>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupComponent;
