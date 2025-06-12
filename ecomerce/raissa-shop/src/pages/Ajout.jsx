import React, { useState } from "react";
import axios from "axios";
import "../styles/ajout.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function AjouterProduit() {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();

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

 
    setTitre("");
    setDescription("");
    setPrix("");
    setImage(null);


    Swal.fire({
      icon: "success",
      title: "Succès",
      text: "Produit ajouté avec succès !",
      timer: 2000,
      showConfirmButton: false,
    });


    setTimeout(() => {
      navigate("/"); 
    }, 2000);

  } catch (error) {
    console.error(error);

  
    Swal.fire({
      icon: "error",
      title: "Erreur",
      text: "Une erreur est survenue lors de l'ajout du produit.",
    });
  }
};

  return (
   <div className="ajout-container">
  <h2 className="ajout-title">Ajouter un produit</h2>
  <form onSubmit={handleSubmit} className="ajout-form">
    <div className="form-group">
      <label className="form-label">Titre :</label>
      <input
        type="text"
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
        required
        className="form-input"
      />
    </div>

    <div className="form-group">
      <label className="form-label">Description :</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="form-input"
      />
    </div>

    <div className="form-group">
      <label className="form-label">Prix :</label>
      <input
        type="number"
        value={prix}
        onChange={(e) => setPrix(e.target.value)}
        required
        className="form-input"
      />
    </div>

    <div className="form-group">
      <label className="form-label">Image :</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="form-input"
      />
    </div>

    <button type="submit" className="submit-button">Ajouter</button>
  </form>

  {message && <p className="form-message">{message}</p>}
</div>

  );
}

export default AjouterProduit;
