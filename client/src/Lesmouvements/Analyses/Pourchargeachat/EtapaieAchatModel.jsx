import { useState } from 'react'; // Importation du hook useState de React pour gérer l'état local
import Modal from 'react-bootstrap/Modal'; // Importation du composant Modal de react-bootstrap pour les fenêtres modales
import { FcReading } from "react-icons/fc"; // Importation de l'icône FcReading de la bibliothèque react-icons
import AchatRecupliste7pourmod from './AchatRecupliste7pourmod';

export default function EtapaieAchatModelhh() {
  // Déclaration des états avec useState
  const values = [true]; // Tableau contenant une valeur booléenne, utilisé pour définir si la modale doit être en plein écran
  const [fullscreen, setFullscreen] = useState(true); // État pour gérer si la modale doit être affichée en plein écran ou non
  const [show, setShow] = useState(false); // État pour gérer la visibilité de la modale

  // Fonction pour afficher la modale
  function handleShow(breakpoint) {
    setFullscreen(breakpoint); // Met à jour l'état fullscreen pour définir si la modale doit être en plein écran
    setShow(true); // Affiche la modale
  }

  return (
    <>
      {/* Map sur le tableau values pour créer un bouton pour chaque valeur */}
      {values.map((v, idx) => (
        <button 
          key={idx} // Clé unique pour chaque élément de la liste (nécessaire pour React)
          className="rounded-full bg-gray-900" // Styles pour le bouton
          onClick={() => handleShow(v)} // Lorsque le bouton est cliqué, appelle handleShow avec la valeur v
        >
          <FcReading 
            className="animate-pulse rounded-full bg-gray-900" // Styles pour l'icône
            size={30} // Taille de l'icône
          />
          {/* Si v est une chaîne de caractères, affiche un texte conditionnel (utilisé pour un affichage spécifique si besoin) */}
          {typeof v === 'string' && `below ${v.split('-')[0]}`}
        </button>
      ))}
      
      {/* Composant Modal de react-bootstrap */}
      <Modal 
        show={show} // Contrôle la visibilité de la modale
        fullscreen={fullscreen} // Détermine si la modale est affichée en plein écran
        onHide={() => setShow(false)} // Lorsque la modale est fermée, met à jour l'état pour la masquer
      >
        <Modal.Header className='bg-gray-900' closeButton> {/* En-tête de la modale avec un bouton pour fermer */}
          <Modal.Title className='text-white font-serif font-bold'>
            Les Charges ou les achats recents {/* Titre de la modale */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className=' bg-gray-950 '>
          <AchatRecupliste7pourmod/>
        </Modal.Body>
      </Modal>
    </>
  );
}
