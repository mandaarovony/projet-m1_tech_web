import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/Navbar.css";
import logo from "../assets/icon.png";
import bazary from "../assets/Frame 1166.png";

function Navbar() {
  const panier = useSelector((state) => state.panier);

  // ✅ Compter le nombre d'articles dans le panier
  const cartCount = panier.items.length;

  return (
    <header className="navbar">
      <Link to="/">
        <div className="logo">
          <img src={logo} alt="logo" className="log_img" /> SUN CO.
        </div>
      </Link>
      <Link to="/cart">
        <button className="cart-button">
          <img src={bazary} alt="logo" className="log_img" />
          View Cart
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </Link>
    </header>
  );
}

export default Navbar;
