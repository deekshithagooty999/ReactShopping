import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MenPage = () => {
  const [products, setProducts] = useState([]);
  const userId = 1; // Replace with dynamic user ID later

  useEffect(() => {
    axios.get('http://localhost:8081/products')
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  const handleAddToCart = (productId) => {
    const payload = {
      user_id: userId,
      product_id: productId,
      quantity: 1, // Default quantity
    };

    axios.post('http://localhost:8081/api/cart', payload)
      .then(res => {
        if (res.data.success) {
          alert("Item added to cart!");
        } else {
          alert("Failed to add item to cart.");
        }
      })
      .catch(err => {
        console.error("Error adding to cart:", err);
        alert("Something went wrong!");
      });
  };

  return (
    <div className="men-container">
      <h2 className="section-title">Men Clothing</h2>
      <div className="men-products">
        {products.map(product => (
          <div className="men-card" key={product.id}>
            <img
              src={`/images/${product.id}.jpg`}
              alt={product.title}
              className="men-card-image"
              onError={(e) => { e.target.src = '/images/default.jpg'; }}
            />
            <h3 className="men-card-title">{product.title}</h3>
            <p className="men-card-subtitle">{product.subtitle}</p>
            <p className="men-card-offer">{product.offer}</p>
            <p className="men-card-price">₹{product.price}</p>
            <button
              className="men-add-btn"
              onClick={() => handleAddToCart(product.id)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenPage;
