import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdAutoDelete } from "react-icons/md";
import AOS from 'aos';
import 'aos/dist/aos.css';
import EtapaiefrsModelhh from "./EtapaiefrsModel";
import { Button } from "react-bootstrap"; 
import { Link } from "react-router-dom";  
import { ImPencil2 } from "react-icons/im";
import axios from "axios"; 
import { motion } from 'framer-motion'; 

gsap.registerPlugin(ScrollTrigger);

export default function SellRecuplifrs7() {
  const [flus, setflu] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 2000 });
    axios.get(`${import.meta.env.VITE_APIserveur}/listeFournisseur`)
      .then(result => setflu(result.data))
      .catch(err => console.log(err));
  }, []);

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()} à ${dateObj.getHours()}h${dateObj.getMinutes()}m`;
  };

  const suprimerelement = (id) => {
    axios.delete(`${import.meta.env.VITE_APIserveur}/deleteFournisseur/${id}`)
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  // Trier les flu par date en ordre décroissant et prendre les 7 premiers
  const recentflu = flus.sort((a, b) => new Date(b.dateajout) - new Date(a.dateajout)).slice(0, 8);

  return (
    <div className="bg-gray-900 rounded">
      <div className=" flex text-center ">
        <EtapaiefrsModelhh />
        <p className="text-sm text-zinc-400 text-center "> Les Fournisseurs recents : </p>
      </div>
      <div className=" text-sm overflow-x-auto bg-gradient-to-tr from-purple-00 bg-gray-950">
        <table className=" text-sm text-white table-auto w-full border-collapse">
          <thead className='bg-gradient-to-tr bg-blue-400 from-gray-950 rounded-2xl'>
            <tr>
              <th className="px-2 py-2 text-center border-b border-green-600" style={{ width: '100px' }}>Entreprises</th>
              <th className="px-2 py-2 text-center border-b border-green-600" style={{ width: '100px' }}>Prenoms</th>
              <th className="px-2 py-2 text-center border-b border-green-600" style={{ width: '120px' }}>Dates</th>
              <th className="px-2 py-2 text-center border-b border-green-600" style={{ width: '100px' }}>Adresses</th>
              <th className="px-2 py-2 text-center border-b border-green-600" style={{ width: '90px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentflu.map((flu) => (
              <motion.tr
                key={flu._id}
                className="flu-row"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <td className="px-2 py-2 border-l border-b border-r border-blue-500">{flu.solde}</td>
                <td className="px-2 py-2 border-l border-b border-r border-blue-500">{flu.nometprenom}</td>
                <td className="px-2 py-2 border-l border-b border-r border-blue-500">{flu.adresse}</td>
                <td className="px-2 py-2 border-l border-b border-r border-blue-500" style={{ width: '90px' }}>{flu.telephone}</td>
                <td className="text-center px-2 py-2 border-b border-r border-blue-500">

                  {/* Lien pour éditer l'flu 
                  <Link to={`/Miseajourfrs/${flu._id}`} className="text-center btn btn-warning">
                    <ImPencil2 />
                  </Link>*/}
                  {/* Bouton pour supprimer l'flu */}
                  <Button className="btn btn-danger mx-2 text-center" onClick={() => suprimerelement(flu._id)}>
                    <MdAutoDelete />
                  </Button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
