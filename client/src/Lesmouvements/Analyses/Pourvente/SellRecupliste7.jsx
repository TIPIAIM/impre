import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { GiReturnArrow } from "react-icons/gi";
import {  MdAutoDelete } from "react-icons/md";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { FaPrint } from "react-icons/fa6";
import EtapaieVenteModelhh from "./EtapaieVenteModel";

gsap.registerPlugin(ScrollTrigger);

export default function SellRecupliste7() {
  const [fluxs, setFlux] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 2000 });
    axios.get(`${import.meta.env.VITE_APIserveur}/listesale`)
      .then(result => setFlux(result.data))
      .catch(err => console.log(err));
  }, []);

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()} à ${dateObj.getHours()}h${dateObj.getMinutes()}m`;
  };

  const suprimerelement = (id) => {
    axios.delete(`${import.meta.env.VITE_APIserveur}/deletesale/${id}`)
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  // Trier les flux par date en ordre décroissant et prendre les 7 premiers
  const recentFlux = fluxs.sort((a, b) => new Date(b.dateajout) - new Date(a.dateajout)).slice(0, 10);

  return (
    <div className="bg-gray-900 rounded"> 
    <div className=" flex text-center ">
    <EtapaieVenteModelhh/> 
    <p className="text-sm text-zinc-400 text-center "> Les ventes recents : </p>    
     </div>
      <div className=" text-sm overflow-x-auto bg-gradient-to-tr from-purple-00 bg-gray-950">
        <table className=" text-sm text-white table-auto w-full border-collapse">
          <thead className="bg-gradient-to-tr bg-blue-400 from-gray-950 rounded-2xl">
            <tr className="bg-gradient-to-tr bg-blue-400 from-gray-950 rounded-2xl">
              <th className="px-1 py-1 text-center border-b border-yellow-500">Dates</th>
              <th className="px-1 py-1 text-center border-b border-yellow-500">Qtités</th>
              <th className="px-1 py-1 text-center border-b border-yellow-500">M.payés</th>
              <th className="px-1 py-1 text-center border-b border-yellow-500">Natures</th>
              <th className="text-center border-b border-yellow-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentFlux.map((flu) => (
              <motion.tr
                key={flu._id}
                className="client-row"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <td className="px-1 py-1 text-center border-b border-gray-600">{formatDate(flu.dateajout)}</td>
                <td className="px-1 py-1 text-center border-b border-gray-600">{flu.quantite}</td>
                <td className="px-1 py-1 text-center border-b border-gray-600">{flu.montantPaye}</td>
                <td className="px-1 py-1 text-center border-b border-gray-600">
                  {(flu.montant <= flu.montantPaye) ? (
                    <span className="text-green-400">Payé</span>
                  ) : (
                    <span className="text-red-500">Res a payé</span>
                  )}
                </td>
                <td className="text-center">
                  
                  <Link to={`/facturepaiementd/${flu._id}`} className="px-2 py-1 m-1 text-center btn text-yellow-600 border-t-pink-600">
                    <FaPrint />
                  </Link>
                  <button
                    className="bg-pink-500 hover:bg-pink-900 text-blue-200 px-2 py-1 rounded-md"
                    onClick={() => suprimerelement(flu._id)}
                  >
                    <MdAutoDelete size={20} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
