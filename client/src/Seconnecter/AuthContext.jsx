import React, { createContext, useState } from 'react'; 

// creation du contexte d'authentification Le contexte permet de partager les données d'authentification à travers l'application sans avoir à les passer explicitement via les props
const AuthContext = createContext();

// Définition de mon fournisseur d'authentification Le fournisseur encapsule les composants enfants et fournit les données d'authentification et les fonctions associées
const AuthProvider = ({ children }) => {
  // useState est utilisé pour gérer l'état d'authentification isAuthenticated indique si l'utilisateur est authentifié ou non
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fonction pour connecter l'utilisateur Définit isAuthenticated à true, indiquant que l'utilisateur est connecté
  const login = () => {
    setIsAuthenticated(true);
  };
 
  //la Fonction pour déconnecter l'utilisateur Définit isAuthenticated à false, indiquant que l'utilisateur est déconnecté
  const logout = () => {
    setIsAuthenticated(false);
  };

  // Le composant AuthProvider encapsule ses enfants dans un AuthContext.Provider Il passe isAuthenticated, login et logout dans le value du provider .Cela permet aux composants enfants d'accéder à ces valeurs et fonctions via le contexte
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Exportation du contexte et du fournisseur d'authentification AuthContext est utilisé par les composants qui ont besoin d'accéder à l'état d'authentification ou d'appeler les fonctions login et logout  AuthProvider est utilisé pour envelopper les composants qui doivent être informés de l'état d'authentification
export { AuthContext, AuthProvider };
