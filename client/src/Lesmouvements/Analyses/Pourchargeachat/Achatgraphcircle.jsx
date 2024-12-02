import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Pie } from 'react-chartjs-2'; // Importer le graphique en secteurs
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js';

// Enregistrer les composants du graphique
ChartJS.register(ArcElement, ChartTooltip, Legend);

gsap.registerPlugin(ScrollTrigger);

export default function Achatchargebacircle() {
  const [fluxs, setFlux] = useState([]); // Pour les éléments de la liste des ventes
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchNature, setSearchNature] = useState('');

  // Utilisation de useEffect pour charger les données
  useEffect(() => {
    AOS.init({ duration: 2000 });
    axios.get(`${import.meta.env.VITE_APIserveur}/listeachatoucharge`)
      .then(result => setFlux(result.data))
      .catch(err => console.log(err));
  }, []);

  // Fonction pour vérifier si une date est dans un intervalle
  const isDateInRange = (dateString, start, end) => {
    const date = new Date(dateString);
    const startDate = new Date(start);
    const endDate = new Date(end);
    return (!start || date >= startDate) && (!end || date <= endDate);
  };

  // Filtrage des flux des ventes en fonction des critères de recherche
  const filterflux = fluxs.filter((flux) =>
    Object.values(flux).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    ) &&
    isDateInRange(flux.dateajout, startDate, endDate) &&
    (!searchNature || flux.nature.toLowerCase().includes(searchNature.toLowerCase()))
  );

  // Grouper les montants par catégories
  const montantsParCategorie = filterflux.reduce((acc, flux) => {
    if (flux.categorie && flux.montant) {
      acc[flux.categorie] = (acc[flux.categorie] || 0) + flux.montant;
    }
    return acc;
  }, {});

  // Préparer les données pour le graphique en secteurs
  const categories = Object.keys(montantsParCategorie);
  const montants = Object.values(montantsParCategorie);

  // Calculer le nombre de transactions par catégorie
  const transactionsParCategorie = filterflux.reduce((acc, flux) => {
    if (flux.categorie) {
      acc[flux.categorie] = (acc[flux.categorie] || 0) + 1;
    }
    return acc;
  }, {});

  const data = {
    labels: categories,
    datasets: [
      {
        data: montants,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: '20%', // Réduire la taille des secteurs (Doughnut)
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Répartition des Montants Payés par Catégorie d\'achats ou charges',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            const category = tooltipItem.label;
            const montant = montantsParCategorie[category];
            const transactions = transactionsParCategorie[category];
            return `Montant: ${montant} GNF | Transactions: ${transactions}`;
          }
        }
      }
    },
    animation: {
      duration: 12000, // Durée de l'animation en millisecondes
      easing: 'easeOutBounce' // Type d'animation
    }
  };

  return (
    <div className="bg-gray-900 p-1 container rounded">
      <div className="p-1 rounded shadow-md w-full">
      <div className="bg-gray-900 p-1 container rounded flex justify-center items-center" style={{ height: '400px' }}>
    
          <Pie data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
