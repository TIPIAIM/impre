import React, { useEffect, useState } from "react"; // Importation des hooks React : useEffect et useState
import axios from "axios"; // Importation de la bibliothèque axios pour effectuer des requêtes HTTP
import { Bar } from "react-chartjs-2"; // Importation du composant Bar de react-chartjs-2 pour les graphiques à barres
import 'chart.js/auto'; // Importation automatique de chart.js pour l'initialisation
import BarChartCategoriesss from "./Graphcategoriespayment"; // Importation d'un autre composant graphique pour l'affichage

// Fonction principale du composant
export default function BarChartCategories() {
  const [venteproduit, setventeproduit] = useState([]); // État local pour stocker les données des venteproduit récupérés

  // Utilisation de useEffect pour charger les données des venteproduit lorsque le composant est monté
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APIserveur}/listesale`)
      .then(result => setventeproduit(result.data)) // Stocker les données récupérées dans l'état 'venteproduit'
      .catch(err => console.log(err)); // En cas d'erreur, loguer l'erreur dans la console
  }, []); // Le tableau de dépendances vide signifie que l'effet s'exécutera une seule fois après le montage initial

  // Fonction pour compter le nombre de venteproduit par catégorie
  const countCategories = (venteproduit) => {
    const categoryCount = {}; // Initialiser un objet vide pour stocker les comptages par catégorie
    venteproduit.forEach(dossier => { // Parcourir chaque dossier
      if (categoryCount[dossier.moyenpayement]) { // Si la catégorie existe déjà dans l'objet, incrémenter le compteur
        categoryCount[dossier.moyenpayement]++;
      } else { // Sinon, initialiser le compteur pour cette catégorie
        categoryCount[dossier.moyenpayement] = 1;
      }
    });
    return categoryCount; // Retourner l'objet de comptage des catégories
  };

  // Compter les catégories à partir des venteproduit récupérés
  const categoryCount = countCategories(venteproduit);

  // Données pour le graphique
  const data = {
    labels: Object.keys(categoryCount), // Noms des catégories (labels)
    datasets: [
      {
        data: Object.values(categoryCount), // Valeurs correspondant aux catégories
        backgroundColor: [ // Couleurs de fond des barres du graphique
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [ // Couleurs des bordures des barres du graphique
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1, // Largeur des bordures des barres
      }
    ]
  };

  // Options pour la configuration du graphique
  const options = {
    responsive: true, // Rendre le graphique réactif (s'adapte à la taille de l'écran)
    scales: {
      y: {
        beginAtZero: true // Commencer l'axe des ordonnées à zéro
      },
      x: {
        display: false // Masquer les labels sur l'axe des abscisses
      }
    },
    plugins: {
      legend: {
        display: false // Masquer la légende
      }
    },
    animation: {
      duration: 4000, // Durée de l'animation en millisecondes
      easing: 'easeOutBounce' // Type d'animation
    }
  };
  return (
    <div className="container-fluid p-3 px-4 my-4 bg-gray-800 rounded">
    <BarChartCategoriesss/>
     <span className="text-zinc-500 text-sm mx-2 mb-4">Moyen de payements : Le nombre pour chaque types </span>
      <Bar data={data} options={options} />
    </div>
  );
}
