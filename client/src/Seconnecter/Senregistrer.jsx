import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion'; // Pour les animations fluides
import { Typewriter } from 'react-simple-typewriter'; // Pour l'effet de machine à écrire
import { Link, useNavigate } from 'react-router-dom'; // Pour la navigation
import { FcDownRight } from 'react-icons/fc';

// Styled components pour le conteneur principal
const Container = styled.div`
  display: flex;
  flex-direction: column; // Pour permettre l'ajout d'un bouton de sortie en bas
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(535deg, #1f2937, #0f0f0f, #1f2937);
  padding:20px;
`;

// Styled components pour le formulaire
const Form = styled(motion.form)`
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 0 15px rgba(535deg, #1f2937, #0f0f0f, #1f2937);
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 450px;
  text-align: center;
`;

// Styled component pour le titre
const Title = styled(motion.h2)`
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
`;

// Styled components pour les champs de saisie
const Input = styled(motion.input)`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Select = styled(motion.select)`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

// Styled component pour le bouton
const Button = styled(motion.button)`
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

// Styled component pour le message d'erreur
const Message = styled.p`
  color: red;
`;

// Styled component pour le lien de connexion
const LoginLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s;

  &:hover {
    color: #0056b3;
  }
`;

// Styled component pour le bouton de sortie
const ExitButton = styled(motion.button)`
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #d32f2f;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Senregistrer = () => {
  const [name, setName] = useState(''); // État pour le champ "Nom"
  const [email, setEmail] = useState(''); // État pour le champ "Email"
  const [password, setPassword] = useState(''); // État pour le champ "Mot de passe"
  const [role, setRole] = useState(''); // État pour le champ "Rôle"
  const [errorMessage, setErrorMessage] = useState(''); // État pour les messages d'erreur


  // États pour contrôler la visibilité des champs
  const [showEmail, setShowEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRole, setShowRole] = useState(false);

  const navigate = useNavigate(); // Utilisé pour la navigation vers d'autres pages

  // Fonction pour gérer l'enregistrement de l'utilisateur
  const handleRegister = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
    try {
      const response = await axios.post(`${import.meta.env.VITE_APIserveur}/EnregistrerdanslaDB`, { name, email, password, role });
      if (response.data) {
        alert("Enregistrement réussi ! "); // Alerte de succès
        navigate('/seconnecter'); // Redirige l'utilisateur vers la page de connexion après enregistrement
      } else {
        setErrorMessage(response.data.message); // Affiche le message d'erreur
      }
    } catch (error) {
      setErrorMessage("Erreur d'enregistrement"); // Affiche une erreur générale en cas de problème
    }
  };
  // Fonction pour afficher le champ suivant
  const showNextField = (setShowField) => {
    setTimeout(() => setShowField(true), 300); // Affiche le champ suivant après un délai de 300ms
  };

  return (
    <Container
    style={{ backgroundImage: 
      `url('/pictures/dickob.jpg')`,
       backgroundSize: 'cover', 
       backgroundPosition: 'center'
        }}
    >
      <Form
      className='bg-black'
        onSubmit={handleRegister}
        initial={{ opacity: 0, y: -50 }} // Position de départ pour l'animation d'apparition
        animate={{ opacity: 1, y: 0 }} // Animation d'apparition du formulaire
        transition={{ duration: 0.5 }} // Durée de l'animation d'apparition
      >
        <Title
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }} // Délai pour l'apparition du titre
        >
          <Typewriter
          className=' text-sm'
            words={['Page d`enregistrement','Saisissez vos informations','Mettez le bonnes informations']}
            loop={false} // N'affiche qu'une seule fois l'animation
            cursor
            cursorStyle="_"
            typeSpeed={70} // Vitesse de frappe
            deleteSpeed={50} // Vitesse de suppression
          />
        </Title>
        {errorMessage && <Message>{errorMessage}</Message>} {/* Affiche un message d'erreur si présent */}
        <Input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (e.target.value.trim() !== '') showNextField(setShowEmail); // Affiche le champ "Email" si le champ "Nom" est rempli
          }}
          required
          whileFocus={{ scale: 1.05 }} // Animation au focus
        />
        {showEmail && (
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (e.target.value.trim() !== '') showNextField(setShowPassword); // Affiche le champ "Mot de passe" si le champ "Email" est rempli
            }}
            required
            initial={{ opacity: 0, x: -20 }} // Position de départ pour l'animation d'apparition
            animate={{ opacity: 1, x: 0 }} // Animation d'apparition
            transition={{ duration: 0.3 }} // Durée de l'animation
            whileFocus={{ scale: 1.05 }} // Animation au focus
          />
        )}
        {showPassword && (
          <Input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (e.target.value.trim() !== '') showNextField(setShowRole); // Affiche le champ "Rôle" si le champ "Mot de passe" est rempli
            }}
            required
            initial={{ opacity: 0, x: -20 }} // Position de départ pour l'animation d'apparition
            animate={{ opacity: 1, x: 0 }} // Animation d'apparition
            transition={{ duration: 0.3 }} // Durée de l'animation
            whileFocus={{ scale: 1.05 }} // Animation au focus
          />
        )}
        {showRole && (
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            initial={{ opacity: 0, x: -20 }} // Position de départ pour l'animation d'apparition
            animate={{ opacity: 1, x: 0 }} // Animation d'apparition
            transition={{ duration: 0.3 }} // Durée de l'animation
            whileFocus={{ scale: 1.05 }} // Animation au focus
          >
            <option value="admin"><FcDownRight/></option>
            <option value="client">L'administrateur </option>
            <option value="visiteur">Assistant </option>

            
          </Select>
        )}
        {showRole && (
          <Button type="submit" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}> {/* Animation au survol et au clic */}
            Enregistrer
          </Button>
        )}
       <p>
          Déjà un compte ? <LoginLink to="/seconnecter">Connectez-vous ici</LoginLink> {/* Lien vers la page de connexion */}
       </p>
      </Form>
      <ExitButton
        onClick={() => navigate('/admindasboardgenerale')} // Redirige vers la page d'accueil
        whileHover={{ scale: 1.1 }} // Animation au survol
        whileTap={{ scale: 0.9 }} // Animation au clic
      >
        Quitter
      </ExitButton>
    </Container>
  );
};

export default Senregistrer;
