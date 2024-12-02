import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from "axios";
import { GiReturnArrow } from "react-icons/gi";
import { FcDownRight } from "react-icons/fc";

// Définition du composant EditFournisseur
export default function EditFournisseurclient() {
  // Extraction de l'id du fournisseur depuis les paramètres de l'URL
  const { id } = useParams();

  // Déclaration de l'état pour stocker les valeurs du formulaire et les erreurs
  const [values, setValues] = useState({
    name: '',
    nometprenom: '',
    adresse: '',
    dateajout: '',
    telephone: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Hook pour la navigation programmatique

  // useEffect pour récupérer les données du fournisseur lors du montage du composant
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APIserveur}/recupparidFrs/${id}`)
      .then(response => {
        if (response.data) {
          // Formatage de la date en format datetime-local
          const formattedDate = new Date(response.data.dateajout).toISOString().slice(0, 16);
          // Mise à jour de l'état avec les données récupérées
          setValues({ ...response.data, dateajout: formattedDate });
        } else {
          console.error('Fournisseur non trouvé');
          navigate('/listeFournisseurclient'); // Redirection en cas de fournisseur non trouvé
        }
      })
      .catch(err => console.error(err)); // Gestion des erreurs
  }, [id]);

  // Fonction de validation du formulaire
  const validate = () => {
    let errors = {};
    // Validation des champs requis
    if (!values.name.trim()) errors.name = "Le nom est requis";
    if (!values.nometprenom.trim()) errors.nometprenom = "Le prénom est requis";
    if (!values.adresse.trim()) errors.adresse = "L'adresse est requise";
    if (!values.telephone.trim()) errors.telephone = "Le téléphone est requis";
    if (!values.dateajout.trim()) errors.dateajout = "La date est requise";
    setErrors(errors);
    return Object.keys(errors).length === 0; // Retourne vrai si aucune erreur
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Prévenir le comportement par défaut du formulaire
    if (validate()) {
      axios.put(`${import.meta.env.VITE_APIserveur}/metajourlerecupererFrs/${id}`, values)
        .then(result => {
          console.log('Mise à jour réussie:', result);
          navigate('/listeFournisseurclient'); // Redirection après une mise à jour réussie
        })
        .catch(err => console.error('Erreur lors de la mise à jour:', err)); // Gestion des erreurs
    }
  };

  // Fonction pour gérer les changements d'entrée
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value }); // Mise à jour de l'état avec les nouvelles valeurs
  };

  return (
    <motion.div className="bg-gray-900 bg-center"
      style={{ backgroundImage: `url('/pictures/clientparleho.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      initial={{ opacity: 0 }} // Animation initiale
      animate={{ opacity: 1 }} // Animation lorsque le composant est visible
      exit={{ opacity: 0 }} // Animation lors de la sortie du composant
      transition={{ duration: 0.5 }} // Durée de la transition
    >
      <div className="justify-center">
        <Link to="/gestionfournisseurclient" className="animate-pulse mx-6 my-3 bg-pink-800 text-white font-serif font-bold p-2 rounded-full">
          <GiReturnArrow size={30} style={{ color: "blue" }} /> {/* Icône de retour */}
        </Link>
      </div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-gradient-to-br from-gray-100 to-gray-300 p-6 rounded-lg shadow-lg max-w-md w-full">
          <motion.form onSubmit={handleSubmit} className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            {/* Champ pour le nom du fournisseur */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-semibold">Nom du fournisseur</label>
              <input
                type="text"
                id="name"
                name="name"
                value={values.name}
                // onChange={handleInputChange}
                className={`w-full p-2 mt-1 rounded-lg focus:outline-none focus:ring-2 ${errors.name ? 'ring-red-500' : 'ring-blue-500'}`}
                placeholder="Entrez le nom du fournisseur"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>} {/* Affichage des erreurs */}
            </div>
            {/* Champ pour le prénom */}
            <div className="mb-4">
              <label htmlFor="nometprenom" className="block text-gray-700 font-semibold">Prénom</label>
              <input
                type="text"
                id="nometprenom"
                name="nometprenom"
                value={values.nometprenom}
                // onChange={handleInputChange}
                className={`w-full p-2 mt-1 rounded-lg focus:outline-none focus:ring-2 ${errors.nometprenom ? 'ring-red-500' : 'ring-blue-500'}`}
                placeholder="Entrez le prénom"
              />
              {errors.nometprenom && <p className="text-red-500 text-sm mt-1">{errors.nometprenom}</p>} {/* Affichage des erreurs */}
            </div>
            {/* Champ pour l'adresse */}
            <div className="mb-4">
              <label htmlFor="adresse" className="block text-gray-700 font-semibold">Adresse de l'entreprise</label>
              <input
                type="text"
                id="adresse"
                name="adresse"
                value={values.adresse}
                // onChange={handleInputChange}
                className={`w-full p-2 mt-1 rounded-lg focus:outline-none focus:ring-2 ${errors.adresse ? 'ring-red-500' : 'ring-blue-500'}`}
                placeholder="Entrez l'adresse"
              />
              {errors.adresse && <p className="text-red-500 text-sm mt-1">{errors.adresse}</p>} {/* Affichage des erreurs */}
            </div>
            {/* Champ pour le téléphone */}
            <div className="mb-4">
              <label htmlFor="telephone" className="block text-gray-700 font-semibold">Téléphone du fournisseur</label>
              <input
                type="number"
                id="telephone"
                name="telephone"
                value={values.telephone}
                // onChange={handleInputChange}
                className={`w-full p-2 mt-1 rounded-lg focus:outline-none focus:ring-2 ${errors.telephone ? 'ring-red-500' : 'ring-blue-500'}`}
                placeholder="Entrez le téléphone"
              />
              {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>} {/* Affichage des erreurs */}
            </div>
            {/* Champ pour la date d'enregistrement */}
            <div className="mb-4">
              <label htmlFor="dateajout" className="block text-gray-700 font-semibold">Date d'enregistrement</label>
              <input
                type="datetime-local"
                id="dateajout"
                name="dateajout"
                value={values.dateajout}
                // onChange={handleInputChange}
                className={`w-full p-2 mt-1 rounded-lg focus:outline-none focus:ring-2 ${errors.dateajout ? 'ring-red-500' : 'ring-blue-500'}`}
              />
              {errors.dateajout && <p className="text-red-500 text-sm mt-1">{errors.dateajout}</p>} {/* Affichage des erreurs */}
            </div>
            <div className="flex items-center justify-between">
              {/* Bouton de soumission */}
              <motion.button type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-pink-950 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150">
                <FcDownRight />
              </motion.button>
           
            </div>
          </motion.form>
        </div>
      </div>
    </motion.div>
  );
}
