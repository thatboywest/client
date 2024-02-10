import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Alert from "../components/Alert";
import "./Login.css";

const LoginComponent = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { login, isAuthenticated } = useAuth(); // Corrected destructure

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleShowAlert = (message, type) => {
    setAlertMessage(message);
    setIsAlertVisible(true);

    // Close the alert after 3 seconds
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 3000);
  };

  const handleCloseAlert = () => {
    setIsAlertVisible(false);
  };

  const closeModal = () => {
    // Implement the logic to close the modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/login",
        loginData
      );

      if (response.data.redirect) {
        if (response.data.redirect === "/driver") {
          login(); // Corrected, as user was not defined
          navigate("/driver", { replace: true });
        } else if (response.data.redirect === "/home") {
          navigate("/home", { replace: true });
        }
      } else {
        handleShowAlert(response.data.message, "success");
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
      if (error.response && error.response.status === 401) {
        handleShowAlert("Invalid credentials. Please try again.", "error");
      } else {
        handleShowAlert(
          "Internal server error. Please try again later.",
          "error"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      closeModal();
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login Form</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={loginData.password}
              autoComplete="new-password"
              onChange={handleChange}
              required
            />
          </label>
          <br />
          {isAlertVisible && (
            <Alert message={alertMessage} onClose={handleCloseAlert} />
          )}
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
