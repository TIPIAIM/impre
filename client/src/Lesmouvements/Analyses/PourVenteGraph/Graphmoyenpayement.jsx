import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Tooltip } from "react-tooltip";
import { Line } from 'react-chartjs-2'; // Importer le composant Line de Chart.js
import { Chart, registerables } from 'chart.js';
import GraphmodalanalVente from "./GraphmodalanalVente";

gsap.registerPlugin(ScrollTrigger);
Chart.register(...registerables);

export default function Graphmoyenpayement() {
  const [fluxs, setFlux] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchmoyenpayement, setSearchmoyenpayement] = useState('');

  // Utilisation de useEffect pour charger les données
  useEffect(() => {
    AOS.init({ duration: 2000 });
    axios.get(`${import.meta.env.VITE_APIserveur}/listesale`)
      .then(result => setFlux(result.data))
      .catch(err => console.log(err));
  }, []);

  // Fonction pour formater les dates
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
  };

  // Fonction pour vérifier si une date est dans un intervalle
  const isDateInRange = (dateString, start, end) => {
    const date = new Date(dateString);
    const startDate = new Date(start);
    const endDate = new Date(end);
    return (!start || date >= startDate) && (!end || date <= endDate);
  };

  // Filtrage des flux en fonction des critères de recherche
  const filterflux = fluxs.filter((flux) =>
    Object.values(flux).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    ) &&
    isDateInRange(flux.dateajout, startDate, endDate) &&
    (!searchmoyenpayement || flux.moyenpayement.toLowerCase().includes(searchmoyenpayement.toLowerCase()))
  );

  // Trier les flux filtrés par date en ordre croissant pour le graphique
  const sortedFlux = [...filterflux].sort((a, b) => new Date(a.dateajout) - new Date(b.dateajout));

    //totaldu reste Calcul des montants totaux pour les flux affichés
    const totaldu = sortedFlux.filter(flux => flux.montant).reduce((acc, flux) => acc + (flux.montant || 0), 0);
    const totalPayer = sortedFlux.filter(flux => flux.montantPaye).reduce((acc, flux) => acc + (flux.montantPaye || 0), 0);
    const totalreste= totaldu - totalPayer
  // Préparer les données pour le graphique en ligne
  const chartData = {
    labels: sortedFlux.map(flu => formatDate(flu.dateajout)),
    datasets: [
      {
        label: 'Flux des operantion financières par Montants payé par nos clients',
        data: sortedFlux.map(flu => flu.montantPaye),
        borderColor: 'rgba(752, 192, 192, 1)',
        backgroundColor: 'rgba(752, 192, 192, 0.2)',
        fill: true,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category',
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        }
      },
      y: {
        beginAtZero: true,
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    },
    animation: {
      duration: 6000, // Durée de l'animation en millisecondes
      easing: 'easeOutBounce' // Type d'animation
    }
  };

  return (
    <div>
      <div className="p-3 rounded shadow-md w-full">
        <div className="p-2 text-black flex flex-wrap justify-center items-center space-x-2 space-y-2 md:space-y-0">
          <input
            type="text"
            data-tooltip-id="tooltip-search-term"
            data-tooltip-content="Rechercher par termes 'Tu peux saisir le n° clients ...'"
            placeholder="Rechercher par terme..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-2 text-gray-500 py-1 border rounded"
          />
          <Tooltip id="tooltip-search-term" />
          <input
            type="date"
            data-tooltip-id="tooltip-start-date"
            data-tooltip-content="Sélectionnez la date de début"
            placeholder="Date de début"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-2 text-gray-600 py-1 border rounded"
          />
          <Tooltip id="tooltip-start-date" />
          <input
            type="date"
            data-tooltip-id="tooltip-end-date"
            data-tooltip-content="Sélectionnez la date de fin"
            placeholder="Date de fin"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-2 py-1 text-gray-600 border rounded"
          />
          <Tooltip id="tooltip-end-date" />
          <input
            type="text"
            data-tooltip-id="tooltip-search-moyenpayement"
            data-tooltip-content="Rechercher par:  : Facture, Par crédit, soldé par orange, soldé par cash, Paie partielle (cash),Paie partielle (orange)..."
            placeholder="Facture, Par crédit, soldé par orange, soldé par cash, Paie partielle (cash),Paie partielle (orange)..."
            value={searchmoyenpayement}
            onChange={(e) => setSearchmoyenpayement(e.target.value)}
            className="px-2 py-1 text-gray-600 border rounded"
          />
          <Tooltip id="tooltip-search-moyenpayement" />
          <span
            data-tooltip-id="tooltipview"
            data-tooltip-content="Voir plus"
            className="text-zinc-500 text-sm text-center">
            <div className=" flex text-sm">
            <span className="  text-stone-300 font-bold  mx-2">Total: {totaldu} GNF</span>
            <span className="mx-2 text-emerald-600 font-bold  ">T.Payé: {totalPayer} GNF</span>
            <span className=" font-bold text-red-500 ">T.Reste: {totalreste} GNF</span>
              </div>
            <GraphmodalanalVente />
          </span>
          <Tooltip id="tooltipview" />
        </div>

        <hr className="bg-slate-50" />

        {/* Graphique en ligne */}
        <div className="p-3 mt-4 bg-gray-800 rounded shadow-md">
          <div style={{ height: '400px' }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
