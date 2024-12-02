import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { format } from 'date-fns';
import { BsFillCloudDownloadFill } from "react-icons/bs";
import { toWords } from 'number-to-words'; // Import de la nouvelle bibliothèque
export default function Factureventepaiement() {
  const { id } = useParams();
  
  const [clientid, setClientid] = useState('');
  const [dateajout, setDateajout] = useState('');
  const [nature, setNature] = useState('');
  const [montantpaye, setmontantpaye] = useState('');
  const [montantpayeEnLettres, setMontantpayeEnLettres] = useState('');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APIserveur}/recupparidVente/${id}`)
      .then(result => {
        const { clientid, dateajout, nature, montantpaye } = result.data;
        setClientid(clientid);
        setDateajout(format(new Date(dateajout), 'yyyy-MM-dd HH:mm'));
        setNature(nature);
        setmontantpaye(montantpaye);

        // Convertir le montant en lettres en français
        const montantEnLettres = toWords(montantpaye); // Conversion en lettres
        setMontantpayeEnLettres(montantEnLettres);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen p-4 bg-white">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 print:p-0 print:m-0">
        <div className="flex justify-between items-center mb-4">
          <button  
            onClick={handlePrint} 
            className="bg-green-500 animate-bounce text-white px-4 py-2 rounded hover:bg-blue-700 print:hidden"
          >
            <BsFillCloudDownloadFill size={20}/>
          </button>
        </div>

        {/* Facture Dupliquée */}
        <div className="flex flex-col space-y-8 print:space-y-1 print:flex-row print:space-x-8">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="border border-gray-300 p-6 rounded-md print:w-1/2 print:border-0 print:divide-y">
              {/* En-tête de la Facture */}
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="rounded-xl container text-center bg-pink-50 text-lg font-bold">Entreprise Dikob</h3>
                  <p className="text-sm text-gray-600">Guinée, Labé, Pounthioun</p>
                  <p className="text-sm text-gray-600">Téléphone : +224 622 05 07 36</p>
                </div>

                <div className="text-right">
                  <h3 className="rounded-xl container text-center bg-pink-50 text-lg font-bold">Facture d'achat</h3>
                  <p className="text-sm text-gray-600">Date: {dateajout}</p>
                  <p className="text-sm text-gray-600">E.P: {nature}</p>
                </div>
              </div>

              {/* Détails du Client */}
              <div>
                <h4 className="container text-center font-bold rounded-xl bg-red-50 text-lg text-md border-b border-gray-200 pb-2 mb-2">Détails sur le service</h4>
                <div className="flex ml-2 row">
                <p className="mx-3 text-sm"><strong>Facture n° :</strong> {id}</p>
                <p className="mx-3 text-sm"><strong>Client n° :</strong> {clientid}</p>
                  <p className="mx-3 text-sm"><strong>Montant payé (HT) :</strong> {montantpaye} GNF</p>
                  <p className="mx-3 text-sm"><strong>En lettres :</strong> {montantpayeEnLettres} GNF</p> {/* Ajout du montant en lettres */}
                </div>
              </div>

              {/* Instructions de Paiement */}
              <div className="mb-8">
                <h4 className="text-md rounded-xl container text-center bg-green-100 font-bold border-b border-gray-200 pb-2 mb-2 text-lg">Instructions sur le Paiement</h4>
                <p className="text-sm text-gray-600">Pour tout renseignement complémentaire, veuillez nous contacter.</p>
              </div>

              {/* Note Footer */}
              <div className="text-center text-xs text-gray-500">
                <p>Merci de faire confiance à notre entreprise pour vos besoins.</p>
                <p>Cette facture est un duplicata à conserver par le client.</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Styles pour l'impression en mode paysage */}
      <style jsx>{`
        @media print {
          @page {
            size: landscape;
          }
          body {
            -webkit-print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
