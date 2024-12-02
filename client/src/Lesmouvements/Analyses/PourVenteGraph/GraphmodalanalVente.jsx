import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FcReading } from 'react-icons/fc'; 
import Graphmoyenpayement from './Graphmoyenpayement';

export default function GraphmodalanalVente() {
  const [show, setShow] = useState(false); // État pour gérer la visibilité du modal.
  const [fullscreen, setFullscreen] = useState(true); // État pour gérer le plein écran du modal.

  // Fonction pour ouvrir le modal et le rendre plein écran.
  function ouvrirShow(breakpoint) {
    setFullscreen(breakpoint); // Définit si le modal doit être en plein écran.
    setShow(true); // Affiche le modal.
  }

  return (
    <>
      {/* Affichage d'un bouton qui ouvre le modal en plein écran lorsqu'il est cliqué. */}
      <button className="animate-pulse mx-2 rounded-full text-xs" onClick={() => ouvrirShow(true)}>
        <FcReading className="animate-pulse rounded-full bg-gray-900" size={30} />
      </button>

      {/* Composant Modal pour afficher le contenu en surimpression. */}
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        {/* En-tête du modal avec un bouton pour le fermer. */}
        <Modal.Header className='bg-gray-900' closeButton>
          <Modal.Title className='text-white font-serif font-bold'>Flux financiers par Montants :</Modal.Title>
        </Modal.Header>
        
        {/* Corps du modal où le composant GraphentrerSortie est affiché. */}
        <Modal.Body>
          <Graphmoyenpayement />
        </Modal.Body>
      </Modal>
    </>
  );
}
