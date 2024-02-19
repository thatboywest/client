import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  return (
    <>
      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          backgroundColor: "#1f2029", 
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          outline: "none",
          transition: "background-color 0.3s",
        }}
        // Add hover effect
        onMouseOver={(e) => (e.target.style.backgroundColor = "#1f2029")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#1f2029")}
      >
        Logout
      </button>
    </>
  );
};

export default LogoutButton;
