import { Button , Tooltip, OverlayTrigger} from "react-bootstrap"; 
import { Link } from "react-router-dom";  
import { ImPencil2 } from "react-icons/im";
import { MdAutoDelete } from "react-icons/md"; 
import axios from "axios"; 
import { useEffect, useState } from 'react'; 
import { GiReturnArrow } from 'react-icons/gi';  
import { motion } from 'framer-motion'; 
import { useInView } from 'react-intersection-observer'; // Importation du hook useInView pour la détection de la visibilité des éléments.
import { useAnimation } from 'framer-motion'; // Importation du hook useAnimation pour les animations personnalisées.

export default function Listedesclientsclient() {
    const [clients, setclients] = useState([]); // État pour stocker les clients récupérées.
    const [recherche, setrecherche] = useState(''); // État pour le terme de recherche dans les clients.
    const [searchDate, setSearchDate] = useState(''); // État pour la date de recherche dans les clients.
    const { ref, inView } = useInView(); // Hook pour détecter si l'élément est visible dans la vue.
    const animation = useAnimation(); // Hook pour gérer les animations personnalisées.

    // Hook useEffect pour récupérer les clients depuis le serveur à l'initialisation du composant.
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_APIserveur}/Listeclients`)
            .then(result => {
                // Trie les clients par date d'ajout en ordre décroissant.
                setclients(result.data.sort((a, b) => new Date(b.dateajout) - new Date(a.dateajout)));
                // Démarre l'animation lorsque les données sont chargées.
                animation.start({
                    opacity: 1,
                    y: 0,
                    transition: { duration: 1 } // Durée de l'animation.
                });
            })
            .catch(err => console.log(err)); // Affiche une erreur dans la console en cas d'échec.
    }, [animation]); // Dépendance à l'animation pour rejouer l'effet quand l'animation change.

    // Fonction pour supprimer une client en utilisant son ID.
    const suprimerelement = (id) => {
        axios.delete(`${import.meta.env.VITE_APIserveur}/deleteclient/${id}`)
            .then(res => {
                console.log(res); // Log de la réponse du serveur après la suppression.
                window.location.reload(); // Recharge la page pour mettre à jour la liste des clients.
            })
            .catch(err => console.log(err)); // Affiche une erreur dans la console en cas d'échec.
    };

    // Fonction pour formater une date en une chaîne lisible.
    const formatDate = (dateString) => {
        const dateObj = new Date(dateString); // Convertit la chaîne de date en un objet Date.
        // Formate la date au format JJ/MM/AAAA à HHhMM.
        const formattedDate = `${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${dateObj.getFullYear()} à ${String(dateObj.getHours()).padStart(2, '0')}h${String(dateObj.getMinutes()).padStart(2, '0')}`;
        return formattedDate; // Retourne la date formatée.
    };

    // Filtre les clients en fonction du terme de recherche et de la date.
    const filtreclients = clients.filter((client) =>
        Object.values(client).some((value) =>
            value.toString().toLowerCase().includes(recherche.toLowerCase())
        ) &&
        (!searchDate || formatDate(client.dateajout).toLowerCase().includes(searchDate.toLowerCase()))
    );

    // Change la couleur de fond de la ligne en fonction de la nature de l'client.
    const Changercouleurchamp = (nature) => {
        if (nature === 'Incertain') {
            return 'bg-gray-600'; // Couleur pour les clients incertaines.
        } else if (nature === 'Terminer') {
            return 'bg-green-950'; // Couleur pour les clients terminées.
        } else {
            return 'bg-gray-700'; // Couleur par défaut pour les autres clients.
        }
    };

      // Définition du contenu de l'infobulle.
      const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props} className=" bg-green-950">
            Entrez un terme ou un identifiant pour vos trie sur les clients.
        </Tooltip>
    );
    return (
        <motion.div className="bg-gray-900 p-4 rounded"
            initial={{ opacity: 0, y: -50 }} // Opacité initiale de 0 et décalage de 50 pixels vers le haut pour l'effet de fade-in.
            animate={animation} // Utilisation de l'animation définie.
            ref={ref} // Référence pour le hook useInView.
        >
            {/* En-tête du composant avec le titre et l'image */}
            <div className="bg-gradient-to-t bg-blue-400 from-gray-950 rounded-2xl flex justify-between items-center mb-4">
                <h2 className="m-2 text-2xl text-white font-bold flex items-center w-full">
                    {/* Lien pour retourner à la gestion des clients pour l'admin */}
                    <Link to='/gestionclientclient' className="mx-2 bg-red-900 hover:bg-pink-400 rounded-2xl">
                        <GiReturnArrow size={20} />
                    </Link>
                    Liste des clients
                </h2>
                {/* Image d'illustration */}
                <img src="/img/international.jpg" alt="international" className="m-1 h-20 w-20 rounded-2xl" />
            </div>
            
            {/* Conteneur pour la recherche */}
            <div className=" p-2 rounded shadow-md w-full">
                <div className="p-2 flex justify-center items-center">
                    {/* Utilisation d'OverlayTrigger pour afficher le tooltip au survol de l'input */}
                    <OverlayTrigger placement="top" overlay={renderTooltip}>
                        <input
                            type="text"
                            placeholder="trie, saisissez votre requete..."
                            value={recherche} // Liaison de l'état de recherche avec l'input.
                            onChange={(e) => setrecherche(e.target.value)} // Met à jour l'état de recherche lorsqu'on tape dans l'input.
                            className="px-2 py-1 border rounded"
                        />
                    </OverlayTrigger>
                </div>
                
                {/* Séparateur horizontal */}
                <hr className="bg-slate-50 my-4" />
                
                {/* Conteneur du tableau avec défilement horizontal si nécessaire */}
                <div className="overflow-x-auto">
                    <table className="text-white table-auto w-full border-collapse">
                        <thead className='bg-gradient-to-tr bg-blue-400 from-gray-950 rounded-2xl'>
                            <tr>
                                {/* En-têtes du tableau avec une largeur fixe pour chaque colonne */}
                            <th className="px-2 py-2 text-center border-b border-green-600" style={{ width: '50px' }}>Identifiants</th>
                            <th className="px-2 py-2 text-center border-b border-green-600" style={{ width: '50px' }}>Noms</th>
                           <th className="px-2 py-2 text-center border-b border-green-600" style={{ width: '100px' }}>Prénoms</th>
                                <th className="px-2 py-2 text-center border-b border-green-600" style={{ width: '120px' }}>Dates</th>
                                <th className="px-2 py-2 text-center border-b border-green-600" style={{ width: '100px' }}>Adresses</th>
                                <th className="px-2 py-2 text-center border-b border-green-600" style={{ width: '100px' }}>Téléphones</th>
                                <th className="px-2 py-2 text-center border-b border-green-600" style={{ width: '90px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Affichage des clients filtrées */}
                            {filtreclients.map((client) => (
                                <tr key={client._id} className={Changercouleurchamp(client.nature)}>
                                    <td className="px-2 py-2 border-l border-b border-r border-blue-500">{client._id}</td>
                                  <td className="px-2 py-2 border-l border-b border-r border-blue-500">{client.name}</td>
                                    <td className="px-2 py-2 border-l border-b border-r border-blue-500">{client.nometprenom}</td>
                                    <td className="px-2 py-2 border-l border-b border-r border-blue-500">{formatDate(client.dateajout)}</td>
                                    <td className="px-2 py-2 border-l border-b border-r border-blue-500">{client.adresse}</td>
                                    <td className="px-2 py-2 border-l border-b border-r border-blue-500" style={{ width: '90px' }}>{client.telephone}</td>
                                    <td className="text-center px-2 py-2 border-b border-r border-blue-500">
                                      {/* Lien pour éditer l'client */}
                                        <Link to={`/miseajourAjoutclientRecupclient/${client._id}`} className="text-center btn btn-warning">
                                            <ImPencil2 />
                                        </Link>
                                        {/* Bouton pour supprimer l'client */}
                                        <Button className="btn btn-danger mx-2 text-center" onClick={() => suprimerelement(client._id)}>
                                            <MdAutoDelete />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
}
