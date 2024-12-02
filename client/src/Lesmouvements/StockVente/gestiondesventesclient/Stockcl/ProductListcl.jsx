import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import { FaPlus, FaCartPlus, FaSearch, FaArrowLeft } from 'react-icons/fa';

const ProductListcl = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Fonction pour récupérer les produits depuis l'API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APIserveur}/produits`);
      setProducts(response.data);
      toast.info('Produits mis à jour avec succès !');
    } catch (error) {
      toast.error('Erreur lors de la récupération des produits.');
      console.error('Erreur lors de la récupération des produits:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenSellForm = () => {
    navigate('/sellProductadd'); // Remplacer par la route réelle du formulaire de vente de produit
  };

  const handleOpenAddStockForm = () => {
    navigate('/Ajoutstockcl'); // Remplacer par la route réelle du formulaire d'ajout de stock
  };

  // Filtrer les produits en fonction de la recherche
  const filteredProducts = products
    .filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => b._id.localeCompare(a._id)); // Trier pour afficher le dernier produit en premier

  // Fonction pour déterminer la couleur en fonction de la quantité
  const getColorByQuantity = (quantity) => {
    if (quantity > 20) return 'bg-green-400'; // Vert clair
    if (quantity > 10) return 'bg-pink-400'; // Rose clair
    if (quantity <= 10) return 'bg-red-400'; // Rouge clair
    return 'bg-gray-100'; // Gris par défaut
  };

  return (
    <div className="min-h-screen bg-gray-900 py-10 flex flex-col items-center">
      <div className="max-w-6xl w-full p-6 bg-gray-800 shadow-lg rounded-lg">
        {/* Bouton de retour */}
        <div className="mb-6 flex items-center">
          <Link to="/sellProductadd " className="flex text-green-50 animate-bounce  items-center hover:text-red-800 transition duration-300">
            <FaArrowLeft className="mr-2" /> 
          </Link>
        </div>

        <h2 className="text-3xl font-bold font-serif mb-12 text-center text-gray-100">Liste des Produits dans notre stock</h2>

        {/* Barre de recherche et boutons d'action */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2 border border-gray-900 rounded-lg p-2 bg-gray-50">
            <FaSearch className="text-gray-600" />
            <input
              type="text"
              placeholder="Rechercher un produit"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="outline-none bg-transparent placeholder-gray-600"
            />
          </div>

          <div className="flex mb-4 space-x-4">
            <button
              onClick={handleOpenSellForm}
              className="flex items-center px-4 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              <FaCartPlus className="mr-2" /> Vendre
            </button>
            <button
              onClick={handleOpenAddStockForm}
              className="flex items-center px-4 py-2 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
            >
              <FaPlus className="mr-2" />  Stock
            </button>
          </div>
        </div>

        {/* Liste des produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length === 0 ? (
            <p className="col-span-full text-center text-blue-900">Aucun produit trouvé</p>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className={`p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition duration-300 ${getColorByQuantity(product.quantity)}`}
              >
                <h3 className="text-xl font-semibold font-serif text-blue-900 mb-2">{product.name}</h3>
                <p className="text-gray-900 font-serif">Quantité: {product.quantity}</p>
                <p className="text-gray-900 font-serif">Prix: {product.price} GNF</p>
              </div>
            ))
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductListcl;
