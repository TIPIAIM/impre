import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import EtapaieAchatModelhh from "./EtapaieAchatModel";

gsap.registerPlugin(ScrollTrigger);

export default function AchatRecupliste7() {
  const [fluxs, setFlux] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 2000 });
    axios.get(`${import.meta.env.VITE_APIserveur}/listeachatoucharge`)
      .then(result => setFlux(result.data))
      .catch(err => console.log(err));
  }, []);

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()} à ${dateObj.getHours()}h${dateObj.getMinutes()}m`;
  };

 
  // Trier les flux par date en ordre décroissant et prendre les 7 premiers
  const recentFlux = fluxs.sort((a, b) => new Date(b.dateajout) - new Date(a.dateajout)).slice(0,8 );

  return (
    <div className="bg-gray-900 rounded"> 
    <div className=" flex text-center ">
    <EtapaieAchatModelhh/> 
    <p className="text-sm text-zinc-400 text-center "> Les  enregistrements d'achat recents : </p>    
     </div>
      <div className=" text-sm overflow-x-auto bg-gradient-to-tr from-purple-00 bg-gray-950">
        <table className=" text-sm text-white table-auto w-full border-collapse">
          <thead className="bg-gradient-to-tr bg-blue-400 from-gray-950 rounded-2xl">
            <tr className="bg-gradient-to-tr bg-blue-400 from-gray-950 rounded-2xl">
            <th className="px-1 py-1 text-center border-b border-yellow-500">N° fournisseurs</th>
                <th className="px-1 py-1 text-center border-b border-yellow-500">Qtités</th>
                <th className="px-1 py-1 text-center border-b border-yellow-500">Date d'enr</th>
                <th className="px-1 py-1 text-center border-b border-yellow-500">Montants </th>
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
                  <td className="px-1 py-1  border-l border-b border-r border-blue-500">{flu.idfourniseur}</td>
                  <td className="px-1 py-1 text-center border-b border-r border-blue-500">{flu.quantite}</td>
                  <td className="px-1 py-1 text-center border-b border-r border-blue-500">{formatDate(flu.date)}</td>
                  <td className="px-1 py-1 text-center border-b border-r border-blue-500">{flu.montant}</td>
                 
               
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
