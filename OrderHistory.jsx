import React, { useEffect, useState } from 'react';
import axios from 'axios';


const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const userId = 1; // Replace with actual logged-in user ID

  useEffect(() => {
    axios.get(`http://localhost:8081/api/orders/${userId}`)
      .then(res => {
        if (res.data.success) {
          setOrders(res.data.data);
        } else {
          console.error("Failed to load orders");
        }
      })
      .catch(err => {
        console.error("Error:", err);
      });
  }, []);

  return (
    <div className="order-history-container">
      <h2>Order History 📦</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="order-list">
          {orders.map((order, index) => (
            <div key={index} className="order-card">
              <h3>{order.title}</h3>
              <p>{order.subtitle}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Unit Price: ₹{order.unit_price}</p>
              <p>Total Price: ₹{order.total_price}</p>
              <p><small>Ordered On: {new Date(order.order_time).toLocaleString()}</small></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
