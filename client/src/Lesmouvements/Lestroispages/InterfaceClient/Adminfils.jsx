import React, { useState, useEffect } from 'react';
import './adminfils.css'; 
import { NavDropdown } from 'react-bootstrap';
import { FaExpand } from 'react-icons/fa'; 
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer'; // Importation du hook useInView pour détecter la visibilité des éléments
import Logout from '../../../Seconnecter/Logout'; 
import { Link } from 'react-router-dom';

function Adminfils() {
  //les États locaux pour le menu déroulant, le mode nuit et l'index du texte courant
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const { ref, inView } = useInView();

  //la Fonction pour basculer entre le mode jour et le mode nuit
  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
  };

  // Liste des textes à afficher, chacun avec une couleur spécifique
  const texts = [
    { text: 'Bonjour vous allez bien ? ', color: 'text-blue-700' },
    { text: 'Bienvenue sur notre plteforme', color: 'text-green-500' },
    { text: 'Que pouvons-nous faire pour vous ?', color: 'text-yellow-800' },
    { text: 'Pour vos requêtes, nous vous proposons :', color: 'text-purple-800' },
    { text: "De divers prestation de serice", color: 'text-purple-400' },
    { text: 'Gestion des ventes', color: 'text-pink-500' },
    { text: 'Gestion des stocks', color: 'text-indigo-900' },
    { text: 'Services', color: 'text-orange-800' },
    { text: 'Contactez-nous dans notre rubrique message si vous êtes client', color: 'text-teal-800' },
    { text: 'Merci de votre visite ', color: 'text-gray-800' }
  ];

  // Effet pour changer le texte affiché toutes les 3 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000); //l Change le texte toutes les 3 secondes

    //e Nettoie l'intervalle à la fin du cycle de vie du composant
    return () => clearInterval(interval);
  }, [texts.length]);

  // je Détermine les classes de style en fonction du mode (jour ou nuit)
  const nightModeClass = isNightMode ? 'bg-gray-950 text-white' : 'bg-white text-gray-900';

  return (
    <div className={`min-h-screen flex flex-col ${nightModeClass}`}>
    
      <motion.header className="bg-gray-950 text-white py-2 px-2 shadow-md"
        initial={{ opacity: 0, y: -50 }} // Démarre avec une opacité de 0 et un décalage vers le haut
        animate={{ opacity: 1, y: 0 }} // Termine avec une opacité de 1 et un retour à la position d'origine
        transition={{ duration: 1 }} // Transition sur 1 seconde
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/adminfils" className="font-serif ">
          <img src="/pictures/dIKOBLOGO.jpg" alt="international" className="m-1 h-16 w-16 rounded-2xl" />
          </Link>
          <div className="flex items-center space-x-4">
            {/* Menu déroulant pour "" */}
            <NavDropdown title="Gestion clients" id={`offcanvasNavbarDropdown-expand-${FaExpand}`} className="text-white hidden md:block">
              <div className="font-serif bg-gray-600">
                <NavDropdown.Item href="/gestionclientclient">Gestion clients</NavDropdown.Item>
              </div>
            </NavDropdown>

            {/* Menu déroulant pour "Documents" */}
            <NavDropdown title="Ventes et Stock" id={`offcanvasNavbarDropdown-expand-${FaExpand}`} className="text-white hidden md:block">
              <div className="font-serif bg-gray-600">
                <NavDropdown.Item href="/gestionstocketvntecl">Gestion des ventes et stock</NavDropdown.Item>
              </div>
            </NavDropdown> 
            <NavDropdown title="Fournisseurs" id={`offcanvasNavbarDropdown-expand-${FaExpand}`} className="text-white hidden md:block">
              <div className="font-serif bg-gray-600">
                <NavDropdown.Item href="/gestionfournisseurclient">Gestion des fourniseur</NavDropdown.Item>
              </div>
            </NavDropdown>
            <NavDropdown title="Achats et Charge" id={`offcanvasNavbarDropdown-expand-${FaExpand}`} className="text-white hidden md:block">
              <div className="font-serif bg-gray-600">
                <NavDropdown.Item href="/gestionachatouchargecl">Achats et charge</NavDropdown.Item>
              </div>
            </NavDropdown>        

            {/* Bouton pour basculer entre le mode jour et le mode nuit */}
            <button className="text-white" onClick={toggleNightMode}>
              {isNightMode ? <BsFillSunFill size={24} /> : <BsFillMoonFill size={24} />}
            </button>

            {/* Bouton pour ouvrir le menu sur les appareils mobiles */}
            <button className="text-white md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Menu mobile visible uniquement si le menu est ouvert */}
        {menuOpen && (
          <nav className="md:hidden bg-gray-800">
            <div className="container mx-auto flex flex-col py-2">
              <NavDropdown title="Dérouler moi..." id={`offcanvasNavbarDropdown-expand-${FaExpand}`} className="text-white">
                <div className="font-serif bg-gray-600">
                  <NavDropdown.Item href="/gestionclientclient">Gestion clients</NavDropdown.Item>
                  <NavDropdown.Item href="/gestionstocketvntecl">Ventes et stock</NavDropdown.Item>
                  <NavDropdown.Item href="/gestionfournisseurclient">Gestion frnisseurs</NavDropdown.Item>
                  <NavDropdown.Item href="/gestionachatouchargecl">Gestion d'achats</NavDropdown.Item>
                </div>
              </NavDropdown>
            </div>
          </nav>
        )}
      </motion.header>

      {/* Section principale avec animation */}
      <motion.main className="relative flex-1 flex items-center justify-center"
        initial={{ opacity: 0, y: -50 }} // Démarre avec une opacité de 0 et un décalage vers le haut
        animate={{ opacity: 1, y: 0 }} // Termine avec une opacité de 1 et un retour à la position d'origine
        transition={{ duration: 1, delay: 0.5 }} // Transition sur 1 seconde avec un délai de 0.5 seconde
      >
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted>
          <source src="/pictures/feuillevid.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 text-center" ref={ref}>
          <motion.div className={`text-4xl font-bold ${texts[currentTextIndex].color}`}
            initial={{ opacity: 0, y: -20 }} // Démarre avec une opacité de 0 et un décalage vers le haut
            animate={inView ? { opacity: 1, y: 0 } : {}} // Anime à opacité 1 et position d'origine si dans la vue
          >
            {texts[currentTextIndex].text}
          </motion.div>
        
          <Logout />
        </div>
      </motion.main>

      <footer className="bg-gray-950 text-white py-1 px-1">
        <div className="container mx-auto text-center">
        
          <button
            className="bg-gray-500 hover:bg-gray-300 text-white font-bold py-2 px-2 rounded"
            onClick={toggleNightMode}
          >
            {isNightMode ? 'J' : 'N'}
          </button>
        </div>
      </footer>
    </div>
  );
}

export default Adminfils; 
