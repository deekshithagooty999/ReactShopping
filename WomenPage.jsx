import React from "react";


const WomenPage = () => {
  const products = [
  {
    id: 1,
    title: "Man's Sweater",
    subtitle: "Special For You",
    offer: "50% OFF",
    img: "https://images.unsplash.com/photo-1600185365984-cfe6e3b39c91?auto=format&fit=crop&w=800&q=80",
    btnText: "SHOP NOW",
  },
  {
    id: 2,
    title: "Streetwear",
    subtitle: "Trendy Style",
    offer: "50% OFF",
    img: "https://images.unsplash.com/photo-1618354691417-b44b8d4a6e56?auto=format&fit=crop&w=800&q=80",
    btnText: "BUY NOW",
  },
  {
    id: 3,
    title: "Comfort Style",
    subtitle: "Pre-order",
    offer: "Available 12.12.2024",
    img: "https://images.unsplash.com/photo-1585386959984-a4155228ef19?auto=format&fit=crop&w=800&q=80",
    btnText: "PRE-ORDER NOW",
  },
  {
    id: 4,
    title: "Special Offer",
    subtitle: "Don’t Miss It!",
    offer: "50% OFF",
    img: "https://images.unsplash.com/photo-1600180758890-6b94519f2e6d?auto=format&fit=crop&w=800&q=80",
    btnText: "BUY NOW",
  },


  ];

  return (
    <div className="women-container">
      <h2 className="women-heading">Women Clothing</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.img} alt={product.title} className="product-img" />
            <div className="product-info">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-subtitle">{product.subtitle}</p>
              <p className="product-offer">{product.offer}</p>
              <button className="product-button">{product.btnText}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WomenPage;
