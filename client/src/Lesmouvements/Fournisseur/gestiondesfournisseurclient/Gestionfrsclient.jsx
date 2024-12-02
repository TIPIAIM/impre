import React from 'react';
import { motion } from 'framer-motion';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { FcBusinesswoman, FcConferenceCall } from 'react-icons/fc';

const Gestionfrsclient = () => {
  const buttonVariants = {
    hover: { scale: 0.8, backgroundColor: '#222' }, // Effet de surbrillance au survol
    tap: { scale: 0.9 }, // Effet de réduction de taille lors du clic
  };

  return (
    <div className=' bg-gray-950 px-4' style={{ backgroundImage: `url('/pictures/clientparleho.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className=" bg-gradient-to-tr  py-3 px-5">
        <Link to="/adminfils" className=''>
          <IoMdCloseCircleOutline size={30} className="bg-blue-200 hover:bg-black rounded-full animate-pulse" />
        </Link>
      </div>
      <div className="flex justify-center items-center h-screen">
        <div className="md:flex justify-center items-center">
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" className="m-4">
            <Link to="/fournisseurclient" className="no-underline text-xl font-serif font-bold">
              <motion.button
                className="flex button-shine flex-col text-black items-center py-4 px-8 bg-gradient-to-bl from-orange-950 bg-blue-600   rounded-lg cursor-pointer transition duration-300 ease-in-out transform hover:bg-blue-950"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FcBusinesswoman className="mb-2" style={{ color: 'black' }} size={60} />
                <span>Ajouter fournisseur</span>
              </motion.button>
            </Link>
          </motion.div>
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" className="m-4">
            <Link to="/listeFournisseurclient" className="no-underline text-xl font-serif font-bold">
              <motion.button
                className="flex flex-col button-shine items-center py-4 px-8 bg-gradient-to-bl from-orange-950 bg-blue-600 text-black rounded-lg cursor-pointer transition duration-300 ease-in-out transform hover:bg-blue-950"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FcConferenceCall className="mb-2" style={{ color: 'black' }} size={56} />
                <span>Liste des fournisseurs </span>
              </motion.button>
            </Link>
          </motion.div>
         
        </div>
      </div>
    </div>
  );
}

export default Gestionfrsclient;
