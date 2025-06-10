import React from "react";
import { Link } from "react-router-dom";
import "../styles/ProductCard.css";

function ProductCard({ id, titre, description, prix, image }) {
  return (
    <Link to={`/product/${id}`} className="product-card">
    <img src={`http://localhost:5000${image}`} alt={titre} className="product-image" />
      <h3 className="product-title">{titre}</h3>
      <p className="product-subtitle">{description}</p>
      <p className="product-price">${prix}</p>
    </Link>
  );
}

export default ProductCard;
