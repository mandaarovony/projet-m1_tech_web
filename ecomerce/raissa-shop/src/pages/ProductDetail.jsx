import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ajouterAuPanier, setPanierId } from "../redux/panierSlice";
import "../styles/ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const panierId = useSelector((state) => state.panier.panierId);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log(`🔍 Récupération du produit avec id: ${id}`);
        const res = await axios.get(`http://localhost:5000/api/produits/${id}`);
        setProduct(res.data);
        console.log("✅ Produit récupéré :", res.data);
      } catch (err) {
        console.error("❌ Erreur lors du chargement du produit", err);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!panierId) {
      console.log("🛒 Aucun panier trouvé, création en cours...");
      axios
        .post("http://localhost:5000/api/carts")
        .then((response) => {
          console.log("✅ Panier créé avec succès :", response.data);
          dispatch(setPanierId(response.data.id));
        })
        .catch((error) =>
          console.error("❌ Erreur lors de la création du panier", error)
        );
    } else {
      console.log(`✅ Panier déjà existant : ID = ${panierId}`);
    }
  }, [panierId, dispatch]);

  const handleAddToCart = () => {
    if (!panierId) {
      console.error("❌ Aucun panier disponible, produit non ajouté.");
      return;
    }

    console.log("📦 Ajout du produit au panier...");
    console.log({
      cartId: panierId,
      produitId: product.id,
      quantity,
    });

    axios
      .post("http://localhost:5000/api/cart-item", {
        cartId: panierId,
        produitId: product.id,
        quantity,
      })
      .then((response) => {
        console.log("✅ Produit ajouté dans la base :", response.data);
        dispatch(ajouterAuPanier({ ...product, quantity }));
      })
      .catch((error) => {
        console.error("❌ Erreur lors de l'ajout au panier :", error);
      });
  };

  if (!product) return <p>Chargement du produit...</p>;

  return (
    <main className="product-detail">
      <section className="top-section">
        <div className="left">
          <img src={`http://localhost:5000${product.image}`} alt={product.titre} />
          <div className="dots">
            <span className="dot active" />
            <span className="dot" />
            <span className="dot" />
          </div>
        </div>

        <div className="right">
          <h1>{product.titre}</h1>
          <h2>{product.description}</h2>
          <p className="price">${product.prix}</p>

          <div className="quantity">
            <label className="texto">Quantity</label>
            <div className="quantity-control">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          <button className="add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </section>

      <section className="bottom-section">
        <div className="description">
          <h3>Description</h3>
          <p>{product.description}</p>
          <ul>
            <li>Produit de qualité</li>
            <li>Livraison rapide</li>
            <li>Garantie 1 an</li>
          </ul>
        </div>
        <img
          src={`http://localhost:5000${product.image}`}
          alt="alternative product"
          className="alt-image"
        />
      </section>
    </main>
  );
}

export default ProductDetail;
