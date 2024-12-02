import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from "axios";
import { GiReturnArrow } from "react-icons/gi";

export default function Fournisseurs() {
  const [values, setValues] = useState({
    name: '',
    nometprenom: '',
    adresse: '',
    dateajout:'',
    telephone: '',
    solde: '',
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_APIserveur}/ajoutFournisseur`, values)
      .then(result => {
        console.log(result);
        navigate('/listeFournisseur');
      })
      .catch(err => console.log(err));
  };

  return (
    <motion.div className="bg-gray-900 bg-center"
      style={{ backgroundImage: `url('/pictures/clientparleho.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className=" justify-center">
        
        <Link to="/gestionfournisseur" className="animate-pulse mx-6 my-3 bg-pink-800 text-white font-serif font-bold">
          <GiReturnArrow size={30} style={{ color: "blue" }} />
        </Link>
      
      </div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-gradient-to-br from-gray-200 p-2 rounded shadow-md">
            <motion.form onSubmit={handleSubmit} className="px-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
           <div className="mb-2">
                <input
                  type="texte"
                  id="solde"
                  required
                  placeholder=" Nom de l'entreprise "
                  value={values.solde}
                  className=" text-nowrap font-serif text-center font-extrabold rounded-full   bg-gray-600 text-blue-600  mt-1 p-2   w-full focus:outline-none "
                  onChange={e => setValues({ ...values, solde: e.target.value })} />
              </div> 
               <div className="flex justify-center items-center">
            
                <div className="mb-2 flex justify-center items-center">
                  <input
                    type="text"
                    id="name"
                    className=" bg-gray-300 text-sm text-center font-semibold text-blue-800 mt-1 p-2 border border-gray-400  w-full focus:outline-none focus:ring focus:border-blue-500"
                    required
                    placeholder="Nom du fournisseur "
                    style={{ width: "200px" }}
                    onChange={e => setValues({ ...values, name: e.target.value })} />
                </div>
                            <div className="mb-2">
                <input
                  type="text"
                  id="nometprenom"
                  required
                  placeholder="Prenom "
                  value={values.nometprenom}
                  className="text-sm font-semibold text-center bg-gray-300 text-blue-800 mt-1 p-2 border border-gray-300 w-full focus:outline-none focus:ring focus:border-blue-500"
                  onChange={e => setValues({ ...values, nometprenom: e.target.value })}
                   />
              </div>  
             </div>
              
             <div className="flex justify-center items-center">
          
               
             <div className="mb-2">
                <input
                  type="texte"
                  id="adresse"
                  required
                  placeholder="L'adresse de l'entrep "
                  value={values.adresse}
                  className="text-sm text-center font-semibold text-gray-600 mt-1 p-2 border border-gray-300 w-full focus:outline-none focus:ring focus:border-blue-500"
                  onChange={e => setValues({ ...values, adresse: e.target.value })} />
              </div> 
              <div className="mb-2">
                <input
                  type="number"
                  id="telephone"
                  required
                  placeholder="Tel fournisseur "
                  value={values.telephone}
                  className="text-sm font-semibold text-center text-gray-600 mt-1 p-2 border border-gray-300  w-full focus:outline-none focus:ring focus:border-blue-500"
                  onChange={e => setValues({ ...values, telephone: e.target.value })} />
              </div> 
              </div>

             

              <div className="flex justify-center items-center">
              <motion.button type="submit"
                className="bg-gray-900 animate-pulse text-white py-2 px-4  hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500">
                Valider
              </motion.button>
              <div className="mb-2">
                <input
                  type="datetime-local"
                  id="dateajout"
                  required
                  style={{ width: "200px" }}
                  placeholder="Date d'eregistrement "
                  value={values.dateajout}
                  className="text-sm text-center bg-gradient-to-br from-gray-200 font-semibold text-gray-600 mt-1 p-2 border   w-full focus:outline-none focus:ring focus:border-blue-500"
                  onChange={e => setValues({ ...values, dateajout: e.target.value })} />
              </div>
              
              </div>
            </motion.form>
          </div>
        </div>
        
      </div>
    </motion.div >
  );
}