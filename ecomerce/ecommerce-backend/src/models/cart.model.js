const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Cart = sequelize.define("Cart", {

}, {
  timestamps: true
});

module.exports = Cart;
