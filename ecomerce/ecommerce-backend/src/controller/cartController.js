const { Cart, CartItem, Product } = require("../models");

// Créer un panier vide
exports.creer = async (req, res) => {
  try {
    const cart = await Cart.create();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ erreur: "Erreur lors de la création du panier" });
  }
};

// Voir un panier avec ses items
exports.voir = async (req, res) => {
  try {
    const cart = await Cart.findByPk(req.params.id, {
      include: {
        model: CartItem,
        as: "items",
        include: Product,
      },
    });
    if (!cart) return res.status(404).json({ erreur: "Panier introuvable" });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ erreur: "Erreur lors de la récupération du panier" });
  }
};

// Valider un panier sans créer de commande
exports.checkout = async (req, res) => {
  try {
    const { cartId, items } = req.body;

    if (!cartId || !items || items.length === 0) {
      return res.status(400).json({ error: "Panier invalide" });
    }

    const total = items.reduce((acc, item) => acc + item.prix * item.quantity, 0);
    const shipping = 20;
    const tax = 6;
    const discount = 6;

    const totalFinal = total + shipping + tax - discount;

    return res.status(200).json({
      message: "Résumé du panier",
      sousTotal: total,
      shipping,
      tax,
      discount,
      total: totalFinal,
    });
  } catch (error) {
    console.error("Erreur lors du checkout:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};
