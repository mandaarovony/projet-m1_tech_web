const express = require("express");
const router = express.Router();
const productCtrl = require("../controller/produitController");

/**
 * @swagger
 * tags:
 *   name: Produits
 *   description: Gestion des produits
 */

/**
 * @swagger
 * /api/produits:
 *   get:
 *     summary: Obtenir tous les produits
 *     tags: [Produits]
 *     responses:
 *       200:
 *         description: Liste des produits récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   titre:
 *                     type: string
 *                   prix:
 *                     type: number
 *                   description:
 *                     type: string
 */
router.get("/", productCtrl.tous);

/**
 * @swagger
 * /api/produits:
 *   post:
 *     summary: Créer un nouveau produit
 *     tags: [Produits]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titre
 *               - prix
 *             properties:
 *               titre:
 *                 type: string
 *               prix:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Produit créé avec succès
 */
router.post("/", productCtrl.creer);


router.get("/:id", productCtrl.unProduit);
router.delete("/:id", productCtrl.supprimer);
module.exports = router;
