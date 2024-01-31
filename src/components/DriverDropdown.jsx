import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DriverDropdown = ({ onDriverSelect }) => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/drivers');

        setDrivers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching registered drivers:', error);
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  return (
    <select name="driverAssigned" onChange={(e) => onDriverSelect(e.target.value)}>
      {loading ? (
        <option value="" disabled>Loading Drivers...</option>
      ) : (
        <>
          <option value="">Select Driver</option>
          {drivers.map((driver) => (
            <option key={driver._id} value={driver.name}>
              {driver.name}
            </option>
          ))}
        </>
      )}
    </select>
  );
};

export default DriverDropdown;
