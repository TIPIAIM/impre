import React from 'react';
import './pagedechoix.css';
import { GoHomeFill } from 'react-icons/go';
import Machineaecrire from './Machineaecrire';

export default function Pagedechoix() {

  return (
    <div className={`min-h-screen flex flex-col`}>

      <header className="bg-purple-950 text-white py-2 px-2 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
        
            <img src="/pictures/dIKOBLOGO.jpg" alt="international" className="m-1 h-16 w-16 rounded-2xl" />
        </div>
      </header>

      <main className="relative flex-1 flex items-center justify-center">
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted>
          <source src="/pictures/feuillevid.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 text-center">
          {/* L'Affichage du texte avec changement de couleur */}
          <div className="text-4xl font-bold ">
            <Machineaecrire />
          </div>

        </div>
      </main>

      <footer className="bg-purple-950 text-white py-3 px-3">
        <div className="container mx-auto text-center">
        </div>
      </footer>
    </div>
  );
}
