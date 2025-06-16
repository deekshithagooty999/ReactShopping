import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && userId) {
      axios.get(`http://localhost:8081/api/cart/${userId}`)
        .then(res => {
          const total = res.data.reduce((sum, item) => sum + item.quantity, 0);
          setCartCount(total);
        })
        .catch(err => console.error("Error fetching cart count:", err));
    }
  }, [isLoggedIn]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/login' : '/register';

    try {
      const res = await axios.post(`http://localhost:8081${endpoint}`, formData);
      const { success, message, user_id } = res.data;

      alert(message);

      if (success) {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        if (user_id) {
          localStorage.setItem('user_id', user_id);
        }
        setShowModal(false);
      }
    } catch (error) {
      alert('Server error. Please try again later.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user_id');
    setFormData({ username: '', email: '', password: '' });
    setCartCount(0);
    alert("Logged out successfully.");
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <>
      <div className="header">
        <div className="header-left">
          <div className="logo-container">
            <img src="assests/sllogo.png" alt="StyleLoop Logo" className="logo-image" />
            <span className="logo-text">StyleLoop</span>
          </div>
          <nav className="nav-links">
            <Link to="/women">Women</Link>
            <Link to="/men">Men</Link>
            <a href="#">Kids</a>
            <a href="#">Shoes & Bags</a>
            <a href="#">Beauty</a>
          </nav>
        </div>

        <div className="header-right">
          <input type="text" className="search-bar" placeholder="What are you looking for?" />
          <a href="#" className="more">More</a>

          {isLoggedIn ? (
            <>
              <div className="dropdown-container" ref={dropdownRef}>
                <span
                  className="dropdown-toggle"
                  onClick={() => setShowDropdown((prev) => !prev)}
                >
                  My Account ▼
                </span>
                {showDropdown && (
                  <div className="dropdown-menu">
                    <Link to="/order-history" onClick={() => setShowDropdown(false)}>My Orders</Link>
                    <Link to="/profile" onClick={() => setShowDropdown(false)}>Profile</Link>
                    <Link to="/wishlist" onClick={() => setShowDropdown(false)}>Wishlist</Link>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>

              <span className="icon">♡</span>
              <Link to="/cart" className="cart-icon-wrapper">
                <span className="bag-icon">🛍️</span>
                {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
              </Link>
            </>
          ) : (
            <a href="#" className="auth" onClick={toggleModal}>Sign Up / Sign In</a>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="close-button" onClick={toggleModal}>×</button>
            <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>
            <p>Enjoy the convenience of a single account across all features.</p>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <p className="terms-text">
                By {isLogin ? 'logging in' : 'creating your account'}, you agree to our <span className="highlight">Terms and Conditions</span>
              </p>
              <button type="submit" className="continue-button">
                {isLogin ? "LOGIN" : "CONTINUE"}
              </button>
            </form>

            <p className="toggle-auth">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <span onClick={() => setIsLogin(!isLogin)} className="highlight">
                {isLogin ? " Sign Up" : " Sign In"}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
