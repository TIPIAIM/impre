import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { format } from 'date-fns';
import { BsFillCloudDownloadFill } from "react-icons/bs";
import { toWords } from 'number-to-words'; // Import de la nouvelle bibliothèque


export default function Factureinitial() {
  const { id } = useParams();
  const [productId, setProductId] = useState('');
  const [produit, setProduit] = useState('');
  const [dateajout, setdateajout] = useState('');
  const [quantite, setQuantite] = useState('');
  const [clientId, setClientId] = useState('');
  const [moyenpayement, setmoyenpayement] = useState('');
  const [montant, setMontant] = useState('');
  const [montantPaye, setMontantPaye] = useState('');

  const [montantpayeEnLettres, setMontantpayeEnLettres] = useState('');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APIserveur}/recupparidsale/${id}`)
      .then(result => {
        const { productId, quantite, produit, dateajout, moyenpayement, clientId, montant, montantPaye } = result.data;
        setProductId(productId);
        setProduit(produit);
        setQuantite(quantite);
        setClientId(clientId);
        setMontant(montant);
        setdateajout(format(new Date(dateajout), 'yyyy-MM-dd HH:mm')),
          setmoyenpayement(moyenpayement);
        setMontantPaye(montantPaye);

        // Convertir le montant en lettres en 
        const montantEnLettres = toWords(montantPaye); // Conversion en lettres
        setMontantpayeEnLettres(montantEnLettres);
      })

      .catch(err => console.log(err));
  }, [id]);

  const handlePrint = () => {
    window.print();
  };
  const resteapaye = montant - montantPaye

  return (
    <div className="min-h-screen p-1 bg-green-800">
      <div className="max-w-8xl mx-auto bg-white shadow-lg rounded-lg p-1 print:p-0 print:m-0">
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={handlePrint}
            className="bg-green-500  animate-bounce text-white px-4 py-1 rounded hover:bg-blue-700 print:hidden"
          >
            <BsFillCloudDownloadFill size={20} />
          </button>
        </div>

        {/* Facture Dupliquée */}
        <div className="flex flex-col space-y-8 print:space-y-1 print:flex-row print:space-x-8">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="border border-gray-300 p-1 rounded-md print:w-1/2 print:border-0 print:divide-y">
              {/* En-tête de la Facture */}
              <div className="flex justify-between items-center mb-2">

                <div className=" ">
                  <h3 className="  rounded-xl container text-center bg-pink-50 text-lg font-bold">Entreprise</h3>
                    <img src="/pictures/dIKOBLOGO.jpg" alt="dickob" className=" mx-6  h-28 w-28 rounded-2xl" />
                  </div>
                <div className=" ">
                <p className="text-sm text-gray-600">Signature</p>
                </div>

                <div className="text-right ">
                  <h3 className="  rounded-xl container text-center bg-pink-50 text-lg font-bold">Facture</h3>
                  <p className="text-sm text-gray-600">Guinée, Labé, CU Pounthioun</p>
                  <p className="text-sm text-gray-600">imprimeriedikob@gmail.com</p>
                  <p className="text-sm text-gray-600">Télephone : +224 622 050736</p>
                  <p className="text-sm text-gray-600">Date d'ope: {dateajout}</p>
                </div>
              </div>

              {/* Détails du Client */}
              <div className=" ">
                <h6 className="  rounded-xl container text-center bg-red-50 text-lg text-md font-semibold border-b border-gray-200 pb-2 mb-3">Détails sur le service</h6>
                <div className=" flex ml-2 ">
                  <p className=" mx-3 text-sm"><strong>Client n° :</strong> {clientId}</p>
                  <p className=" mx-3 text-sm"><strong>Facture n° :</strong> {id}</p>
                </div>

              </div>

              {/* Détails du Flux */}
              <div className="mb-3">
                <h6 className=" rounded-xl container text-center bg-yellow-50 text-md font-semibold border-b border-gray-200 pb-2 mb-3 text-lg">Détail sur le produit </h6>
                <div className=" flex  ml-2">
                  <p className="mx-3 text-sm "><strong>Produit :</strong> {produit}</p>
                  <p className="mx-3 text-sm"><strong>Quantité :</strong> {quantite}</p>
                  <p className="text-sm"><strong>Mont.due :</strong> {montant} GNF</p>

                </div>

                <div className=" flex ml-2 ">
                  <p className="mx-3 text-sm"><strong>Mont.payer :</strong> {montantPaye} GNF</p>
                  <p className="text-sm mx-3"><strong>Reste impayé :</strong> <strong className="text-red-600"> {resteapaye} GNF</strong></p>
                </div>
                <p className="mx-3 text-center text-sm"><strong>Montant :</strong> {montantpayeEnLettres} GNF</p>


              </div>

              <div className="mb-6">
                <h4 className="text-md  rounded-xl container text-center bg-green-100 font-semibold border-b border-gray-200 pb-2 mb-3 text-lg">Instructions sur le Paiement</h4>
                <p className="text-sm  text-gray-700">Pour tout renseignement complémentaire, veuillez nous contacter.   Dikob imprimerie , Guinée - Labe - CU Pounthioun , 'RCCM/GN.2024.A.07504 NIF : 323996017'</p>
              </div>

              {/* Note Footer */}
              <div className="text-center  text-xs text-gray-700">
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
          .print\:hidden {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
