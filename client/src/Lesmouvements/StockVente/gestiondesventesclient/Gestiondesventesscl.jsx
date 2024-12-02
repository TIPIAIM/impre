import { useState, useEffect } from "react";
import { motion, useAnimate } from "framer-motion";
import { IoReturnDownBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useScroll, useTransform } from "framer-motion";

const staggerMenuItems = 0.1;

function useMenuAnimation(isOpen) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(".arrow", { rotate: isOpen ? 180 : 0 }, { duration: 0.3 });
    animate(
      "ul",
      {
        opacity: isOpen ? 1 : 0,
        height: isOpen ? "auto" : 0,
        transition: { duration: 0.4 },
      }
    );

    animate(
      "li",
      isOpen
        ? { opacity: 1, y: 0, filter: "blur(0px)" }
        : { opacity: 0, y: -10, filter: "blur(10px)" },
      {
        duration: 0.3,
        delay: isOpen ? staggerMenuItems : 0,
      }
    );
  }, [isOpen, animate]);

  return scope;
}

export default function Gestiondesventesscl() {
  const [isOpen, setIsOpen] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 300], [1, 1.05]);

  const scope = useMenuAnimation(isOpen);

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: `url('/pictures/lesclietparle.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-gray-400 bg-opacity-70 flex flex-col items-center justify-center">
        <div className="bg-gray-00 rounded-lg shadow-lg p-6 max-w-lg w-full mx-4">
          <div className="flex justify-end mb-1">
            <Link to='/adminfils' className="text-gray-400 hover:text-red-600 transition-colors duration-300">
              <IoReturnDownBack size={30} className="rounded-full p-2 bg-gray-600 hover:bg-gray-500" />
            </Link>
          </div>
          <nav className="text-blue-200" ref={scope}>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="flex button-shine items-center text-lg font-semibold py-3 px-6 bg-gray-900 font-serif rounded-lg mb-4 shadow-md hover:bg-green-900 transition-all duration-300"
            >
              Gestion des Ventes et stocks
              <div className="arrow ml-3">
                <svg width="15" height="15" viewBox="0 0 20 20">
                  <path d="M0 7 L 20 7 L 10 16" />
                </svg>
              </div>
            </motion.button>
            <ul
              className="overflow-hidden"
              style={{
                pointerEvents: isOpen ? "auto" : "none",
              }}
            >
              <li className="mt-2">
                <Link to="/ventedesprod8cl" className="text-xl hover:bg-gray-500 rounded-lg no-underline font-semibold text-white hover:text-yellow-300 transition-colors duration-300">Enregistrer une vente</Link>
              </li>
              <li className="mt-2">
                <Link to="/listesellcl" className="text-xl hover:bg-gray-500 rounded-lg no-underline font-semibold text-white hover:text-yellow-300 transition-colors duration-300">La liste des ventes</Link>
              </li>
              <li className="mt-2">
                <Link to="/sellProduitpaiecl" className="text-xl hover:bg-gray-500 rounded-lg no-underline font-semibold text-white hover:text-yellow-300 transition-colors duration-300">Paiement facture</Link>
              </li>
              <li className="mt-2">
                <Link to="/Ajoutstockcl" className="text-xl hover:bg-gray-500 rounded-lg no-underline font-semibold text-white hover:text-yellow-300 transition-colors duration-300">Gestion des stocks</Link>
              </li>
            </ul>
          </nav>
        </div>
        <motion.div
          ref={ref}
          style={{ scale }}
          className={`mt-8 text-center text-white ${inView ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
        >
          <h1 className="text-4xl font-extrabold">Gestion de l'information sur les opérations de stocks et ventes</h1>
        </motion.div>
      </div>
    </div>
  );
}
