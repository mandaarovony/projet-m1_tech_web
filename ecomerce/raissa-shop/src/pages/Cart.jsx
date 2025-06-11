import { useNavigate } from "react-router-dom"; 
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
import Swal from 'sweetalert2';

function Cart() {
  const panier = useSelector((state) => state.panier);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

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

        dispatch(viderPanier());

       
        const res = await axios.post("http://localhost:5000/api/carts");
        dispatch(setPanierId(res.data.id));

      
        Swal.fire({
          title: 'Succès !',
          text: 'Commande validée avec succès !.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        navigate("/"); 
      }
    } catch (error) {
      console.error("Erreur lors du checkout :", error);
        
      Swal.fire({
        title: 'Erreur !',
        text: 'Erreur lors du checkout!.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    
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
        <h1 className="hA">Your Bag</h1>
        <p className="para">Votre panier est vide.</p>
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
