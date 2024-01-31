// PackageStatusForm.js
import React, { useState } from 'react';
import axios from 'axios';

const PackageStatusForm = () => {
  const [idNumber, setIdNumber] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleIdNumberChange = (e) => {
    setIdNumber(e.target.value);
  };

  const handleFetchStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/track/${idNumber}`);
      setStatus(response.data.status);
      setError('');
    } catch (error) {
      console.error('Error fetching package status:', error.response.data.error);
      setStatus('');
      setError('Package not found');
    }
  };

  return (
    <div>
      <h1>Package Status Checker</h1>
      <div>
        <label htmlFor="idNumber">Enter ID Number:</label>
        <input
          type="text"
          id="idNumber"
          value={idNumber}
          onChange={handleIdNumberChange}
        />
      </div>
      <button onClick={handleFetchStatus}>Fetch Package Status</button>
      {status && <p>Package Status: {status}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PackageStatusForm;
