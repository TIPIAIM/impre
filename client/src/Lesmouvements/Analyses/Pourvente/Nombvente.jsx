import axios from "axios"; // Importation d'axios pour effectuer des requêtes HTTP
import { useEffect, useState } from 'react'; // Importation des hooks React useEffect et useState

export default function NombreTotalVente() {
    // État local pour stocker les données des vente récupérées
    const [vente, setvente] = useState([]);

    // useEffect pour effectuer une requête à l'API dès le montage du composant
    useEffect(() => {
        // Requête GET pour récupérer les données des vente depuis l'API
        axios.get(`${import.meta.env.VITE_APIserveur}/listesale`)
            .then(result => setvente(result.data)) // Stocke les données récupérées dans l'état 'vente'
            .catch(err => console.log(err)); // Affiche les erreurs éventuelles dans la console
    }, []); // Le tableau de dépendances vide indique que l'effet s'exécute une seule fois après le montage initial

    // Calcul du nombre total d'vente
    const totalvente = vente.length;

    return (
        <div className="bg-gray-900 container rounded"> {/* Conteneur principal avec style */}
            <div className="flex items-center justify-center"> {/* Flexbox pour centrer le contenu */}
                <div className="flex cursor-pointer capitalize hover:scale-90 duration-300 object-cover text-center items-center mx-2 p-2 rounded shadow-md text-white font-serif">
                    <img 
                        src="img/audience.jpg"  // Chemin vers l'image d'icône
                        className="h-12 w-12 mr-0 mx-2 rounded-2xl"  // Style de l'image : taille et marges
                        alt="Audience Icon" // Texte alternatif pour l'image
                    />
                    {/* Paragraphe affichant le nombre total d'vente */}
                    <p className="text-sm text-zinc-400">
                    Operations de vente : 
                        <span className="font-bold text-xl  text-amber-500">{totalvente}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
