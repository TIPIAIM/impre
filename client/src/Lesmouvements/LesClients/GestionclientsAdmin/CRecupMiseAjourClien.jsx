import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";  
import axios from "axios"; 
import { BsSendCheckFill } from "react-icons/bs";

export default function CMiseajourAjoutClient() {
  // Récupération de l'ID à partir des paramètres de l'URL.
  const { id } = useParams();
  
  // Déclaration des états locaux pour gérer les valeurs du formulaire.
  const [name, setName] = useState('');
  const [nometprenom, setnometprenom] = useState('');
  const [dateajout, setDateajout] = useState('');
  const [telephone, settelephone] = useState('');
  const [adresse, setadresse] = useState('');
  const [solde, setsolde] = useState('');

  // Hook pour la navigation programmatique.
  const navigate = useNavigate();

  // useEffect pour récupérer les données d'audience spécifique lorsque l'ID change.
  useEffect(() => {
    // Requête GET pour récupérer les informations d'audience par ID.
    axios.get(`${import.meta.env.VITE_APIserveur}/recupparidClient/`+ id )
      .then(result => { 
        // Déstructuration des données récupérées pour mettre à jour les états.
        console.log(result);
        const { name, nometprenom, dateajout, telephone, adresse, solde } = result.data;
        setName(name);
        setnometprenom(nometprenom);
        setDateajout(formatDate(dateajout)); // Formate la date pour un affichage lisible.
        settelephone(telephone);
        setadresse(adresse);
        setsolde(solde);
      })
      .catch(err => console.log(err)); // Affiche les erreurs éventuelles dans la console.
  }, [id]); // Dépendance sur l'ID pour déclencher l'effet à chaque changement de l'ID.

  // Fonction pour formater la date en un format lisible (jour/mois/année, heure:minute).
  const formatDate = (dateString) => {
    const date = new Date(dateString); // Conversion de la chaîne de date en objet Date.
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('fr-FR', options).replace(',', ' à'); // Retourne la date formatée.
  };

  // Fonction de gestion de la soumission du formulaire pour mettre à jour les informations d'audience.
  const MiseAjour = (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire (rechargement de la page).
    // Requête PUT pour mettre à jour les données de l'audience par ID.
   
    axios.put(`${import.meta.env.VITE_APIserveur}/MetajourlerecupererClient/`+ id, { name, nometprenom, dateajout, telephone, adresse, solde })
      .then(result => {
        console.log(result);
        navigate('/listeclient'); // Redirige vers la liste des audiences après la mise à jour.
      })
      .catch(err => console.log(err)); // Affiche les erreurs éventuelles dans la console.
  };

  return (
    <div
      style={{
        backgroundImage: `url('/pictures/clientparleho.jpg')`, // Image de fond pour le conteneur.
        backgroundSize: 'cover', // L'image couvre tout le conteneur.
        backgroundPosition: 'center', // L'image est centrée.
      }}
      className="min-h-screen flex items-center justify-center" // Classe pour centrer le contenu.
    >
      <div className="bg-gradient-to-l from-slate-950 p-4 rounded shadow-md w-full max-w-md">
        {/* Formulaire pour mettre à jour les informations de l'audience. */}
        <form onSubmit={MiseAjour}>
        <div className="flex justify-center items-center">

          <div className="mb-4">
            <input
              type="text"
              id="name"
              className="container text-center p-1 font-semibold font-serif bg-gray-500  input-field"
              required
              placeholder="N° du compte " // Texte de remplacement pour l'entrée.
              value={name} // Valeur liée à l'état `name`.
             onChange={e => setName(e.target.value)} // Mise à jour de l'état `name` lors de la modification.
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="dateajout"
              required
              placeholder="Date et heure prévue"
              className="container text-center p-1 font-semibold font-serif bg-gray-50  input-field"
              value={dateajout}
              // Suppression de la ligne `onChange` car la date est récupérée directement du serveur et affichée.
              // Cela empêche la modification directe par l'utilisateur.
            />
          </div>
      </div>

          <div className="mb-4">
            <input
              type="text"
              id="nometprenom"
              className="container p-1 font-semibold font-serif text-center bg-gray-200 rounded-xl input-field"
              required
              placeholder="Nom et prenom"
              value={nometprenom}
              onChange={e => setnometprenom(e.target.value)}
            />
          </div>

        
          <div className="flex justify-center items-center">

          <div className="mb-4">
            <input
              type="text"
              id="telephone"
              placeholder="Telephone"
              value={telephone}
              onChange={e => settelephone(e.target.value)}
             className="container p-1 font-semibold font-serif text-center bg-gray-300  input-field"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              id="adresse"
              placeholder="Adresse"
              className="container p-1 font-semibold font-serif bg-gray-50 text-center input-field"
              value={adresse}
              onChange={e => setadresse(e.target.value)}
            />
          </div>
</div>
          <button className="bg-blue-950 text-white py-2 px-4  hover:bg-gray-500 focus:outline-none focus:ring focus:border-blue-500">
            <  BsSendCheckFill/>
          </button>
        </form>
      </div>
    </div>
  );
}