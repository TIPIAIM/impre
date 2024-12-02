import React from 'react'; 
import styled from 'styled-components'; //L' Importation de styled-components pour le style des composants
import { motion } from 'framer-motion'; //L' Importation de framer-motion pour les animations

// Le Styled component pour le conteneur de l'en-tête
const HeaderContainer = styled.header`
  display: flex; // Utilisation de Flexbox pour aligner les éléments
  justify-content: space-between; // Espacement égal entre les éléments enfants
  align-items: center; // Alignement vertical centré des éléments
  padding: 1rem; // Ajout de padding autour de l'en-tête
  background-color: #0f172a; // Couleur de fond de l'en-tête
  border-bottom: 0px solid #dee2e6; // Bordure inférieure de l'en-tête (0px donc invisible)
`;

// Le Styled component pour l'Affichage avec animation framer-motion
const Affichage = styled(motion.img)`
  width: 50px; // Largeur de l'Affichage
  height: 50px; // Hauteur de l'Affichage
  border-radius: 50%; // Affichage en forme de cercle
`;

//Le Composant fonctionnel Header
const Header = () => {
  return (
    <HeaderContainer className='rounded-r-full bg-gray-950'>
      {/*L' Affichage de l'utilisateur avec effet de hover */}
      <Affichage
        src="/pictures/dickob.jpg" 
        alt="mon img" //Le Texte alternatif pour l'Affichage
        whileHover={{ scale: 1.4 }} // L'Animation de framer-motion à appliquer au survol
        transition={{ type: 'spring', stiffness: 800 }} //Le Paramètres de la transition d'animation
      />
      
    </HeaderContainer>
  );
};

export default Header;
