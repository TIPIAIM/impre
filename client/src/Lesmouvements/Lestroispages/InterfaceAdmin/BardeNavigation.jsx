import React, { useState } from 'react'; // Importation de React pour créer un composant fonctionnel et utiliser l'état local avec useState
import styled from 'styled-components'; // Importation de styled-components pour créer des composants stylisés avec CSS en JS
import NavbarLateral from './Latetenavigdebale';
import { FcBusinesswoman, FcCurrencyExchange, FcDebt, FcShipped } from 'react-icons/fc';

//le Styled component pour le conteneur de la navigation
const Nav = styled.nav`
  background-color: #0f172a; // Couleur de fond de la navigation
  color: white; // Couleur du texte
  display: flex; // Utilisation de Flexbox pour aligner les éléments
  justify-content: space-around; // Espacement égal entre les éléments enfants
  align-items: center; // Alignement vertical centré des éléments
  padding: 0rem; // Pas de padding autour de la navigation

  // Styles pour les écrans de taille inférieure à 768px (réactif)
  @media (max-width: 768px) {
    flex-direction: column; // Changement de direction des éléments en colonne
    align-items: flex-start; // Alignement des éléments au début du conteneur
    padding: 0.5rem; // Ajout de padding autour de la navigation
  }
`;

//le Styled component pour les liens de navigation
const NavLink = styled.a`
  color: white; // Couleur du texte du lien
  text-decoration: none; // Suppression de la décoration de texte (soulignement)
  padding: 1.5rem 2rem; // Ajout de padding interne autour du lien
  position: relative; // Position relative pour permettre l'utilisation de ::before
  transition: all 0.3s ease; // Transition douce pour tous les changements
  white-space: nowrap; // Empêche le retour à la ligne pour le texte

  // Style de fond pour le survol
  &:hover {
    background-color: #2f171b; // Couleur de fond lors du survol
  }

  // Pseudo-élément ::before pour l'animation de soulignement
  &::before {
    content: ''; // Contenu vide
    position: absolute; // Position absolue pour le positionner en bas
    bottom: 0; // Alignement en bas
    left: 0; // Alignement à gauche
    width: 0%; // Largeur initiale de 0%
    height: 3px; // Hauteur de la ligne de soulignement
    background-color: white; // Couleur de la ligne de soulignement
    transition: width 2.3s ease; // Transition douce pour la largeur
  }

  // Animation de la ligne de soulignement au survol
  &:hover::before {
    width: 100%; // Largeur de 100% au survol
  }

  // Styles pour les écrans de taille inférieure à 768px (réactif)
  @media (max-width: 768px) {
    padding: 1rem 1.5rem; // Réduction du padding interne
  }
`;

//le Styled component pour les sous-liens de navigation dans le menu déroulant
const SubNavLink = styled.a`
  display: block; // Affichage en bloc pour remplir toute la largeur disponible
  color: white; // Couleur du texte du sous-lien
  text-decoration: none; // Suppression de la décoration de texte (soulignement)
  padding: 0.5rem 1rem; // Ajout de padding interne autour du sous-lien
  white-space: nowrap; // Empêche le retour à la ligne pour le texte

  // Style de fond pour le survol
  &:hover {
    background-color: #777; // Couleur de fond lors du survol
  }

  // Styles pour les écrans de taille inférieure à 768px (réactif)
  @media (max-width: 768px) {
    padding: 0.5rem 1rem; // Padding identique mais ici pour maintenir la consistance sur mobile
  }
`;

//Le Styled component pour le sous-menu déroulant
const SubMenu = styled.div`
  position: absolute; // Position absolue pour permettre le positionnement relatif aux éléments parents
  top: 100%; // Positionné juste en dessous de l'élément parent
  left: 0; // Alignement à gauche
  background-color: #744; // Couleur de fond du sous-menu
  opacity: 0; // Opacité initiale de 0 (invisible)
  visibility: hidden; // Visibilité initiale cachée
  transition: opacity 0.3s ease, visibility 0.5s ease; // Transition douce pour l'opacité et la visibilité
  z-index: 10; // Niveau de plan z élevé pour apparaître au-dessus des autres éléments

  // Affichage du sous-menu lors du survol du lien parent
  ${NavLink}:hover & {
    opacity: 1; // Opacité de 1 (visible)
    visibility: visible; // Visibilité visible
  }

  // Styles pour les écrans de taille inférieure à 768px (réactif)
  @media (max-width: 768px) {
    position: static; // Position statique pour éviter les problèmes d'affichage
    visibility: visible; // Visibilité toujours visible
    opacity: 1; // Opacité toujours visible
    background-color: #333; // Couleur de fond légèrement différente pour mobile
    width: 100%; // Largeur de 100% pour remplir le conteneur parent
  }
`;

//Le ,composant fonctionnel principal
export default function BardeNavigation() {
  const [activeLink, setActiveLink] = useState(null); // L'État pour suivre le lien actif

  return (
    <>
      <Nav>
        {/* le lien de navigation avec un sous-menu */}
       

        {/* le lien de navigation avec un sous-menu */}
       

        {/* le lien de navigation avec un sous-menu */}
        <NavLink
          href="/gestionclient"
          onMouseEnter={() => setActiveLink('#')}
          onMouseLeave={() => setActiveLink(null)}
        >
          <FcBusinesswoman size={40} /> {/* l'icône de bureau de poste */}
          <SubMenu>
          <SubNavLink href="/gestionclient">Gestion des Clients</SubNavLink> {/*le Sous-lien */}
          </SubMenu>
        </NavLink>

        {/*le Lien de navigation avec un sous-menu */}
        <NavLink
          href="/gestionstocketvnte"
          onMouseEnter={() => setActiveLink('#')}
          onMouseLeave={() => setActiveLink(null)}
        >
          <FcCurrencyExchange  size={40} /> {/*l'icône de document PDF */}
          <SubMenu>
          <SubNavLink href="/gestionstocketvnte">Gestion des Ventes</SubNavLink> {/*le Sous-lien */}
          </SubMenu>
        </NavLink>

        {/*le Lien de navigation avec un sous-menu */}
        <NavLink
          href="/gestionfournisseur"
          onMouseEnter={() => setActiveLink('#')}
          onMouseLeave={() => setActiveLink(null)}
        >
          <FcShipped size={40} /> {/* l'icône de calendrier */}
          <SubMenu>
            <SubNavLink href="/"></SubNavLink>
            <SubNavLink href="/gestionfournisseur">Gestion des Fournisseurs</SubNavLink> {/*le Sous-lien */}
          </SubMenu>
        </NavLink>

        {/*le Lien de navigation avec un sous-menu */}
        <NavLink
          href="/gestionachatoucharge"
          onMouseEnter={() => setActiveLink('#')}
          onMouseLeave={() => setActiveLink(null)}
        >
          <FcDebt size={40} /> {/* Icône de loi */}
          <SubMenu>
          <SubNavLink href="/gestionachatoucharge">Gestion Achat ou charge</SubNavLink> 
          </SubMenu>
        </NavLink>
      </Nav>
      <div className=' rounded-full'>
       <NavbarLateral/>
      </div>
     
    </>
  );
}
