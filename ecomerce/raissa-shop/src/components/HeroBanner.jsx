import React from "react";
import "../styles/HeroBanner.css";
import shoe from "../assets/Frame 1168.png"; 
import { Link } from "react-router-dom";
function HeroBanner() {
  return (
    <section className="hero-banner">
      <div className="hero-text">
        <p className="discount">25% OFF</p>
        <h1 className="hero-title">Summer Sale</h1>
        <p className="hero-subtitle">
          Discover our summer styles with discount
        </p>
        <Link to='/shop'>
        <button className="shop-button">Shop Now →</button>
        </Link>
      </div>

      <div className="hero-image">
      <Link to='/shop'>
        <img src={shoe} alt="Sneaker promo" />
        </Link>
      </div>
    </section>
  );
}

export default HeroBanner;
