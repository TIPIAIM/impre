import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FcAdvance } from "react-icons/fc";
import { format } from 'date-fns';

export default function MiseajourSellRecupcl() {
  const { id } = useParams();
  const [produitId, setProduitId] = useState('');
  const [produit, setProduit] = useState('');
  const [dateajout, setdateajout] = useState('');
  const [quantite, setQuantite] = useState('');
  const [clientId, setClientId] = useState('');
  const [moyenpayement, setmoyenpayement] = useState('');
  const [montant, setMontant] = useState('');
  const [montantPaye, setMontantPaye] = useState('');


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

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APIserveur}/recupparidsale/${id}`)
      .then(result => {
        console.log(result);
        const { produitId, quantite, produit, dateajout, moyenpayement, clientId, montant, montantPaye } = result.data;
        setProduitId(produitId);
        setProduit(produit);
        setQuantite(quantite);
        setClientId(clientId);
        setMontant(montant);
        setdateajout(format(new Date(dateajout), 'yyyy-MM-dd HH:mm')),
          setmoyenpayement(moyenpayement);
        setMontantPaye(montantPaye);
      })
      .catch(err => console.log(err));
  }, [id]);

  const MiseAjour = (e) => {
    e.preventDefault();
    axios.put(`${import.meta.env.VITE_APIserveur}/MetajourlerecupererSale/${id}`, { produitId, quantite, produit, dateajout, moyenpayement, clientId, montant, montantPaye })
      .then(result => {
        console.log(result);
        navigate('/listesellcl');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className=" min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url('/pictures/lesclietparle.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
      }} >
      <div className=" bg-gradient-to-l from-pink-300 p-4 rounded shadow-md w-full max-w-md">

        <form onSubmit={MiseAjour}>
          <div className="mb-4">
            <select
              className="container text-center font-serif bg-gradient-to-l from-pink-300   p-2 rounded-lg   input-field"
              id="produitId"
              value={produitId}
              onChange={e => setProduitId(e.target.value)}
              
            >
              <option value="">Sélectionnez un produit</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={clientId}
              id="productId"
              onChange={(e) => setClientId(e.target.value)}
              
            >
              <option value="">Sélectionnez le client</option>
              {clients.map((client) => (
                <option key={client._id} value={client._id}>
                  {client.nometprenom} {client.name} - {client._id}
                </option>
              ))}
            </select>
          </div>

          <div className="flex  justify-center items-center">
            <div className="mb-4">
              <input
                type="texte"
                placeholder="Le nom du service ou produit "
                value={produit}
                id='produit'
                onChange={(e) => setProduit(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                id="quantite"
                placeholder="Quantité"
                value={quantite}
                onChange={(e) => setQuantite(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                
              />
            </div>
          </div>

          <div className="mb-4">
            <input
              type="number"
              id="montant"
              placeholder="Prix Total du produit"
              value={montant}
              onChange={(e) => setMontant(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              
            />
          </div>


          <div className="flex justify-center items-center">

            <div className="mb-4">
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={moyenpayement}
                id="moyenpayement"
                onChange={(e) => setmoyenpayement(e.target.value)}
                
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
              <input
                type="number"
                id="montantPaye"
                placeholder="Montant Payé"
                value={montantPaye}
                onChange={(e) => setMontantPaye(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                
              />
            </div>
          </div>

          <button className="bg-gray-900 bg-gradient-to-l from-pink-950300 animate-bounce text-white py-2 px-4 rounded-md hover:bg-blue-800 focus:outline-none focus:ring focus:border-blue-500">
            <FcAdvance />
          </button>
        </form>
      </div>
    </div>
  );
}
