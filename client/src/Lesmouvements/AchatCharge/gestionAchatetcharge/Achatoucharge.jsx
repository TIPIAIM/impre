import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer'; // Hook pour détecter quand un élément est en vue.
import Form from 'react-bootstrap/Form'; // Composant de formulaire de React Bootstrap.
import axios from 'axios';
import { IoReturnDownBack } from 'react-icons/io5';
import { gsap } from 'gsap'; // Bibliothèque pour les animations.
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FcAdvance } from 'react-icons/fc';

export default function Achatoucharge() {
  // État local pour stocker les valeurs du formulaire.
  const [values, setValues] = useState({
    idfourniseur: ' ' ,
    numfacture: '',
    categorie: '',
    nomservice: '', 
    quantite: '' ,  
    dateajout: '',
    montant: '',
    
   
  });
 
  // État pour gérer l'affichage du formulaire d'ajout de client.
  const navigate = useNavigate(); // Hook pour la navigation programmatique.
  const { ref, inView } = useInView(); // Hook pour détecter quand un élément entre dans le viewport.

  // Effet pour initialiser AOS (animations au défilement).
  useEffect(() => {
    AOS.init({ duration: 2000 }); // Initialisation avec une durée de 2 secondes pour les animations.
  }, []);


 //------------------------config clée primary--------------------------------------------------- 
const [fournisseurs, setFournisseurs] = useState([]);// pour ma clée etrangere

useEffect(() => {
    axios.get(`${import.meta.env.VITE_APIserveur}/listeFournisseur`) // Fetch all clients
      .then(response => {
        setFournisseurs(response.data); // Assume the data returned is a list of clients
      })
      .catch(err => console.log(err));
  }, []);
//------------------------------------------------------------------------------------------------

  // Effet pour animer le conteneur lorsque l'élément devient visible.
  useEffect(() => {
    if (inView) {
      gsap.fromTo(
        ".addcontainer", // Sélecteur pour l'élément à animer.
        { opacity: 0, y: 50 }, // État initial: opacité à 0, décalage en Y de 50px.
        { opacity: 1, y: 0, duration: 2 } // État final: opacité à 1, décalage en Y à 0, durée de 2 secondes.
      );
    }
  }, [inView]); // Dépendance sur `inView` pour déclencher l'effet lorsque l'élément est en vue.

  // Fonction de gestion de la soumission du formulaire.
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire (rechargement de la page).
    // Requête POST pour envoyer les données du formulaire au serveur.
    axios.post(`${import.meta.env.VITE_APIserveur}/ajoutachatoucharge`, values)
      .then(result => {
        console.log(result);
        navigate('/achatchargeliste');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="px-1 rounded-lg bg-gradient-to-tr from-pink-400 to-gray-950 bg-gray-900 ">
      <Link to='/gestionachatoucharge' className="duration-600 mx-2 rounded-lg hover:bg-gray-600">
        <IoReturnDownBack size={20} className="mx-3 animate-pulse hover:scale-110 duration-600 rounded-2xl bg-gray-800 hover:bg-red-900" />
      </Link>
      <div className="bg-gradient-to-l min-h-screen flex flex-col items-center justify-center p-20"
        style={{
          backgroundImage: `url('/pictures/lesclietparle.jpg')`, // Image de fond pour le conteneur.
          backgroundSize: 'cover', // L'image couvre tout le conteneur.
          backgroundPosition: 'center', // L'image est centrée.
        }}
      >
        {/* Conteneur pour le formulaire d'ajout de flux */}
        <motion.div
          className="bg-gradient-to-r from-blue-500 texte-2xl rounded-md p-2 shadow-md w-full max-w-md"
          initial={{ opacity: 0, y: 50 }} // État initial de l'animation.
          animate={{ opacity: 1, y: 0 }} // État final de l'animation.
          transition={{ duration: 1 }} // Durée de l'animation: 1 seconde.
          ref={ref} // Référence pour l'élément à observer avec useInView.
          data-aos="fade-up" // Animation AOS pour cet élément.
        >
          <div className="addcontainer">
            {/* Formulaire pour entrer les détails du flux */}
            <form onSubmit={handleSubmit}>
              <div className="flex justify-center items-center">         
                <div className="mb-4 mx-1">
                  <Form.Select
                    id="idfourniseur"
                    style={{ width: "250px" }}
                    className="input-style container p-2"                    
                    onChange={e => setValues({ ...values, idfourniseur: e.target.value })}
                  >
                    <option value="">Select fournisseur</option>
                    {fournisseurs.map(fournisseur => (
                      <option key={fournisseur._id} value={fournisseur._id}>
                       {fournisseur._id} | {fournisseur.nometprenom} | {fournisseur.name}
                     
                      </option>
                     
                    ))}
                  </Form.Select>
                </div>
                <div className="flex justify-center items-center">
                <div className="mb-4">
                  <Form.Select
                    id='categorie'
                    className="input-style"
                     style={{ width: "150px" }}
                    onChange={e => setValues({ ...values, categorie: e.target.value })}
                    aria-label="Categorie d'operation"
                    required
                  >
                    <option>Categorie d'operation ?</option>                   
                    <option>Achat </option>
                    <option>Service externe</option>
                    <option>Salaire </option>

                   
                  </Form.Select>
                </div>

              </div>
             
              </div>
               <div className="mb-4">
                  <input
                    type="texte"
                    id="numfacture"
                    style={{ width: "400px" }}
                    required
                    placeholder="N° sur la facture"
                    className="input-style text-center mx-3 bg-pink-950  text-black container  p-2"
                    onChange={e => setValues({ ...values, numfacture: e.target.value })}
                  />
                </div>
              <div className="flex justify-center items-center">
                <div className="mb-4 ">
                  <input
                    type="texte"
                    id="nomservice"
                    style={{ width: "300px" }}
                    required
                    placeholder="Libellé sur le l'achat"
                    className="input-style bg-slate-100 container  p-2"
                    onChange={e => setValues({ ...values, nomservice: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="number"
                    id="quantite"
                    style={{ width: "100px" }}
                    required
                    placeholder="La quantité"
                    className="input-style bg-pink-950  text-black container  p-2"
                    onChange={e => setValues({ ...values, quantite: e.target.value })}
                  />
                </div>
               
              </div>

              <div className="flex justify-center items-center">
              <div className="mb-4">
                  <input
                    type="datetime-local"
                    id="dateajout"
                    required
                    placeholder="Date d'operation"
                    className="input-style container  p-2"
                    onChange={e => setValues({ ...values, dateajout: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="number"
                    id="montant"
                    required
                    placeholder="Le montant due"
                    className="input-style text-center  text-black bg-pink-950 container  p-2 "
                    onChange={e => setValues({ ...values, montant: e.target.value })}
                  />
                </div>
              </div>
              

              <button
                type="submit"
                className="bg-gray-950  text-white py-2 px-4 rounded-md hover:bg-pink-900 focus:outline-none focus:ring focus:border-blue-500"
              >
                <FcAdvance /> {/* Icône de progression */}
              </button>
            </form>
          </div>
        </motion.div>
      </div >
    </div >
  );
}
