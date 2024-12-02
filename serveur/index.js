const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require("bcryptjs")//pour la comparaison des codes pour authentification
const jwt = require('jsonwebtoken')
const cookieparser = require('cookie-parser')

const EnregistrementdanslaBDModel = require("./Model/EnregistrerdanslaDB")//on a importé le model utilisons le dans post mainte
const AjouterClientsdanslaBDModel = require('./Model/GestAjoutClientsdanslaDB')
const AjouterFournisseurdanslaBDModel = require('./Model/GestAjoutFournisseurdanslaDB')
const Sale = require('./Model/Sale')
const Achatchargemodel = require('./Model/AchatCharge')
const Produit = require('./Model/Produit')


require('dotenv').config();
const PORT = process.env.PORT 
const DB = process.env.DB;
const FRONTEND= process.env.FRONTEND
const MESROUTES=  process.env.MESROUTES
const app = express()

app.use("/files", express.static("files"))//pour rendre louverture du fichier static pour que sa soit accessible nimporte ou puis envoyé les données

app.use(express.json())
app.use(cors({
  origin: [FRONTEND],//l'adesse de notre front
  methodes: [MESROUTES],  //les mothodes
  credentials: true //les info d'identification qui devrait etre vrai
}))
app.use(cookieparser())
app.use("/files", express.static("files"))//pour le fichier pourpouvoir l'ouvrir ou on v
//sa creer une base de donnée directement en se basan sur le 27017 dans mongo et lui donne le nom "CabinetDonne"
mongoose.connect(DB);//connextion local puis le nom de la base donnée


//seconnecte , ajout de jwt pour ns generer les jeton
app.post("/seconnecter", (req, res) => {
  const { email, password } = req.body;
  
  EnregistrementdanslaBDModel.findOne({ email: email })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            const token = jwt.sign({ email: user.email, role: user.role }, "jwt-secret-key", { expiresIn: '1d' });
            res.cookie("token", token);

            // Redirection en fonction du rôle
            let redirectUrl;
            switch (user.role) {
              case 'admin':
                redirectUrl = `${FRONTEND}/admindasboardgenerale`;
                break;
              case 'client':
                redirectUrl = `${FRONTEND}/admindasboardgenerale`;
                break;
              case 'visiteur':
                redirectUrl = `${FRONTEND}/adminfils`;
                break;
              default:
                redirectUrl = FRONTEND;
            }


            res.json({ message: "Success", redirectUrl });
          } else {
            res.json({ message: "Le mot de passe n'est pas correct" });
          }
        });
      } else {
        res.json({ message: "Utilisateur non trouvé" });
      }
    });
});

//senregistrer pour pouvoir se 
app.post("/EnregistrerdanslaDB", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Vérifier si l'email est déjà utilisé
    const existingUser = await EnregistrementdanslaBDModel.findOne({ email: email });
    if (existingUser) {
      // Répondre avec une erreur si l'email est déjà utilisé
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    // Hacher le mot de passe avant de le stocker
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Créer un nouvel utilisateur dans la base de données
    const newUser = await EnregistrementdanslaBDModel.create({ name, email, password: hashedPassword, role });

    // Répondre avec les détails de l'utilisateur créé
    res.json(newUser);
  } catch (err) {
    // En cas d'erreur lors de l'enregistrement
    res.status(500).json({ message: "Erreur d'enregistrement", error: err.message });
  }
});
//le code qui verifie le mail et mot de passe pourquil se connect  EnregistrementdanslaBDModel.create({ name, email, password: hash, role })

app.get("/Listeutilisteur", (req, res) => {//afficher la liste de nos enregistrement
 EnregistrementdanslaBDModel.find({})
    .then(lesenregistrees => res.json(lesenregistrees))
    .catch(err => res.json(err))
})//recupere par id 

//








// 'GestAjoutClientdanslaDB' on va lui metre dans axions de front
app.post("/AjoutClient", (req, res) => {//creons le model dans le serveur donc la route qui contient la table 'LesclientTab'
  AjouterClientsdanslaBDModel.create(req.body)
    .then(LesClients => res.json(LesClients))// "LesclientTab : cest la nouvel table qu'il creer rans la base de donne" ce quon a mis dans le module en bas rappele vous
    .catch(err => res.json(err))
})//recuere tous les enregistrements de la base de données
app.get("/Listeclients", (req, res) => {//afficher la liste de nos enregistrement
  AjouterClientsdanslaBDModel.find({})
    .then(LesClients => res.json(LesClients))
    .catch(err => res.json(err))
})//recupere par id 

