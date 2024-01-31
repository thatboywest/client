// Checkin.js

import React, { useState } from 'react';
import DriverDropdown from './DriverDropdown';
import Alert from './Alert';
import './Checkin.css';

function Checkin() {
  const [formData, setFormData] = useState({
    date: '',
    customerName: '',
    phoneNumber: '',
    idNumber: '',
    pickupPoint: '',
    dropoffPoint: '',
    itemType: 'fragile',
    description: '',
    vehicleType: 'pick-up',
 
    amountPaid: '',
    expectedDeliveryDate: '',
    driverAssigned: '',

  });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/checkin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Check-in data submitted successfully!');
        setShowAlert(true);
      } else {
        console.error('Failed to submit check-in data');
        // Handle the error response
      }
    } catch (error) {
      console.error('Error submitting check-in data:', error);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  return (
    <>
    <div className="chekin">

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date of Check-in:</label>
          <input type="date" name="date" onChange={handleChange} value={formData.date} />
        </div>

        <div className="form-group">
          <label>Name of Customer:</label>
          <input type="text" name="customerName" onChange={handleChange} value={formData.customerName} />
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input type="tel" name="phoneNumber" onChange={handleChange} value={formData.phoneNumber} />
        </div>

        <div className="form-group">
          <label>ID Number:</label>
          <input type="text" name="idNumber" onChange={handleChange} value={formData.idNumber} />
        </div>

        <div className="form-group">
          <label>Pick-up Point:</label>
          <input type="text" name="pickupPoint" onChange={handleChange} value={formData.pickupPoint} />
        </div>

        <div className="form-group">
          <label>Drop-off Point:</label>
          <input type="text" name="dropoffPoint" onChange={handleChange} value={formData.dropoffPoint} />
        </div>

        <div className="form-group">
          <label>Item Type:</label>
          <select name="itemType" onChange={handleChange} value={formData.itemType}>
            <option value="fragile">Fragile</option>
            <option value="not-fragile">Not Fragile</option>
          </select>
        </div>

        <div className="form-group">
          <label>Description:</label>
          <input type="text" name="description" onChange={handleChange} value={formData.description} />
        </div>

        <div className="form-group">
          <label>Vehicle Type:</label>
          <select name="vehicleType" onChange={handleChange} value={formData.vehicleType}>
            <option value="pick-up">Pick-up</option>
            <option value="bike">Bike</option>
            <option value="bicycle">Bicycle</option>
            <option value="transit">Transit</option>
          </select>
        </div>

        <div className="form-group">
            <label>Driver Assigned:</label>
            <DriverDropdown onDriverSelect={(driver) => setFormData((prevData) => ({ ...prevData, driverAssigned: driver }))} />
          </div>
        <div className="form-group">
            <label>Amount Paid:</label>
            <input type="text" name="amountPaid" onChange={handleChange} value={formData.amountPaid} />
          </div>

        <div className="form-group">
          <label>Expected Day of Delivery:</label>
          <input type="date" name="expectedDeliveryDate" onChange={handleChange} value={formData.expectedDeliveryDate} />
        </div>

        <div className="button-container">
          <button className="button" type="submit">
            Submit
          </button>
        </div>
      </form>

      {showAlert && <Alert message="Order created successfully" onClose={handleAlertClose} />}

      </div>
    </>
  );
}

export default Checkin;
