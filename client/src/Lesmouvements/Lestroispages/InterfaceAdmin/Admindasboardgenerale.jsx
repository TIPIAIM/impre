
import React, { useEffect, useRef } from 'react'; // Importation de React, ainsi que des hooks useEffect et useRef pour gérer les effets et les références DOM
import { gsap } from 'gsap'; // Importation de GSAP pour les animations
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Importation de ScrollTrigger pour les animations basées sur le défilement
import './admindasboardgen.css'; // Importation des styles spécifiques à ce composant
import BardeNavigation from './BardeNavigation';
import NombreTotalVente from '../../Analyses/Pourvente/Nombvente';
import SellRecupliste7 from '../../Analyses/Pourvente/SellRecupliste7';
import NombreTotalfournisseur from '../../Analyses/PourFournisseur/NombreFournisseur';
import SellRecuplifrs7 from '../../Analyses/PourFournisseur/SellRecuplifrs7';
import NombreTotalstock from '../../Analyses/PourStock/NombreStock';
import AchatRecupliste7 from '../../Analyses/Pourchargeachat/AchatRecupliste7';
import BarChartCategories from '../../Analyses/Payementvent/Graphcategoriepayment';
import Graphmoyenpayement from '../../Analyses/PourVenteGraph/Graphmoyenpayement';
import ProductList7 from '../../Analyses/PourStock/Listestock7';
import Graphcirculaire from '../../Analyses/PourVenteGraph/Graphcirculaireventemontdue';
import Achatchargebaton from '../../Analyses/Pourchargeachat/Achatgraphcircle';
import Achatgraphendate from '../../Analyses/Pourchargeachat/Achatgraphendate';
import Graphcirculaireventemontantpaye from '../../Analyses/PourVenteGraph/Graphcirculaireventemontantpaye';

// Enregistrement du plugin ScrollTrigger avec GSAP
gsap.registerPlugin(ScrollTrigger);

// Composant pour ajouter des animations aux enfants lors du défilement
const AnimatedComponent = ({ children, id }) => {
  const elementRef = useRef(null); // Utilisation de useRef pour créer une référence à l'élément DOM

  useEffect(() => {
    // Animation GSAP pour faire apparaître l'élément avec une transition douce
    gsap.fromTo(
      elementRef.current,
      { opacity: 0, y: -50, scale: 0.8 }, // Démarre avec une opacité de 0, un décalage vers le haut et une échelle réduite
      {
        opacity: 1,
        y: 0,
        scale: 1, // Termine avec une opacité de 1, aucun décalage vertical et une échelle normale
        duration: 2.5, // Durée de l'animation
        scrollTrigger: {
          trigger: elementRef.current, // Déclencheur de l'animation est l'élément actuel
          start: 'top 70%', // L'animation démarre lorsque le haut de l'élément est à 70% de la fenêtre
          end: 'top 20%', // L'animation se termine lorsque le haut de l'élément est à 20% de la fenêtre
          scrub: true // L'animation se synchronise avec le défilement
        }
      }
    );
  }, []);

  return (
    // Rendu de l'élément avec la référence et les enfants passés en tant que props
    <div ref={elementRef} id={id} className="animated-component">
      {children}
    </div>
  );
};

