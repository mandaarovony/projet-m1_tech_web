import React, { useState } from "react";
import axios from "axios";
import "../styles/ajout.css";
function AjouterProduit() {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Préparer FormData pour envoyer image + champs
    const formData = new FormData();
    formData.append("titre", titre);
    formData.append("description", description);
    formData.append("prix", prix);
    if (image) formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/produits",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage("Produit ajouté avec succès !");
      // reset form
      setTitre("");
      setDescription("");
      setPrix("");
      setImage(null);
    } catch (error) {
      setMessage("Erreur lors de l'ajout du produit.");
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>Ajouter un produit</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre :</label>
          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description :</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Prix :</label>
          <input
            type="number"
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Image :</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button type="submit">Ajouter</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default AjouterProduit;
