import React, { useEffect, useState } from "react";
import axios from "axios";

import HeroBanner from "../components/HeroBanner.jsx";
import ProductCard from "../components/ProductCard.jsx";

function Home() {
  const [products, setProducts] = useState([]);

  // Récupérer les produits depuis l'API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/produits") 
      .then((response) => {

        setProducts(response.data);  
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des produits", error);
      });
  }, []);

  return (
    <main
  style={{
    padding: "0 40px",
    maxWidth: "1700px",
    margin: "0 auto",
  }}
>
  <HeroBanner />

  <section style={{ marginTop: "60px" }}>
    <h2
      style={{
        fontSize: "38px",
        marginBottom: "20px",
        marginLeft: "20px",
        fontFamily: "Inter",
        fontWeight: "bold",
      }}
    >
      Explore our latest drops
    </h2>

    <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  }}
>
  {products.slice(0, 4).map((p, i) => (
    <ProductCard key={i} {...p} />
  ))}
</div>

  </section>
</main>

  );
}

export default Home;
