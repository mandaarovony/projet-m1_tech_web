const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const { sequelize } = require("./src/models");
const createDatabaseIfNotExists = require('./src/config/creerbase');

const produitRoutes = require("./src/routes/produits");
const cartRoutes = require("./src/routes/carts");
const cartItemRoutes = require("./src/routes/cartItem");
const startServer = async () => {
  await createDatabaseIfNotExists(); // Vérifie ou /crée la base

  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use('/uploads', express.static('uploads'));
  app.use("/api/produits", produitRoutes);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use("/api/carts", cartRoutes);
  app.use("/api/cart-item", cartItemRoutes);
  // Synchronisation des modèles Sequelize
  await sequelize.sync();

  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
    console.log(`📘 Swagger disponible sur http://localhost:${PORT}/api-docs`);
  });
};

startServer();
