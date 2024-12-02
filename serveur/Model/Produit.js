const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // 'unique: true' pour éviter les doublons de nom de produit
  quantity: { type: Number, required: true, min: 0 }, // Quantité en stock, ne peut pas être négative
  price: { type: Number, min: 0 } // Le prix ne peut pas être négatif
});

// Middleware pour gérer la mise à jour des quantités et autres règles si nécessaire

module.exports = mongoose.model('Produit', produitSchema);
