import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { FcLock } from 'react-icons/fc';

const AddProduct = ({ onProductAdded }) => {
  // État pour stocker les valeurs des champs du formulaire et les erreurs de validation
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Fonction de validation du formulaire
  const validateForm = () => {
    const errors = {};
    if (!name) errors.name = 'Le nom du produit est requis';
    if (quantity <= 0) errors.quantity = 'La quantité doit être un nombre positif';
    if (price <= 0) errors.price = 'Le prix doit être un nombre positif';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Fonction de gestion de l'ajout ou de la mise à jour d'un produit
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Arrêter si la validation échoue

    try {
      const newProduct = { name, quantity: Number(quantity), price: Number(price) };

      // Vérifier si un produit avec le même nom existe déjà
      const response = await axios.get(`${import.meta.env.VITE_APIserveur}/produits?name=${name}`);
      
      if (response.data && response.data.length > 0) {
        // Si le produit existe, mettre à jour la quantité
        const existingProduct = response.data[0];
        const updatedQuantity = existingProduct.quantity + newProduct.quantity;

        await axios.put(`${import.meta.env.VITE_APIserveur}/produit/${existingProduct._id}`, {
          name: existingProduct.name,
          quantity: updatedQuantity,
          price: existingProduct.price
        });

        toast.success('Quantité mise à jour avec succès !');
      } else {
        // Sinon, ajouter un nouveau produit
        await axios.post(`${import.meta.env.VITE_APIserveur}/produit`, newProduct);
        toast.success('Produit ajouté avec succès !');
      }

      // Réinitialiser les champs du formulaire après l'ajout ou la mise à jour
      setName('');
      setQuantity('');
      setPrice('');

      // Appeler la fonction de mise à jour si elle est fournie
      if (onProductAdded) {
        onProductAdded();
      }

      // Redirection après ajout ou mise à jour réussie du produit
      navigate('/listedesstock');
    } catch (error) {
      toast.error("Erreur lors de l'ajout ou de la mise à jour du produit.");
      console.error('Erreur lors de l\'ajout ou de la mise à jour du produit:', error);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      {/* Boutons en haut à droite */}
      <div className="absolute top-4 right-4 flex space-x-1">
        <Link to='/listedesstock' className="duration-600 p-2 no-underline bg-green-800 text-white  mx-2 rounded-lg hover:bg-gray-600">
            <span className="material-icons">Stocks</span>
        </Link>
        <Link to='/gestionstocketvnte' className="duration-600 p-1 no-underline  text-white  mx-1 rounded-lg hover:bg-pink-600">
          <FcLock size={40}  />
        </Link>
      
      </div>
      <div className="max-w-lg w-full p-6 rounded-lg bg-white shadow-lg">
        <h2 className="text-2xl font-serif font-semibold mb-6 text-center text-gray-900">Ajouter un Produit dans le Stock</h2>
        <form onSubmit={handleAddProduct} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-gray-600 font-medium">Nom du produit</label>
            <input
              id="name"
              type="text"
              placeholder="Exemple : T-shirt"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500`}
              required
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="quantity" className="block text-gray-600 font-medium">Quantité</label>
            <input
              id="quantity"
              type="number"
              placeholder="Exemple : 100"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className={`w-full p-3 border ${errors.quantity ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500`}
              required
            />
            {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="price" className="block text-gray-600 font-medium">Prix unitaire</label>
            <input
              id="price"
              type="number"
              placeholder="Exemple : 20.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={`w-full p-3 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500`}
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition duration-200"
          >
            Ajouter dans stock
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddProduct;
