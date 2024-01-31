import React, { useEffect, useState } from 'react';
import './orders.css';
import SearchInput from './Search';
import Alert from './Alert';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/checkin');
        if (response.ok) {
          const ordersData = await response.json();
          const sortedOrders = [...ordersData].sort((a, b) => new Date(b.date) - new Date(a.date));
          setOrders(sortedOrders);
          setFilteredOrders(sortedOrders); // Initialize filteredOrders with all orders
        } else {
          console.error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3001/api/checkin/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        console.log('Order status updated successfully!');
        setShowAlert(true);
      } else {
        console.error('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleSearch = (searchText) => {
    const filtered = orders.filter((order) =>
      order.customerName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  return (
    <div className="orders-container">
      <center>
        <SearchInput onSearch={handleSearch} />
      </center>
      <div className="orders-table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer Name</th>
              <th>Pick-up Point</th>
              <th>Drop-off Point</th>
              <th>Item Type</th>
              <th>Driver Assigned</th>
              <th>Expected Delivery Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                <td>{order.date}</td>
                <td>{order.customerName}</td>
                <td>{order.pickupPoint}</td>
                <td>{order.dropoffPoint}</td>
                <td>{order.itemType}</td>
                <td>{order.driverAssigned}</td>
                <td>{order.expectedDeliveryDate}</td>
                <td>{order.status}</td>
                <td>
                  <button onClick={() => handleStatusUpdate(order._id, 'onroute')}>
                    Mark as On Route
                  </button>
                  <button onClick={() => handleStatusUpdate(order._id, 'delivered')}>
                    Mark as Delivered
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAlert && <Alert message="UPDATED SUCCESSFULLY" onClose={handleAlertClose} />}
    </div>
  );
}

export default OrdersPage;
