// OrderChart.js

import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import axios from 'axios';
import moment from 'moment'; // Import moment for date manipulation

const OrderChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/checkin');
        setChartData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Aggregate data by day of the week
    const aggregatedData = chartData.reduce((acc, item) => {
      const dayOfWeek = moment(item.timestamp).format('dddd'); // Format timestamp to get the day name
      acc[dayOfWeek] = (acc[dayOfWeek] || 0) + 1;
      return acc;
    }, {});

    // Ensure all days of the week are present, even if there are no orders
    const allDaysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const chartDataForAllDays = allDaysOfWeek.map(day => aggregatedData[day] || 0);

    const chart = echarts.init(document.getElementById('order-chart'));

    const options = {
      title: {
        text: 'Number of Orders by Day',
      },
      xAxis: {
        type: 'category',
        data: allDaysOfWeek,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: chartDataForAllDays,
          type: 'line',
          name: 'Orders',
          smooth: true,
        },
      ],
    };

    chart.setOption(options);

    return () => {
      chart.dispose();
    };
  }, [chartData]);

  return <div id="order-chart" style={{ width: '100%', height: '400px' }} />;
};

export default OrderChart;
