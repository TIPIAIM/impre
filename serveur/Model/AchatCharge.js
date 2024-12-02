// models/Achatcharge.js

const mongoose = require('mongoose');

const AchatchargeSchema = new mongoose.Schema({
  idfourniseur: {
    type: mongoose.Schema.Types.ObjectId,
     ref: 'LesFournisseurs' , 
    
   },

   numfacture: {
    type : String,
  
  },
  categorie: {
    type : String,
  
  },
  
  dateajout: {
    type:Date,
  
  },
  nomservice: {
    type : String,

  },
  quantite: {
    type: Number,
 
  },
  
  montant: {
    type: Number,
    
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Achatchargemodel = mongoose.model('LesAchatcharge', AchatchargeSchema);

module.exports = Achatchargemodel;
