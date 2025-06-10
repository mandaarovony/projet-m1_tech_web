const sequelize = require("../config/db");
const Product = require("./produit.model");
const Cart = require("./cart.model");
const CartItem = require("./cartItem.model");

// Relations
Cart.hasMany(CartItem, { foreignKey: "cartId", as: "items" });
CartItem.belongsTo(Cart, { foreignKey: "cartId" });

Product.hasMany(CartItem, { foreignKey: "produitId" });
CartItem.belongsTo(Product, { foreignKey: "produitId" });

module.exports = {
  sequelize,
  Product,
  Cart,
  CartItem
};
