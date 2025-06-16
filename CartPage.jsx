import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = 1; // Replace with actual logged-in user ID
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = () => {
    axios.get(`http://localhost:8081/api/cart/${userId}`)
      .then(res => {
        if (res.data.success) {
          setCartItems(res.data.data);
        } else {
          toast.error("Failed to fetch cart items");
        }
      })
      .catch(err => {
        console.error("Error fetching cart items:", err);
        toast.error("Something went wrong");
      });
  };

  const handleDelete = (productId) => {
    axios.delete(`http://localhost:8081/api/cart/${userId}/${productId}`)
      .then(res => {
        if (res.data.success) {
          setCartItems(prev => prev.filter(item => item.id !== productId));
          toast.success("Item removed from cart 🗑");
        } else {
          toast.error("Failed to delete item.");
        }
      })
      .catch(err => {
        console.error("Error deleting item:", err);
        toast.error("Something went wrong while deleting.");
      });
  };

  const handleCheckout = async () => {
    try {
      // 1. Save current cart in sessionStorage for payment reference
      sessionStorage.setItem("orderItems", JSON.stringify(cartItems));

      // 2. Clear the cart from backend
      const res = await axios.delete(`http://localhost:8081/api/cart/clear/${userId}`);
      if (res.data.success) {
        toast.success("Cart cleared. Redirecting to payment...");

        // 3. Clear local cart and redirect
        setCartItems([]);
        navigate("/check");
      } else {
        toast.error("Failed to clear cart.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Something went wrong during checkout.");
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-card">
                <img src={`/images/${item.id}.jpg`} alt={item.title} className="cart-img" />
                <div className="cart-details">
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                  <p>Price: ₹{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <button className="delete-btn" onClick={() => handleDelete(item.id)}>🗑</button>
              </div>
            ))}
          </div>

          <div className="checkout-section">
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout 💳
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
