import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

gsap.registerPlugin(ScrollTrigger);
Chart.register(...registerables);

export default function Graphcirculaireventemontantpaye() {
  const [fluxs, setFlux] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchmoyenpayement, setSearchmoyenpayement] = useState('');
  const chartRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 2000 });
    axios.get(`${import.meta.env.VITE_APIserveur}/listesale`)
      .then(result => setFlux(result.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      gsap.fromTo(chartRef.current, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 1.5, ease: "power3.out" });
    }
  }, [fluxs]);

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
  };

  const isDateInRange = (dateString, start, end) => {
    const date = new Date(dateString);
    const startDate = new Date(start);
    const endDate = new Date(end);
    return (!start || date >= startDate) && (!end || date <= endDate);
  };

  const filterflux = fluxs.filter((flux) =>
    Object.values(flux).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    ) &&
    isDateInRange(flux.dateajout, startDate, endDate) &&
    (!searchmoyenpayement || flux.moyenpayement.toLowerCase().includes(searchmoyenpayement.toLowerCase()))
  );

  const paymentMethods = {};
  filterflux.forEach(flux => {
    const method = flux.moyenpayement || 'Autre';
    paymentMethods[method] = (paymentMethods[method] || 0) + flux.montantPaye;
  });

  const chartData = {
    labels: Object.keys(paymentMethods),
    datasets: [
      {
        label: 'Enregitre le montants due de ',
        data: Object.values(paymentMethods),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(199, 199, 199, 0.6)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)'
        ],
        borderWidth: 1,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'left',
        labels: {
          color: 'white',
          font: {
            size: 16
          }
        }
      },
    },
    animation: {
      duration: 8000, // Durée de l'animation en millisecondes
      easing: 'easeOutBounce' // Type d'animation
    },
    layout: {
      padding: 2
    },
  };

  return (
    <div className="p-1 bg-gray-900 rounded-lg shadow-lg">
      <span className="text-zinc-500 text-sm mb-2">Moyen de payements  : Les montants payés a l'instant par nos clients .   </span>
        <div ref={chartRef} className="flex items-center justify-center bg-gray-900 rounded-md shadow-md h-96">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
     
    </div>
  );
}


