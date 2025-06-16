import React from 'react';


const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-section">
        <h2>Subscribe to our awesome emails.</h2>
        <p>Get our latest offers and news straight in your inbox.</p>
        <div className="subscribe-box">
          <input type="email" placeholder="Please enter an email address" />
          <button>Subscribe</button>
        </div>
      </div>

      <div className="footer-section">
        <h2>Download our apps</h2>
        <p>Shop our products and offers on-the-go.</p>
        <div className="app-buttons">
<img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on the App Store" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
