const mongoose= require('mongoose')

const AjouterFournisseurdanslaBDSchema = new mongoose.Schema({//les champs identiques a notre formulaire
   
    name: { type : String, required: true},
    nometprenom: { type : String, required: true},
    dateajout :  { type : Date, required: true},
    telephone :  { type : String},
    adresse :  { type : String},
    solde: { type : String },
  
   
})// 'Lesclientenregistree: cest nouvelle table qu'il va creer dans la bd' on met le nom qu'on v sa sera dans la base
const AjouterFournisseurdanslaBDModel = mongoose.model("LesFournisseur",AjouterFournisseurdanslaBDSchema )//la table "LesclientTab"

//on exporte maintenant le module puis importons dans le serveur 
module.exports = AjouterFournisseurdanslaBDModel