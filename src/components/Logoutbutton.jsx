import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    logout();
    navigate("/");
  };

  const cancelLogout = () => {
    setShowModal(false);
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

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "5px",
              textAlign: "center",
            }}
          >
            <p>Are you sure you want to log out?</p>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "red", 
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                outline: "none",
                transition: "background-color 0.3s",
              }}
            
            onClick={confirmLogout}>Yes</button>
            <button
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
            onClick={cancelLogout}>No</button>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutButton;
