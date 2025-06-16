import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const userId = 1; // Replace with actual user ID
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("orderItems")) || [];
    setOrderItems(data);

    const total = data.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotalPrice(total);
  }, []);

  const handlePayment = async () => {
    try {
      const res = await axios.post('http://localhost:8081/api/orders', {
        user_id: userId,
        items: orderItems,
        total_price: totalPrice
      });

      if (res.data.success) {
        toast.success("Order placed successfully 🛍");
        sessionStorage.removeItem("orderItems");
        navigate("/"); // or to /orders
      } else {
        toast.error("Failed to place order");
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="payment-page">
      <h2>Payment Page</h2>
      {orderItems.map(item => (
        <div key={item.id} className="order-item">
          <p><strong>{item.title}</strong> × {item.quantity} - ₹{item.price}</p>
        </div>
      ))}
      <h3>Total: ₹{totalPrice}</h3>
      <button className="pay-btn" onClick={handlePayment}>Pay Now 💰</button>
    </div>
  );
};

export default PaymentPage;
