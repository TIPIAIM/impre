import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { GiReturnArrow } from "react-icons/gi";
import { MdAddCard, MdAutoDelete} from "react-icons/md";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { Tooltip } from "react-tooltip";
import { BsPencilSquare } from "react-icons/bs";
import { FaPrint } from "react-icons/fa6";
import { IoIosPrint } from "react-icons/io";

gsap.registerPlugin(ScrollTrigger);

export default function SellRecupliste() {
  const [fluxs, setFlux] = useState([]); // pour les éléments de la liste des ventes
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchNature, setSearchNature] = useState('');

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
  const suprimerelement = (id) => {
    axios.delete(`${import.meta.env.VITE_APIserveur}/deletesale/${id}`)
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  // Filtrage des flux des ventes en fonction des critères de recherche
  const filterflux = fluxs.filter((flux) => {
    const matchesSearchTerm = Object.values(flux).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesDateRange = isDateInRange(flux.dateajout, startDate, endDate);
    const matchesNature = !searchNature || flux.nature.toLowerCase().includes(searchNature.toLowerCase());
    return matchesSearchTerm && matchesDateRange && matchesNature;
  });

  // Trier les flux filtrés par date en ordre décroissant
  const sortedFlux = [...filterflux].sort((a, b) => new Date(b.dateajout) - new Date(a.dateajout));

  // Calcul des montants totaux dus pour les entrées et les sorties
  const totaldue = sortedFlux.reduce((acc, flux) => acc + (flux.montant || 0), 0);
  // Calcul des montants totaux payés pour les entrées et les sorties
  const totalpayés = sortedFlux.reduce((acc, flux) => acc + (flux.montantPaye || 0), 0);
  const resteapayé = totaldue - totalpayés;

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
          <Link to='/gestionstocketvnte' className="mx-2 bg-gay-800 hover:bg-black rounded-2xl">
            <GiReturnArrow size={30} />
          </Link> Liste des ventes 
        </h2>
        
        <img src="/pictures/dIKOBLOGO.jpg" alt="dickob" className="m-1 h-20 w-20 rounded-2xl" />
      </div>
      <div className="p-4 rounded shadow-md w-full">
        <div className="p-4 flex flex-wrap justify-center items-center space-x-2 space-y-2 md:space-y-0">
          <Link to='/ventedesprod8' className="mx-2 animate-pulse bg-slate-300 hover:bg-black rounded-2xl">
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
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-2 py-1 border rounded"
          />
          <Tooltip id="tooltip-start-date" />
          <input
            type="date"
            data-tooltip-id="tooltip-end-date"
            data-tooltip-content="Sélectionnez la date de fin"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-2 py-1 border rounded"
          />
          <Tooltip id="tooltip-end-date" />
        </div>
        
        <hr className="bg-slate-50" />
        
        <div className="p-4 font-serif flex justify-between items-center text-white">
          <div>
            <strong className="text-xl bg-blue-900 text-green-400">Montant dû = </strong>
            <span className="text-xl bg-orange-400 text-slate-950">{totaldue} GNF</span>
          </div>
          <div>
            <strong className="text-xl bg-blue-900 text-green-400">Montant payé = </strong>
            <span className="text-xl bg-orange-400 text-slate-950">{totalpayés} GNF</span>
          </div>
          <div>
            <strong className="text-xl bg-blue-900 text-green-400">Le reste à payer = </strong>
            <span className="text-xl bg-orange-400 text-slate-950">{resteapayé} GNF</span>
          </div>
        </div>
        
        <div className="overflow-x-auto bg-gradient-to-tr from-purple-00 bg-gray-950">
          <table className="text-white table-auto w-full border-collapse">
            <thead className="bg-gradient-to-tr bg-blue-400 from-gray-950 rounded-2xl">
              <tr className="bg-gradient-to-tr bg-blue-400 from-gray-950 rounded-2xl">
              <th className="px-2 py-2 text-center border-b border-yellow-500">N° des Factures</th>
{ /*               <th className="px-2 py-2 text-center border-b border-yellow-500">N° des Produits</th>
*/}                <th className="px-1 py-1 text-center border-b border-yellow-500">Comptes Clients</th>
                <th className="px-1 py-1 text-center border-b border-yellow-500">Produits</th>
                <th className="px-1 py-1 text-center border-b border-yellow-500">Dates de ventes</th>
                <th className="px-1 py-1 text-center border-b border-yellow-500">Qtités</th>
                <th className="px-1 py-1 text-center border-b border-yellow-500">Montants dus</th>
                <th className="px-1 py-1 text-center border-b border-yellow-500">Montants payés</th>
                <th className="px-1 py-1 text-center border-b border-yellow-500">Natures </th>
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
                  <td className="px-1 py-1 text-center border-b border-gray-600">{flu._id}</td>
{ /*                 <td className="px-1 py-1 text-center border-b border-gray-600">{flu.produitId}</td>
*/}                  <td className="px-1 py-1 text-center border-b border-gray-600">{flu.clientId}</td>
                  <td className="px-1 py-1 text-center border-b border-gray-600">{flu.produit}</td>
                  <td className="px-1 py-1 text-center border-b border-gray-600">{formatDate(flu.dateajout)}</td>
                  <td className="px-1 py-1 text-center border-b border-gray-600">{flu.quantite}</td>
                  <td className="px-1 py-1 text-center border-b border-gray-600">{flu.montant}</td>
                  <td className="px-1 py-1 text-center border-b border-gray-600">{flu.montantPaye}</td>
                  <td className="px-1 py-1 text-center border-b border-gray-600">
                    {(flu.montant <= flu.montantPaye) ? (
                      <span className="text-green-400">Payé</span>
                    ) : (
                      <span className="text-red-500">Res a payé</span>
                    )}
                  </td>
                  <td className="text-center">
                  <Link
                    data-tooltip-id={`tooltip-facture`}
                      data-tooltip-content="Imprimer la facture"
                  to={`/factureinitial/${flu._id}`} className=" px-2 py-1  m-1 text-center btn border-t-green-600">
                      <IoIosPrint />
                    </Link>
                    <Tooltip id={`tooltip-facture`} /> 

                    <Link
                          data-tooltip-id={`tooltip-modi`}
                      data-tooltip-content="View pour modifier"
                    to={`/miseRecupsale/${flu._id}`} className="text-cente m-1 text-white px-1 py-1 btn  border-t-green-600">
                      <BsPencilSquare />
                    </Link>
                    <Tooltip id={`tooltip-modi`} /> 
                    <Link 
                      data-tooltip-id={`tooltip-paiement`}
                      data-tooltip-content="Imprimer le reçu paiement"
                    to={`/facturepaiementd/${flu._id}`} className=" px-2 py-1  m-1 text-center btn text-yellow-600  border-t-pink-600">
                      <FaPrint />
                    </Link>
                    <Tooltip id={`tooltip-paiement`} /> 
                    <button
                      className="bg-pink-500 hover:bg-pink-900 text-blue-200  py-1 rounded-md"
                      onClick={() => suprimerelement(flu._id)}
                      data-tooltip-id={`tooltip-delete-${flu._id}`}
                      data-tooltip-content="Supprimer cet élément"
                    >
                      <MdAutoDelete size={20} />
                    </button>
                    <Tooltip id={`tooltip-delete-${flu._id}`} />
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
