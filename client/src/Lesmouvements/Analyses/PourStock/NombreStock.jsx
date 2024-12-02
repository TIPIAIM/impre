import axios from "axios"; // Importation d'axios pour effectuer des requêtes HTTP
import { useEffect, useState } from 'react'; // Importation des hooks React useEffect et useState

export default function NombreTotalstock() {
    // État local pour stocker les données des stock récupérées
    const [stock, setstock] = useState([]);

    // useEffect pour effectuer une requête à l'API dès le montage du composant
    useEffect(() => {
        // Requête GET pour récupérer les données des stock depuis l'API
        axios.get(`${import.meta.env.VITE_APIserveur}/produits`)
            .then(result => setstock(result.data)) // Stocke les données récupérées dans l'état 'stock'
            .catch(err => console.log(err)); // Affiche les erreurs éventuelles dans la console
    }, []); // Le tableau de dépendances vide indique que l'effet s'exécute une seule fois après le montage initial

    const totalstock = stock.length;

    return (
        <div className="bg-gray-900 container rounded"> {/* Conteneur principal avec style */}
            <div className="flex items-center justify-center"> {/* Flexbox pour centrer le contenu */}
                <div className="flex cursor-pointer capitalize hover:scale-90 duration-300 object-cover text-center items-center mx-2 p-2 rounded shadow-md text-white font-serif">
                    <img 
                        src="/img/identification.png"  // Chemin vers l'image d'icône
                        className="h-12 w-12 mr-0 mx-2 rounded-2xl"  // Style de l'image : taille et marges
                    />
                    <p className="text-sm text-zinc-400">
                 Differents produit en stock : 
                        <span className="font-bold text-xl text-amber-500">{totalstock} </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
