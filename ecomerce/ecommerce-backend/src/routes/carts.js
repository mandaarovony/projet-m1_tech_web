const express = require("express");
const router = express.Router();
const cartCtrl = require("../controller/cartController");

/**
 * @swagger
 * tags:
 *   name: Paniers
 *   description: Gestion des paniers (Carts)
 */

/**
 * @swagger
 * /api/carts:
 *   post:
 *     summary: Créer un panier avec des articles
 *     tags: [Paniers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     produitId:
 *                       type: integer
 *                     quantite:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Panier créé avec succès
 */
router.post("/", cartCtrl.creer);

/**
 * @swagger
 * /api/carts/{id}:
 *   get:
 *     summary: Récupérer un panier par ID
 *     tags: [Paniers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du panier à récupérer
 *     responses:
 *       200:
 *         description: Panier trouvé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       produitId:
 *                         type: integer
 *                       quantite:
 *                         type: integer
 */
router.get("/:id", cartCtrl.voir);
router.post("/checkout", cartCtrl.checkout);
module.exports = router;
