import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
//import { Button } from "react-bootstrap";
//import { ImPencil2 } from "react-icons/im";
import { GiReturnArrow } from "react-icons/gi";
import { MdAddCard, MdAutoDelete,  } from "react-icons/md";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { Tooltip } from "react-tooltip";

gsap.registerPlugin(ScrollTrigger);

export default function AchatchargeRecuplistecl() {
  const [fluxs, setFlux] = useState([]);//pour les elements de l liste des ventes
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

  // Fonction pour formater les dates
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()} à ${dateObj.getHours()}h${dateObj.getMinutes()}m`;
  };

  // Fonction pour vérifier si une date est dans un intervalle
  const isDateInRange = (dateString, start, end) => {
    const date = new Date(dateString);
    const startDate = new Date(start);
    const endDate = new Date(end);
    return (!start || date >= startDate) && (!end || date <= endDate);
  };

  // Fonction pour supprimer un élément
  {/*const suprimerelement = (id) => {
    axios.delete(`${import.meta.env.VITE_APIserveur}/deletevente/${id}`)
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => console.log(err));
  };*/}

  // Filtrage des flux des vente en fonction des critères de recherche
  const filterflux = fluxs.filter((flux) =>
    Object.values(flux).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    ) &&
    isDateInRange(flux.dateajout, startDate, endDate) &&
    (!searchNature || flux.nature.toLowerCase().includes(searchNature.toLowerCase()))
  );

  // Trier les flux filtrés par date en ordre décroissant
  const sortedFlux = [...filterflux].sort((a, b) => new Date(b.dateajout) - new Date(a.dateajout));

  // Calcul des montants totaux pyés pour les entrées et les sorties
  const totalpayés = sortedFlux.filter(flux => flux.montant).reduce((acc, flux) => acc + (flux.montant || 0), 0);


  return (
    <div
      className="bg-gray-900 p-4 rounded"
      style={{
        backgroundImage: `url('/pictures/dickob.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-gradient-to-t  from-gray-950 rounded-2xl flex justify-between items-center mb-4">
        <h2 className="m-2 text-2xl text-white font-bold flex items-center w-full">
          <Link to='/gestionachatouchargecl' className="mx-2 bg-red-500 animate-pulse hover:bg-red-800 rounded-2xl">
            <GiReturnArrow size={20} />
          </Link> Liste des achats et autres charges
        </h2>
        
        <img src="/pictures/dickob.jpg" alt="dickob" className="m-1 h-20 w-20 rounded-2xl" />
      </div>
      <div className="p-4 rounded shadow-md w-full">
        
        <div className="p-4 flex flex-wrap justify-center items-center space-x-2 space-y-2 md:space-y-0">
        <Link to='/achatchargecl' className="mx-2 animate-pulse bg-slate-300 hover:bg-black rounded-2xl">
            <MdAddCard size={35} />
          </Link>
          <input
            type="text"
            data-tooltip-id="tooltip-search-term"
            data-tooltip-content="Rechercher par termes ou détails"
            placeholder="Rechercher par terme..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-2 py-1 border rounded"
          />
          <Tooltip id="tooltip-search-term" />
          <input
            type="date"
            data-tooltip-id="tooltip-start-date"
            data-tooltip-content="Sélectionnez la date de début"
            placeholder="Date de début"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-2 py-1 border rounded"
          />
          <Tooltip id="tooltip-start-date" />
          <input
            type="date"
            data-tooltip-id="tooltip-end-date"
            data-tooltip-content="Sélectionnez la date de fin"
            placeholder="Date de fin"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-2 py-1 border rounded"
          />
          <Tooltip id="tooltip-end-date" />
       
        </div>
        
        <hr className="bg-slate-50" />
        
        {/* Section affichant les montants totaux */}
        <div className="p-4 font-serif flex justify-between items-center text-white">
         
          <div>
            <strong className=" text-xl  bg-blue-900 text-green-400 ">Montant payé = </strong>
            <span className=" text-xl bg-orange-400 text-slate-950 ">{totalpayés} GNF</span>
          </div>
        
        </div>
        
        <div className="overflow-x-auto bg-gradient-to-tr from-purple-00 bg-gray-950">
          <table className="text-white table-auto w-full border-collapse">
            <thead className="bg-gradient-to-tr bg-blue-400 from-gray-950 rounded-2xl">
              <tr className="bg-gradient-to-tr  bg-blue-400 from-gray-950 rounded-2xl">
                <th className="px-1 py-1 text-center border-b border-yellow-500">N° fournisseurs</th>
                <th className="px-2 py-2 text-center border-b border-yellow-500">N° sur factures</th>
                <th className="px-1 py-1 text-center border-b border-yellow-500">Les details sur ope</th>
                <th className="px-1 py-1 text-center border-b border-yellow-500">Qtités</th>
                <th className="px-1 py-1 text-center border-b border-yellow-500">Date d'operation</th>
                <th className="px-1 py-1 text-center border-b border-yellow-500">Date d'enregist</th>
                <th className="px-1 py-1 text-center border-b border-yellow-500">Montants </th>
                <th className="text-center border-b border-yellow-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedFlux.map((flu) => (
                <motion.tr
                  key={flu._id}
                  className="client-row"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <td className="px-1 py-1  border-l border-b border-r border-blue-500">{flu.idfourniseur}</td>
                  <td className="px-1 py-1 text-center border-l border-b border-r border-blue-500">{flu.numfacture }</td>
                  <td className="px-1 py-1 text-center border-b border-r border-blue-500">{flu.nomservice}</td>
                  <td className="px-1 py-1 text-center border-b border-r border-blue-500">{flu.quantite}</td>
                  <td className="px-1 py-1 text-center border-b border-r border-blue-500">{formatDate(flu.dateajout)}</td>
                  <td className="px-1 py-1 text-center border-b border-r border-blue-500">{formatDate(flu.date)}</td>
                  <td className="px-1 py-1 text-center border-b border-r border-blue-500">{flu.montant}</td>
                  <td className="text-center px-1 py-1 border-b border-r border-blue-500">
                   {/* <Link to={`/Factureventepaiement/${flu._id}`} className=" m-2 text-center btn btn-success">
                      <MdLabelImportant />
                    </Link>

                    <Button className="btn btn-danger text-center" onClick={() => suprimerelement(flu._id)}>
                      <MdAutoDelete />
                    </Button>*/}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

