import React, { useState, useEffect } from 'react'; // Importation des hooks React useState et useEffect
import { Navbar, Nav, Offcanvas, Container } from 'react-bootstrap'; // Importation des composants de navigation de React Bootstrap
import { gsap } from 'gsap'; // Importation de GSAP pour les animations
import { Link } from 'react-router-dom'; // Importation de Link pour la navigation entre les pages
import './Latetenavigdebale.css'; // Importation des styles spécifiques à ce composant
import AOS from 'aos'; // Importation d'AOS pour les animations de défilement
import 'aos/dist/aos.css'; // Importation du fichier CSS d'AOS pour les styles d'animation
//import { FaHandHoldingMedical } from 'react-icons/fa6';
import { Tooltip } from 'react-tooltip'; // Importation nommée de Tooltip
// Logout from '../../../Seconnecter/Logout';
import Header from './Header';
import { FcComboChart, FcCurrencyExchange, FcDebt, FcFactory, FcGoodDecision, FcInTransit, FcPortraitMode, FcReading, FcReuse, FcStatistics } from 'react-icons/fc';
import Logout from '../../../Seconnecter/Logout';

// Fonction principale du composant
export default function NavbarLateral() {
  const [show, setShow] = useState(false); // État pour gérer l'affichage de l'Offcanvas
  const [activeLink, setActiveLink] = useState(''); // État pour suivre le lien de navigation actif

  // Effet pour initialiser AOS et appliquer des animations avec GSAP
  useEffect(() => {
    AOS.init({ duration: 2000 }); // Initialisation d'AOS avec une durée d'animation de 2000ms
    gsap.from('.nav-item', {
      opacity: 0, // Opacité initiale
      y: -10, // Position initiale en Y
      stagger: 0.2, // Décalage entre les animations des éléments
      ease: 'power2.out', // Type d'animation easing
      duration: 1, // Durée de l'animation
    });
  }, []);

  // LaFonction pour fermer l'Offcanvas
  const handleClose = () => setShow(false);

  //LA Fonction pour ouvrir l'Offcanvas
  const handleShow = () => setShow(true);

  //La Fonction pour gérer le clic sur les liens de navigation
  const handleNavClick = (link) => {
    setActiveLink(link); // Définit le lien actif
    handleClose(); // Ferme l'Offcanvas
  };

  //La Liste des éléments de navigation avec leurs icônes et labels
  const navItems = [
    { href: '/adminfils', icon: <FcFactory className="mr-4" size={40} />, label: 'Page visiteur' },
    { href: '/senregistrer', icon: <FcGoodDecision className="mr-4" size={40} />, label: 'Ajouter un User' },
    { href: '/listeclient', icon: <FcPortraitMode className="mr-4" size={40} />, label: 'Gerer les Clients' },
    { href: '/listeFournisseur', icon: <FcInTransit className="mr-4" size={40} />, label: 'Gerer les Fournisseurs' },
    { href: '/achatchargeliste', icon: <FcComboChart  className="mr-4" size={40} />, label: 'Afficher les charges' },
    { href: '/Ajoutstock', icon: <FcReuse className="mr-4" size={40} />, label: 'Alimenter le stock' },
    { href: '/listedesstock', icon: <FcReading className="mr-4" size={40} />, label: 'L" etat ou liste du stock' },
    { href: '/listesell', icon: <FcDebt className="mr-4" size={40} />, label: 'L"etat des payements' },
    { href: '/sellProduitpaie', icon: <FcCurrencyExchange className="mr-4" size={40} />, label: ' Paiement Factures' },
  ];

  return (
    <div className='bg-gray-00 flex'>
      {/*Le Lien autour du composant Header pour rediriger vers /gestionclient */}
      <Link
              data-tooltip-id="moninfo" // Identifiant de l'infobulle (mise à jour)
              data-tooltip-content="Gestion des rendez-vous et rappel" // Texte de l'infobulle (mise à jour)
      to='/admindasboardgenerale'>
        <Header />  
      </Link>
      <Tooltip className=' bg-green-400' delayHide={500} delayShow={100} theme="dark"  id="moninfo" place="top"  effect="solid" /> {/* Infobulle */}

      <Navbar className='container   bg-gray-950' expand={false}>
        <Container fluid>
          {/*Pour Toggle pour afficher/masquer l'Offcanvas */}
          <Navbar.Toggle className="animate-pulse " aria-controls="offcanvasNavbar" onClick={handleShow}>
            <FcStatistics className='  hover:bg-pink-800 rounded-lg' size={30} color="white" />
          </Navbar.Toggle>
          <Navbar.Toggle className="animate-pulse " aria-controls="offcanvasNavbar" onClick={handleShow}>
            <img src="/pictures/dIKOBLOGO.jpg" alt="international" className="m-1 h-16 w-16 rounded-2xl" />
          </Navbar.Toggle>
          
          {/*poue Offcanvas pour la navigation */}
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end" // Placement de l'Offcanvas (à droite)
            show={show} // Contrôle de l'affichage de l'Offcanvas
            onHide={handleClose} // Action à effectuer lorsque l'Offcanvas est masqué
          >
            <Offcanvas.Header className=' bg-gray-900' closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                {/*le Composant Logout pour se déconnecter */}
                <Logout />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className='bg-gray-900'>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {/*il Boucle sur les éléments de navigation pour les afficher */}
                {navItems.map((item, index) => (
                  <Nav.Link
                    key={index}
                    href={item.href}
                    className={`d-flex align-items-center nav-item ${activeLink === item.href ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.href)}
                  >
                    {item.icon} <span className="nav-label">{item.label}</span>
                  </Nav.Link>
                ))}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}
