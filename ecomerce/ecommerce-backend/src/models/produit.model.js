const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Produit = sequelize.define("Produit", {
  titre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  prix: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    required: false,
  },
});

module.exports = Produit;
