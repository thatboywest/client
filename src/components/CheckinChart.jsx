import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const LineChartComponent = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your API endpoint
        const response = await axios.get('http://localhost:3001/api/checkin');
        const data = response.data;

        if (!data || data.length === 0) {
          console.error('Data is empty or undefined');
          return;
        }

        const weeklyData = processDataWeekly(data);

        setChartData({
          labels: weeklyData.map(entry => entry.weekStart),
          datasets: [
            {
              label: 'Check-ins',
              data: weeklyData.map(entry => entry.checkins),
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const processDataWeekly = data => {
    const weeklyData = [];

    data.forEach(entry => {
      const entryDate = new Date(entry.date);
      const weekStart = new Date(entryDate.getFullYear(), entryDate.getMonth(), entryDate.getDate() - entryDate.getDay());

      const existingWeekIndex = weeklyData.findIndex(
        weekEntry => isSameWeek(weekEntry.weekStart, weekStart)
      );

      if (existingWeekIndex !== -1) {
        // Update existing week's check-ins
        weeklyData[existingWeekIndex].checkins += 1; // Assuming each entry represents one check-in
      } else {
        // Add a new week
        weeklyData.push({
          weekStart,
          checkins: 1, // Initial count for the new week
        });
      }
    });

    return weeklyData;
  };

  // Function to check if two dates are in the same week
  const isSameWeek = (date1, date2) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffDays = Math.round(Math.abs((date1 - date2) / oneDay));
    return diffDays < 7 && date1.getDay() === date2.getDay();
  };

  return (
    <div>
      <Line data={chartData} />
    </div>
  );
};

export default LineChartComponent;
