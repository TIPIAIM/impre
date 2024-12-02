import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Bar } from 'react-chartjs-2'; // Importer le graphique en barres
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip as ChartTooltip, Legend } from 'chart.js';

// Enregistrer les composants du graphique
ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTooltip, Legend);

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

  // Grouper les montants par date
  const montantsParDate = filterflux.reduce((acc, flux) => {
    const date = new Date(flux.dateajout).toLocaleDateString(); // Formater la date pour affichage
    if (flux.montant) {
      acc[date] = (acc[date] || 0) + flux.montant;
    }
    return acc;
  }, {});

  // Préparer les données pour le graphique en barres
  const dates = Object.keys(montantsParDate);
  const montants = Object.values(montantsParDate);

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Montant Total',
        data: montants,
        backgroundColor: 'rgba(620, 22, 92, 0.2)',
        borderColor: 'rgba(750, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Répartition des Montants de charges Payés par Date',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            const date = tooltipItem.label;
            const montant = montantsParDate[date];
            return `Montant: ${montant} GNF`;
          }
        }
      }
    },
    animation: {
      duration: 1200, // Durée de l'animation en millisecondes
      easing: 'easeOutBounce' // Type d'animation
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Montant (GNF)'
        },
        beginAtZero: true
      }
    }
  };

  return (
    <div className="bg-gray-800   rounded">
      <div className=" rounded shadow-md w-full">
        <div className="bg-gray-800  container rounded flex justify-center items-center" style={{ height: '500px' }}>
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
