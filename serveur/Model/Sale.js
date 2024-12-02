// models/Sale.js

const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
     ref: 'LesClients' , 
    
   },

  produitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  
  },
  
  dateajout: {
    type:Date,
  
  },
  produit: {
    type : String,

  },
  quantite: {
    type: Number,
 
  },
  
  moyenpayement: {
    type: String,
   
  },
  montant: {
    type: Number,
    
  },
  montantPaye: {
    type: Number,
   
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
