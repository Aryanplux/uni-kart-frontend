import React, { useState, useEffect } from "react";
import {
  FaBell, FaSearch, FaCartPlus, FaShoppingBag, FaEnvelope, FaWallet, FaTrophy, FaCog, FaPlus
} from "react-icons/fa";
import "./Home.css";

const Home = ({ username = "User", profileData }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return document.body.classList.contains("dark");
  });

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
    setDarkMode(document.body.classList.contains("dark"));
    localStorage.setItem("darkMode", document.body.classList.contains("dark"));
  };

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    if (savedDarkMode) {
      document.body.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  return (
    <div className="home-fullscreen">
      {/* Dark Mode Toggle */}
      <button
        className="darkmode-fab"
        onClick={toggleDarkMode}
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-menu">
          <button className="sidebar-icon">☰</button>
          <button className="sidebar-icon"><FaCartPlus /></button>
          <button className="sidebar-icon"><FaShoppingBag /></button>
          <button className="sidebar-icon"><FaEnvelope /></button>
          <button className="sidebar-icon"><FaWallet /></button>
          <button className="sidebar-icon"><FaTrophy /></button>
          <button className="sidebar-icon"><FaCog /></button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-section">
        <div className="top-bar">
          <button className="notification-btn"><FaBell /></button>
          <div className="search-area">
            <input
              type="text"
              className="searchbar"
              placeholder="Search products and users"
            />
            <FaSearch className="search-icon" />
          </div>
        </div>
        <h2 className="trending-title">TRENDING</h2>
        <section className="feed-container">
          <div className="main-feed-card"></div>
          <div className="carousel-indicator">
            {[...Array(5)].map((_, idx) => (
              <span key={idx} className={`dot${idx === 0 ? " active" : ""}`} />
            ))}
          </div>
          <div className="product-row">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="mini-product-card" />
            ))}
            <div className="add-product-btn">
              <FaPlus />
              <span className="posted-count">4</span>
            </div>
          </div>
        </section>
      </main>

      {/* Right Panel */}
      <aside className="right-panel">
        <div className="profile-card">
          <div className="profile-pic" />
          <div className="profile-name">{username}</div>
          <div className="profile-lines" />
          <button className="view-btn">View</button>
          <div className="stars">
            {Array(5).fill().map((_, i) => <span key={i} className="star">★</span>)}
          </div>
          <button className="profile-action">Projects</button>
          <button className="profile-action">Certifications</button>
        </div>
        <div className="leaderboard-card">
          <div className="leaderboard-title">Leaderboard</div>
          <div className="leaderboard-row">
            <span className="lb-icon"></span> 
            <span className="lb-name">Salman Khan</span> 
            <span className="lb-score">120</span>
          </div>
          <div className="leaderboard-row">
            <span className="lb-icon"></span> 
            <span className="lb-name">Shah Rukh Khan</span> 
            <span className="lb-score">100</span>
          </div>
          <div className="leaderboard-row">
            <span className="lb-icon"></span> 
            <span className="lb-name">Tees Marr Khan</span> 
            <span className="lb-score">90</span>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Home;
