// Track.js

import React, { useState } from "react";
import ReviewForm from "../components/Reviewform";
import ClientNav from "../components/ClientNav";
import axios from "axios";
import "./Track.css";

const Track = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [packageStatus, setPackageStatus] = useState("");
  const [error, setError] = useState("");

  const trackPackage = async () => {
    try {
      console.log("Tracking package for phone number:", phoneNumber);

      const response = await axios.post("http://localhost:3001/api/track", {
        phoneNumber: phoneNumber,
      });

      console.log("Server response:", response.data);

      setPackageStatus(JSON.stringify(response.data.status));
    } catch (err) {
      console.error("Error tracking package:", err);
      setError("Error tracking package. Please try again.");
    }
  };

  return (
    <>
    <ClientNav/>
      <div className="track">
        <h1>Package Tracking</h1>
        <form>
          <label>
            Phone Number:
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>

          <button type="button" onClick={trackPackage}>
            Track Package
          </button>
        </form>
        {packageStatus && (
          <div>
            <h2>Package Status:</h2>
            <p>{packageStatus}</p>
          </div>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <ReviewForm />
    </>
  );
};

export default Track;
