const { Product } = require("../models");
const upload = require('../config/multer');
exports.tous = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des produits", error });
  }
};

exports.unProduit = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Produit non trouvé" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Erreur", error });
  }
};
exports.supprimer = async (req, res) => {
  try {
    const id = req.params.id;
    const produit = await Product.findByPk(id);

    if (!produit) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    await produit.destroy();
    res.status(200).json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du produit", error });
  }
};

exports.creer = [
  upload.single('image'), 
  async (req, res) => {
    try {
      const { titre, description, prix } = req.body;
      let imageUrl = null;


      if (req.file) {
        imageUrl = `/uploads/${req.file.filename}`;
      }

      const product = await Product.create({ titre, description, prix, image: imageUrl });
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la création du produit", error });
    }
  }
];