app.get("/recupparidClient/:id", (req, res) => {//afficher la liste de nos enregistrement
  const id = req.params.id
  AjouterClientsdanslaBDModel.findById({ _id: id })
    .then(LesClients => res.json(LesClients))
    .catch(err => res.json(err))
})//pour modifier on ajoute le put 
//pour modifier on ajoute le put "chemin de mise a jour (e)" 
//en clican sur le bouton modifier sur la liste il nous dirrigera vers useeffet qui est aussi dans c formulaire 
// apres modica dans le formulaire il stock puis il remet la nouvel dans la liste//
//prendre par id e laficher dans un formulaire pou la modif
app.put("/MetajourlerecupererClient/:id", (req, res) => {//afficher la liste de nos enregistrement
  const id = req.params.id
  AjouterClientsdanslaBDModel.findByIdAndUpdate({ _id: id }, {
    name: req.body.name,
    nometprenom: req.body.nometprenom,
    dateajout: req.body.dateajout,
    telephone: req.body.telephone,
    adresse: req.body.adresse,
    solde: req.body.solde,
  })
    .then(LesClients => res.json(LesClients))
    .catch(err => res.json(err))
})//supprimer
//pour suprimer un element 
app.delete("/deleteclient/:id", (req, res) => {
  const id = req.params.id
  
  AjouterClientsdanslaBDModel.findByIdAndDelete({ _id: id })
    .then(LesClients => res.json(LesClients))
    .catch(err => res.json(err))
})




//_______________________________________________ Les Fournisseurs ____________________________________________


app.post("/ajoutFournisseur", (req, res) => {
  AjouterFournisseurdanslaBDModel.create(req.body)
    .then(LesFournisseurs => res.json(LesFournisseurs))
    .catch(err => res.json(err))
})//recup la liste
app.get("/listeFournisseur", (req, res) => {//afficher la liste de nos enregistrement
  AjouterFournisseurdanslaBDModel.find({})
    .then(LesFournisseurs => res.json(LesFournisseurs))
    .catch(err => res.json(err))
})

