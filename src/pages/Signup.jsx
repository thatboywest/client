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
    <div className="signup-container">
      <div className="signup-card">
        <h2>Signup Form</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Station ID:
            <input
              type="text"
              name="stationId"
              value={userData.stationId}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Role:
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
          </label>
          <br />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupComponent;
