import React, { useState, useEffect } from "react";
import "./Home.css";
import Nav from "../components/Nav";
import Dashboard from "../components/Dashboard";
import Checkin from "../components/Checkin";
import Orders from "../components/Orders";
import Comment from "../components/Comments";
import { MdDashboardCustomize } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";
import { RiListOrdered } from "react-icons/ri";
import { FaCommentAlt } from "react-icons/fa";
function Home() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const handleButtonClick = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    // Set a class to the body based on the current page
    document.body.className = currentPage === "not-scrollable";

    // Cleanup effect
    return () => {
      document.body.className = "";
    };
  }, [currentPage]);

  return (
    <div className="home">
      <div className="nav"></div>
      <div className="content">
        <div className="sidebar">
          <button
            onClick={() => handleButtonClick("dashboard")}
            className={currentPage === "dashboard" ? "active" : ""}
          >
            <MdDashboardCustomize /> Dashboard
          </button>
          <button
            onClick={() => handleButtonClick("checkin")}
            className={currentPage === "checkin" ? "active" : ""}
          >
            <FaCalendarCheck /> Check-in
          </button>
          <button
            onClick={() => handleButtonClick("orders")}
            className={currentPage === "orders" ? "active" : ""}
          >
            <RiListOrdered /> Orders
          </button>
          <button
            onClick={() => handleButtonClick("comment")}
            className={currentPage === "comment" ? "active" : ""}
          >
            <FaCommentAlt /> Reviews
          </button>
        </div>

        <div className="main">
          <Nav onButtonClick={handleButtonClick} />

          {currentPage === "dashboard" && <Dashboard />}
          {currentPage === "checkin" && <Checkin />}
          {currentPage === "orders" && <Orders />}
          {currentPage === "comment" && <Comment />}
        </div>
      </div>
    </div>
  );
}

export default Home;
