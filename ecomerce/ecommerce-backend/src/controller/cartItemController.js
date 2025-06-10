const { CartItem,Cart,Product } = require("../models");

// Ajouter un produit dans un panier
exports.ajouter = async (req, res) => {
    const { cartId, produitId, quantity } = req.body;
  
    try {
      
      const cart = await Cart.findByPk(cartId);
      if (!cart) {
        return res.status(404).json({ erreur: "Panier introuvable" });
      }
  
      
      const product = await Product.findByPk(produitId);
      if (!product) {
        return res.status(404).json({ erreur: "Produit introuvable" });
      }
  
    
      const existingItem = await CartItem.findOne({
        where: {
          cartId: cartId,
          produitId: produitId,
        },
      });
  
      if (existingItem) {
      
        existingItem.quantity += quantity;
        await existingItem.save();
        return res.status(200).json(existingItem);
      }
  
      
      const item = await CartItem.create({ cartId, produitId, quantity });
      res.status(201).json(item);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ erreur: "Erreur lors de l'ajout de l'article" });
    }
  };
  