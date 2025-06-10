const express = require("express");
const router = express.Router();
const cartItemCtrl = require("../controller/cartItemController");

/**
 * @swagger
 * tags:
 *   name: Articles du panier
 *   description: Gestion des articles dans les paniers
 */

/**
 * @swagger
 * /api/cart-item:
 *   post:
 *     summary: Ajouter un article à un panier existant
 *     tags: [Articles du panier]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cartId
 *               - produitId
 *               - quantite
 *             properties:
 *               cartId:
 *                 type: integer
 *               produitId:
 *                 type: integer
 *               quantite:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Article ajouté au panier avec succès
 *       400:
 *         description: Données invalides ou panier introuvable
 */
router.post("/", cartItemCtrl.ajouter);

module.exports = router;
