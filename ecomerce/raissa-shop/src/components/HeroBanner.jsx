import React from "react";
import "../styles/HeroBanner.css";
import shoe from "../assets/Frame 1168.png"; // tu peux modifier le chemin si nécessaire

function HeroBanner() {
  return (
    <section className="hero-banner">
      <div className="hero-text">
        <p className="discount">25% OFF</p>
        <h1 className="hero-title">Summer Sale</h1>
        <p className="hero-subtitle">
          Discover our summer styles with discount
        </p>
        <button className="shop-button">Shop Now →</button>
      </div>

      <div className="hero-image">
        <img src={shoe} alt="Sneaker promo" />
      </div>
    </section>
  );
}

export default HeroBanner;