app.get("/recupparidFrs/:id", (req, res) => {
  const id = req.params.id;
  AjouterFournisseurdanslaBDModel.findById(id) // Pas besoin d'object, juste l'ID suffit
    .then(LesFournisseurs => {
      if (!LesFournisseurs) {
        return res.status(404).json({ message: "Fournisseur non trouvé" });
      }
      res.json(LesFournisseurs);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

app.put("/metajourlerecupererFrs/:id", (req, res) => {
  const id = req.params.id;
  AjouterFournisseurdanslaBDModel.findByIdAndUpdate(
    id, // Juste l'ID suffit ici aussi
    {
      name: req.body.name,
      nometprenom: req.body.nometprenom,
      telephone: req.body.telephone,
      dateajout: req.body.dateajout,
      adresse: req.body.adresse,
      solde: req.body.solde,
    },
    { new: true, runValidators: true } // options pour retourner le document mis à jour et valider les données
  )
    .then(LesFournisseurs => {
      if (!LesFournisseurs) {
        return res.status(404).json({ message: "Fournisseur non trouvé" });
      }
      res.json(LesFournisseurs);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

app.delete("/deleteFournisseur/:id", (req, res) => {
  const id = req.params.id
  AjouterFournisseurdanslaBDModel.findByIdAndDelete({ _id: id })
    .then(LesFournisseurs => res.json(LesFournisseurs))
    .catch(err => res.json(err))
})

//_________________________________________________________________________________


//_____________________________Achat ou charge__________________________________________________________

app.post("/ajoutachatoucharge", (req, res) => {
  Achatchargemodel.create(req.body)
    .then(LesAchatcharge => res.json(LesAchatcharge))
    .catch(err => res.json(err))
})//recup la liste
app.get("/listeachatoucharge", (req, res) => {//afficher la liste de nos enregistrement
  Achatchargemodel.find({})
    .then(LesAchatcharge => res.json(LesAchatcharge))
    .catch(err => res.json(err))
})
app.delete("/deleteachatoucharge/:id", (req, res) => {
  const id = req.params.id
  Achatchargemodel.findByIdAndDelete({ _id: id })
    .then(LesAchatcharge => res.json(LesAchatcharge))
    .catch(err => res.json(err))
})
//___________________________________________________________________________________


//_______________________Ajouter dans le stock ___________________________________
// Route pour ajouter un produit ou mettre à jour sa quantité
app.post("/produit", async (req, res) => {
  const { name, quantity, price } = req.body;

  try {
    // Vérifier si un produit avec le nom donné existe déjà dans la base de données
    let produit = await Produit.findOne({ name });

    if (produit) {
      // Si le produit existe déjà, mettre à jour la quantité
      produit.quantity += quantity; // Ajouter la quantité reçue à la quantité existante
      await produit.save(); // Sauvegarder les modifications dans la base de données
      res.json({ message: 'Quantité mise à jour avec succès', produit }); // Réponse au client
    } else {
      // Si le produit n'existe pas, créer un nouveau produit
      produit = new Produit({ name, quantity, price });
      await produit.save(); // Sauvegarder le nouveau produit dans la base de données
      res.json({ message: 'Produit ajouté avec succès', produit }); // Réponse au client
    }
  } catch (err) {
    // En cas d'erreur, retourner une réponse avec un code d'état 500 et le message d'erreur
    res.status(500).json({ message: err.message });
  }
});

// Route pour mettre à jour un produit existant par son ID
app.put('/produit/:id', async (req, res) => {
  try {
    const { id } = req.params; // Récupérer l'ID du produit à mettre à jour à partir des paramètres de l'URL
    const { name, quantity, price } = req.body; // Récupérer les nouvelles données du produit à partir du corps de la requête

    // Trouver le produit par ID et mettre à jour ses données avec les nouvelles valeurs
    const updatedProduit = await Produit.findByIdAndUpdate(
      id,
      { name, quantity, price },
      { new: true } // Retourner le produit mis à jour
    );

    if (!updatedProduit) {
      // Si aucun produit n'est trouvé avec cet ID, retourner une réponse avec un code d'état 404
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    // Réponse avec le produit mis à jour
    res.json({ message: 'Produit mis à jour avec succès', updatedProduit });
  } catch (err) {
    // En cas d'erreur, retourner une réponse avec un code d'état 500 et le message d'erreur
    res.status(500).json({ message: err.message });
  }
});

// Route pour lister tous les produits ou rechercher par nom
app.get('/produits', async (req, res) => {
  try {
    const { name } = req.query; // Récupérer le nom du produit à partir des paramètres de requête
    let produits;

    if (name) {
      // Si un nom est fourni dans les paramètres de requête, rechercher les produits par nom
      produits = await Produit.find({ name: new RegExp(name, 'i') }); // Utiliser une expression régulière pour une recherche insensible à la casse
    } else {
      // Sinon, récupérer tous les produits de la base de données
      produits = await Produit.find();
    }

    // Réponse avec la liste des produits trouvés
    res.json(produits);
  } catch (err) {
    // En cas d'erreur, retourner une réponse avec un code d'état 500 et le message d'erreur
    res.status(500).json({ message: err.message });
  }
});

//________________________________________________________________________________________-

//_____________________ Route pour ajouter une vente______________________________________

// Route pour ajouter une vente
app.post('/ventes', async (req, res) => {
  const {produitId,produit,dateajout,quantite,moyenpayement, clientId, montant, montantPaye } = req.body;

  try {
    // Trouver le produit par son ID
    const product = await Produit.findById(produitId);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    // Vérifier si la quantité disponible est suffisante
    if (product.quantity < quantite) {
      return res.status(400).json({ message: 'Quantité en stock insuffisante' });
    }

    // Créer une nouvelle vente
    const sale = new Sale({ produitId,produit,dateajout,quantite, moyenpayement, clientId, montant, montantPaye});
    await sale.save();

    // Mettre à jour la quantité de produit
    product.quantity -= quantite;
    await product.save();

    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement de la vente', error: error.message });
  }
});


//recup la liste
app.get("/listesale", (req, res) => {//afficher la liste de nos enregistrement
  Sale.find({})
    .then(Sale => res.json(Sale))
    .catch(err => res.json(err))
})// ici on ne travaillera qu'avec le formulaire de mise a jour "pour recuperer et modifier puis stocker"
//recupere par id  "useEffect" dans la liste le formulaire apar ou serons les autre champs pour modifier sa amene les doné dans se formulaire et modifier
app.get("/recupparidsale/:id", (req, res) => {//afficher la liste de nos enregistrement
  const id = req.params.id
  Sale.findById({ _id: id })
    .then(Sale => res.json(Sale))
    .catch(err => res.json(err))
})//pour modifier on ajoute le put "chemin de mise a jour (e)" 
//en clican sur le bouton modifier sur la liste il nous dirrigera vers useeffet qui est aussi dans c formulaire 
// apres modica dans le formulaire il stock puis il remet la nouvel dans la liste//
//prendre par id e laficher dans un formulaire pou la modif
app.put("/MetajourlerecupererSale/:id", (req, res) => {//afficher la liste de nos enregistrement
  const id = req.params.id
  Sale.findByIdAndUpdate({ _id: id }, {
    quantite: req.body.quantite,
    produitId: req.body.produitId,
    produit: req.body.produit,
    clientId: req.body.clientId,
    moyenpayement: req.body.moyenpayement,
    dateajout: req.body.dateajout,
    montant: req.body.montant,
    montantPaye: req.body.montantPaye,
    date: req.body.date,
  })
    .then(Sale => res.json(Sale))
    .catch(err => res.json(err))
})//supprimer
app.delete("/deletesale/:id", (req, res) => {
  const id = req.params.id
  Sale.findByIdAndDelete({ _id: id })
    .then(Sale => res.json(Sale))
    .catch(err => res.json(err))
})
//________________________________________________________________________________________




//________________________________________________________________________________________







app.listen(PORT, () => {
  console.log(` le serveur es lancé a ${PORT}`)
})
