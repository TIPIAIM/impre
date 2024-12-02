import React, { useState } from 'react'; // Importation de React et du hook useState
import './Orror.css'; // Importation des styles spécifiques à ce composant
import { Button } from 'react-bootstrap'; // Importation du bouton de React Bootstrap
import { Typewriter } from 'react-simple-typewriter'; // Importation du composant Typewriter de react-simple-typewriter

export default function Orror() {
  const texts = [
    { text: 'Bonjour vous allez bien ?', color: 'text-blue-700' },
    { text: 'Bienvenue ', color: 'text-green-500' },
    { text: "Vous êtes actuellement sur la page d'erreur", color: 'text-yellow-800' },
    { text: 'Cliquez sur le bouton "Bonne page"', color: 'text-teal-800' },
    { text: 'Merci de votre visite', color: 'text-gray-800' }
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0); // État pour suivre l'index du texte actuellement affiché

  return (
    <div className={`min-h-screen flex flex-col`}>
      <header className="bg-gray-900 text-white py-1 px-1 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <a href="#" className="text-2xl font-serif font-bold animate-gradient-x">
            Dikob Prestation
          </a>
        </div>
      </header>

      <main className="relative flex-1 flex items-center justify-center">
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted>
          <source src="/pictures/rir.mp4" type="video/mp4" />
        </video>
        <div className="relative bg-gray-400 z-10 text-center">
          {texts.map((item, index) => (
            <div key={index} className={`text-4xl font-bold ${item.color}`}>
              {currentTextIndex === index && (
                <Typewriter
                  words={[item.text]} // Affiche le texte correspondant
                  loop={1} // N'affiche chaque texte qu'une seule fois avant de passer au suivant
                  cursor // Affiche le curseur de la machine à écrire
                  cursorStyle="|" // Style du curseur
                  typeSpeed={70} // Vitesse de frappe
                  deleteSpeed={50} // Vitesse d'effacement
                  delaySpeed={1500} // Délai avant de commencer à effacer
                  onType={() => {
                    // Lorsqu'un texte est terminé, on passe au suivant après un délai
                    setTimeout(() => {
                      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
                    }, 1500);
                  }}
                />
              )}
            </div>
          ))}
          <a href="/" className="text-2xl font-serif font-bold animate-gradient-x">
            <Button className="mt-4 animate-bounce bg-gradient-to-tr to-blue-900 from-lime-900 hover:bg-green-700 text-white font-serif font-bold py-2 px-4 rounded button-shine">
              Bonne page
            </Button>
          </a>
        </div>
      </main>

      <footer className="bg-gray-950 text-white py-3 px-2">
        <div className="container mx-auto text-center">
          {/* Footer peut contenir des informations supplémentaires */}
        </div>
      </footer>
    </div>
  );
}
