import { useNavigate } from "react-router-dom"; // Import de useNavigate
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ajouterAuPanier,
  retirerDuPanier,
  augmenterQuantite,
  diminuerQuantite,
  viderPanier,
  setPanierId,
} from "../redux/panierSlice";
import "../styles/Cart.css";
import axios from "axios";

function Cart() {
  const panier = useSelector((state) => state.panier); // panier est un objet { panierId, items }
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook pour la navigation

  const handleRemove = (id) => {
    dispatch(retirerDuPanier(id));
  };

  const handleIncrease = (id) => {
    dispatch(augmenterQuantite(id));
  };

  const handleDecrease = (id) => {
    dispatch(diminuerQuantite(id));
  };

  const handleCheckout = async () => {
    try {
      if (panier.items.length === 0) {
        return alert("Votre panier est vide.");
      }

      // Envoi vers le backend pour le checkout
      const response = await axios.post("http://localhost:5000/api/carts/checkout", {
        cartId: panier.panierId,
        items: panier.items,
      });

      if (response.status === 200) {
        // Nettoyage Redux après checkout
        dispatch(viderPanier());

        // Optionnel : Créer un nouveau panier immédiatement
        const res = await axios.post("http://localhost:5000/api/carts");
        dispatch(setPanierId(res.data.id));

        alert("Commande validée avec succès !");

        // Redirection vers la page d'accueil après confirmation
        navigate("/"); // Redirection vers la route "/"
      }
    } catch (error) {
      console.error("Erreur lors du checkout :", error);
      alert("Erreur lors du checkout.");
    }
  };

  const subtotal = panier.items.reduce(
    (total, item) => total + item.prix * item.quantity,
    0
  );
  const shipping = 20.0;
  const tax = 6.0;
  const discount = 6.0;
  const total = subtotal + shipping + tax - discount;

  if (panier.items.length === 0) {
    return (
      <main className="cart-page">
        <h1>Your Bag</h1>
        <p>Votre panier est vide.</p>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <h1>Your Bag</h1>
      <div className="cart-container">
        <div className="cart-items">
          {panier.items.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={`http://localhost:5000${item.image}`} alt={item.titre} />
              <div className="cart-item-details">
                <h3>{item.titre}</h3>
                <p>{item.description}</p>
                <p>${item.prix}</p>

                <div className="quantitys">
                  <label>Quantity</label>
                  <div className="quantitys-control">
                    <button onClick={() => handleDecrease(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrease(item.id)}>+</button>
                  </div>
                </div>

                <button onClick={() => handleRemove(item.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Summary</h2>
          <div className="summary-line">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>Shipping and delivery</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout <span>→</span>
          </button>
        </div>
      </div>
    </main>
  );
}

export default Cart;
