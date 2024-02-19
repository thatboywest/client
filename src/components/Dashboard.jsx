import React, { useState, useEffect } from 'react';

import { MdPending } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { TfiAgenda } from "react-icons/tfi";
import OrderChart from './Chartjs';
import './Dashboard.css';

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    completedOrders: 0,
    pendingOrders: 0,
    onRouteOrders: 0,
    totalDrivers: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {

        const responseOrders = await fetch('http://localhost:3001/api/checkin');
        if (responseOrders.ok) {
          const ordersData = await responseOrders.json();
          const totalOrders = ordersData.length;

          // Fetch completed orders
          const completedOrders = ordersData.filter(order => order.status === 'delivered').length;

          // Fetch pending orders
          const pendingOrders = ordersData.filter(order => order.status === 'pending').length;

          // Fetch on route orders
          const onRouteOrders = ordersData.filter(order => order.status === 'onroute').length;

          // Fetch total drivers
          const responseDrivers = await fetch('http://localhost:3001/api/checkin');
          if (responseDrivers.ok) {
            const driversData = await responseDrivers.json();
            const totalDrivers = driversData.length;

        
            setDashboardData({
              totalOrders,
              completedOrders,
              pendingOrders,
              onRouteOrders,
              totalDrivers,
            });
          } else {
            console.error('Failed to fetch drivers data');
          }
        } else {
          console.error('Failed to fetch orders data');
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <>
    <div className="dashboard">
      <div className="dash">
        <div className="card orders">
          <p><TfiAgenda /> Orders</p>
          <p className="info">{dashboardData.totalOrders}</p>
        </div>

        <div className="card completed">
          <p><IoCheckmarkDoneSharp /> Completed</p>
          <p className="info">{dashboardData.completedOrders}</p>
        </div>

        <div className="card pending">
          <p><MdPending /> Pending</p>
          <p className="info">{dashboardData.pendingOrders}</p>
        </div>

        <div className="card onroute">
          <p>On Route</p>
          <p className="info">{dashboardData.onRouteOrders}</p>
        </div>
  
       
      </div>
      <div className="chart">
        <OrderChart/>
      </div>
      </div>
    </>
  );
}

export default Dashboard;