// Composant principal du tableau de bord administratif
export default function Admindasboardgenerale() {
  return (
    <div className=' bg-gray-950'>
      <BardeNavigation />
      <hr />
      <div className="flex overflow-hidden">
        <main className="flex-1 p-1 text-white overflow-auto">



          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="scrollable-area">
            <AnimatedComponent id="ventepayement">
              <div className="space-y-1 ">
                <AnimatedComponent>
                  <div className="bg-gray-800 p-1 rounded shadow">
                    <BarChartCategories />   {/** statis par moyen de payement le nombre par orang, solde cash*/}
                  </div>
                </AnimatedComponent>
              </div>
            </AnimatedComponent>
            <AnimatedComponent id="ventepayemen">
              <div className="space-y-1 ">
                <AnimatedComponent>
                  <div className="bg-gray-800 p-1 rounded shadow">
                    <Graphcirculaire />   {/** statis par moyen de payement par orang, solde donne le montant total du de chacun*/}
                  </div>
                </AnimatedComponent>
              </div>
            </AnimatedComponent>
          </div>




          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="scrollable-area">

            {/* Section pour les analyse vente */}
            <AnimatedComponent id="venteanalyse">
                  <div className="space-y-1">
                    <AnimatedComponent>
                      <div className="bg-gray-800 p-1 rounded shadow">
                        <NombreTotalVente />
                      </div>
                    </AnimatedComponent>

                    <AnimatedComponent>
                      <div className="bg-gray-800 p-1 mb-2 rounded shadow">
                        <SellRecupliste7 /> {/* 7 prmier du tableau */}
                      </div>
                    </AnimatedComponent>
                  </div>
            </AnimatedComponent>
            {/* Section pour les analyse fournisseur */}
            <AnimatedComponent id="fournisseur">
                  <div className="space-y-1">
                    <AnimatedComponent>
                      <div className="bg-gray-800 p-1 rounded shadow">
                        <NombreTotalfournisseur />
                      </div>
                    </AnimatedComponent>
                    
                    <AnimatedComponent>
                      <div className="bg-gray-800 p-1 mb-2 rounded shadow">
                        <SellRecuplifrs7 />
                      </div>
                    </AnimatedComponent>
                  </div>
            </AnimatedComponent>
            {/* Section pour les analyse stock */}
            <AnimatedComponent id="ventestock">
                  <div className="space-y-1">
                    <AnimatedComponent>
                      <div className="bg-gray-800 p-1 rounded shadow">
                        <NombreTotalstock />
                      </div>
                    </AnimatedComponent>
                    
                    <AnimatedComponent>
                      <div className="bg-gray-800 p-1 mb-2 rounded shadow">
                        <AchatRecupliste7 />
                      </div>
                    </AnimatedComponent>
                  </div>
            </AnimatedComponent>
     </div>


     <div className="grid grid-cols-1 md:grid-cols-1 gap-6" id="scrollable-area">
           
           <AnimatedComponent id="achatchargeee">
            <div className="space-y-1 ">
              <AnimatedComponent>
                <div className="bg-gray-800 p-1 rounded shadow">
                  <Achatgraphendate/>
                </div>
              </AnimatedComponent>
            </div>
          </AnimatedComponent>
        </div>


     <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="scrollable-area">
            <AnimatedComponent id="produitliste">
              <div className="space-y-1 ">
                <AnimatedComponent>
                  <div className="bg-gray-800 p-1 rounded shadow">
                    <Graphcirculaireventemontantpaye /> {/** la liste des 10 premier dans le stock*/}
                  </div>
                </AnimatedComponent>
              </div>
            </AnimatedComponent>
             <AnimatedComponent id="produitliste">
              <div className="space-y-1 ">
                <AnimatedComponent>
                  <div className="bg-gray-800 p-1 rounded shadow">
                    <Achatchargebaton/>
                  </div>
                </AnimatedComponent>
              </div>
            </AnimatedComponent>
          </div>
         

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6" id="scrollable-area">
            <AnimatedComponent id="ventpayemen">
              <div className="space-y-1 ">
                <AnimatedComponent>
                  <div className="bg-gray-800 p-1 rounded shadow">
                    <Graphmoyenpayement /> {/** statis grap tableo sous forme de graph*/}
                  </div>
                </AnimatedComponent>
                <AnimatedComponent>
                  <div className="bg-gray-800 p-1 rounded shadow">
                    <Achatgraphendate/>
                  </div>
                </AnimatedComponent>
               
              </div>
            </AnimatedComponent>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6" id="scrollable-area">
           
             <AnimatedComponent id="achatchargee">
              <div className="space-y-1 ">
              <AnimatedComponent>
                  <div className="bg-gray-950 p-1 rounded shadow">
                    <ProductList7 /> {/** la liste des 10 premier dans le stock*/}
                  </div>
                </AnimatedComponent>
              </div>
            </AnimatedComponent>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6" id="scrollable-area">
           
             <AnimatedComponent id="achatchargee">
              <div className="space-y-5 ">
                <AnimatedComponent>
                  <div className="bg-red-500 p-2 rounded shadow">
                    
                  </div>
                </AnimatedComponent>
              </div>
            </AnimatedComponent>
          </div>
         
        </main>
      </div>
    </div>
  );
}
