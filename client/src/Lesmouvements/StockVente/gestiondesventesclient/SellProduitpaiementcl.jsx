import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer'; // Hook pour détecter quand un élément est en vue.
import { IoReturnDownBack } from 'react-icons/io5';
import { gsap } from 'gsap'; // Bibliothèque pour les animations.
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function SellProduitpaiementcl({ onSaleCompleted }) {

  const [productId, setProductId] = useState('');
  const [produit, setProduit] = useState('');
  const [dateajout, setdateajout] = useState('');
  const [quantite, setQuantite] = useState('');
  const [clientId, setClientId] = useState('');
  const [moyenpayement, setmoyenpayement] = useState('');
  const [montant, setMontant] = useState('');
  const [montantPaye, setMontantPaye] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  //-------------------Recup de l'id du produit--------------------------------
  const [products, setProducts] = useState([]);// pour ma clée etrangere idproduit

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APIserveur}/produits`);
      setProducts(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  //--------------------------------------

  //------------------------config recup de l'id du client pour lutiliser ici--------------------------------------------------- 
  const [clients, setClients] = useState([]);// pour ma clée etrangere

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APIserveur}/listeclients`) // Fetch all clients
      .then(response => {
        setClients(response.data); // Assume the data returned is a list of clients
      })
      .catch(err => console.log(err));
  }, []);
  //------------------------------------------------------------------------------------------------

  // État pour gérer l'affichage du formulaire d'ajout de client.
  const navigate = useNavigate(); // Hook pour la navigation programmatique.
  const { ref, inView } = useInView(); // Hook pour détecter quand un élément entre dans le viewport.

  // Effet pour initialiser AOS (animations au défilement).
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialisation avec une durée de 2 secondes pour les animations.
  }, []);


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



  const handleSellProduct = async (e) => {
    e.preventDefault();
    if (parseInt(montantPaye) > parseInt(montant)) {
      setErrorMessage('Le montant payé ne peut pas dépasser le montant total.');
      return;
    }
    try {
      const vente = { produitId: productId, quantite: Number(quantite), produit, dateajout, moyenpayement, clientId: clientId, montant: Number(montant), montantPaye: Number(montantPaye) };
      await axios.post(`${import.meta.env.VITE_APIserveur}/ventes`, vente);
      setProductId('');
      setProduit('');
      setQuantite('');
      setClientId('');
      setMontant('');
      setdateajout(''),
        setmoyenpayement('');
      setMontantPaye('');

      setErrorMessage('');
      alert('Vente enregistrée avec succès');
      if (onSaleCompleted) {
        onSaleCompleted(); // Appeler la fonction de mise à jour

      }
      navigate('/listesellcl')
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la vente:', error.response ? error.response.data : error.message);
      setErrorMessage('Erreur lors de l\'enregistrement de la vente: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <div className="px-1 rounded-lg bg-gradient-to-tr from-pink-400 to-gray-950 bg-gray-900 ">
      <Link to='/gestionstocketvntecl' className="duration-600 mx-2 rounded-lg hover:bg-gray-600">
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
          className="bg-gradient-to-r from-blue-500 texte-2xl rounded-md p-4 shadow-md w-full max-w-md"
          initial={{ opacity: 0, y: 50 }} // État initial de l'animation.
          animate={{ opacity: 1, y: 0 }} // État final de l'animation.
          transition={{ duration: 1 }} // Durée de l'animation: 1 seconde.
          ref={ref} // Référence pour l'élément à observer avec useInView.
          data-aos="fade-up" // Animation AOS pour cet élément.
        >
          <div className="addcontainer">



            <form onSubmit={handleSellProduct} className="max-w-lg mx-auto mt-1 rounded-md shadow-md">
              <h2 className="text-2xl font-bold mb-4 font-serif text-center">Paiement des impayés </h2>

              {errorMessage && <p className="text-gray-900 mb-4">{errorMessage}</p>}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Produit</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  required
                >
                  <option value="">Sélectionnez le produit sur la facture</option>
                  {products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name}  
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Id du client</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  required
                >
                  <option value="">Sélectionnez le client</option>
                  {clients.map((client) => (
                    <option key={client._id} value={client._id}>
                      {client._id} | {client.nometprenom} | {client.name}
                    </option>
                  ))}
                </select>
              </div>



            
             

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Date de vente</label>

                <input
                  type="datetime-local"

                  required
                  value={dateajout}
                  placeholder="Date de vente"
                  className="input-style container  p-2"
                  onChange={e => setdateajout(e.target.value)}
                />
              </div>

             

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">État du paiement</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={moyenpayement}
                  onChange={(e) => setmoyenpayement(e.target.value)}
                  required
                >
                  <option value="">Sélectionnez l'état du paiement</option>
                  <option value="credit">Par crédit</option>
                  <option value="partiel-orange">Paie partielle (Orange)</option>
                  <option value="partiel-cash">Paie partielle (Cash)</option>
                  <option value="solde-cash">Soldé par cash</option>
                  <option value="solde-orange">Soldé par Orange</option>
                  <option value="solde-facture">Piement facture</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Montant Payé</label>
                <input
                  type="number"
                  placeholder="Montant Payé"
                  value={montantPaye}
                  onChange={(e) => setMontantPaye(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-pink-900 text-white py-2 rounded hover:bg-gray-900 transition duration-200"
              >
                Vendre
              </button>
            </form>

          </div>
        </motion.div>
      </div >
    </div >
  );
};

