
import { BrowserRouter , Route, Routes, Link } from 'react-router-dom';
import { AuthProvider } from './Seconnecter/AuthContext';

import Adminfils from './Lesmouvements/Lestroispages/InterfaceClient/Adminfils';
import Admindasboardgenerale from './Lesmouvements/Lestroispages/InterfaceAdmin/Admindasboardgenerale';

import Senregistrer from './Seconnecter/Senregistrer';
import Seconnecter from './Seconnecter/Seconnecter';
import Seconnecterz from './Seconnecter/Seconnecterz';
import Pagedechoix from './Lesmouvements/Lestroispages/Pagepricipale/Pagedechoix';

import Clients from './Lesmouvements/LesClients/GestionclientsAdmin/Clients';
import Listedesclients from './Lesmouvements/LesClients/GestionclientsAdmin/ListeClients';
import Gestionclient from './Lesmouvements/LesClients/GestionclientsAdmin/Gestionclients';
import CMiseajourAjoutClient from './Lesmouvements/LesClients/GestionclientsAdmin/CRecupMiseAjourClien';
      import Gestionclientclient from './Lesmouvements/LesClients/GestionclientsClient/Gestionclientsclient';
      import Clientsclient from './Lesmouvements/LesClients/GestionclientsClient/Clientsclient';
      import Listedesclientsclient from './Lesmouvements/LesClients/GestionclientsClient/ListeClientsclient';
      import MiseajourAjoutClientclient from './Lesmouvements/LesClients/GestionclientsClient/ClientRecupMiseAjourClient';

import Fournisseurs from './Lesmouvements/Fournisseur/gestiondesfournisseur/Fournisseur';
import ListeFournisseur from './Lesmouvements/Fournisseur/gestiondesfournisseur/ListeFournisseur';
import EditFournisseur from './Lesmouvements/Fournisseur/gestiondesfournisseur/Editfournisseur';
import Gestionfrs from './Lesmouvements/Fournisseur/gestiondesfournisseur/Gestionfrs';
      import Gestionfrsclient from './Lesmouvements/Fournisseur/gestiondesfournisseurclient/Gestionfrsclient';
      import Fournisseursclient from './Lesmouvements/Fournisseur/gestiondesfournisseurclient/Fournisseurclient';
      import ListeFournisseurclient from './Lesmouvements/Fournisseur/gestiondesfournisseurclient/ListeFournisseurclient';
      import EditFournisseurclient from './Lesmouvements/Fournisseur/gestiondesfournisseurclient/Editfournisseurclient';

import AddProduct from './Lesmouvements/StockVente/gestiondesventes/Stock/AddProduct';
import ProductList from './Lesmouvements/StockVente/gestiondesventes/Stock/ProductList';
import SellProduct from './Lesmouvements/StockVente/gestiondesventes/SellProduct';
import SellRecupliste from './Lesmouvements/StockVente/gestiondesventes/SellRecupliste';
import Gestiondesventess from './Lesmouvements/StockVente/gestiondesventes/Gestiondesventess';
import Factureinitial from './Lesmouvements/StockVente/gestiondesventes/Factureinitial';
import SellProduitpaiement from './Lesmouvements/StockVente/gestiondesventes/SellProduitpaiement';
import Facturepaiementdue from './Lesmouvements/StockVente/gestiondesventes/Facturepaiementdue';
import MiseajourSellRecup from './Lesmouvements/StockVente/gestiondesventes/SaleRecupMiseAjour';
      import Gestiondesventesscl from './Lesmouvements/StockVente/gestiondesventesclient/Gestiondesventesscl';
      import AddProductcl from './Lesmouvements/StockVente/gestiondesventesclient/Stockcl/AddProductcl';
      import ProductListcl from './Lesmouvements/StockVente/gestiondesventesclient/Stockcl/ProductListcl';
      import SellProductcl from './Lesmouvements/StockVente/gestiondesventesclient/SellProductcl';
      import SellProduitpaiementcl from './Lesmouvements/StockVente/gestiondesventesclient/SellProduitpaiementcl';
      import Factureinitialcl from './Lesmouvements/StockVente/gestiondesventesclient/Factureinitialcl';
      import Facturepaiementduecl from './Lesmouvements/StockVente/gestiondesventesclient/Facturepaiementduecl';
      import MiseajourSellRecupcl from './Lesmouvements/StockVente/gestiondesventesclient/SaleRecupMiseAjourcl';
      import SellRecuplistecl from './Lesmouvements/StockVente/gestiondesventesclient/SellRecuplistecl';
      import SellProductforadd from './Lesmouvements/StockVente/gestiondesventesclient/Stockcl/SellProductforadd';


import AchatchargeRecupliste from './Lesmouvements/AchatCharge/gestionAchatetcharge/AchatchargeRecupliste';
import Gestionachatcharge from './Lesmouvements/AchatCharge/gestionAchatetcharge/Gestiondesachatcharge';
import Achatoucharge from './Lesmouvements/AchatCharge/gestionAchatetcharge/Achatoucharge';
      import AchatchargeRecuplistecl from './Lesmouvements/AchatCharge/gestionAchatetchargecl/AchatchargeRecuplistecl';
      import Gestionachatchargecl from './Lesmouvements/AchatCharge/gestionAchatetchargecl/Gestiondesachatchargecl';
      import Achatouchargecl from './Lesmouvements/AchatCharge/gestionAchatetchargecl/Achatouchargecl';
import Orror from './Lesmouvements/Lestroispages/Erreur/Orror';
import Seconnect from './Seconnecter/Seconnecte';
import UserRecupliste from './Seconnecter/UserRecupliste';

function App() {
  return (
    <>
    <AuthProvider>
      <BrowserRouter>
          <Routes>
          <Route path="/seconnecter" element={<Seconnecter />} />
            <Route path="/seconnecterz" element={<Seconnecterz />} />{/* pour le client */}
            <Route path="/senregistrer" element={<Senregistrer />} />
            <Route path="/seconnect" element={< Seconnect/>} />
            
            <Route path="/Useliste" element={< UserRecupliste/>} />

            <Route path="/pagedechoix" element={<Pagedechoix />} />
                   <Route path="/adminfils" element={<Adminfils />} />
                   <Route path="/admindasboardgenerale" element={<Admindasboardgenerale />} />

                   <Route index element={<Pagedechoix />} />{/**Route par defaut est home ou page par defaut*/}
                   <Route path="*" element={<Orror />} />{/** pour les oro */}


            <Route path="/gestionclient" element={<Gestionclient />} />
                  <Route path="/client" element={<Clients />} />
                  <Route path="/listeclient" element={<Listedesclients />} />
                  <Route path="/miseajourAjoutclientRecu/:id" element={<CMiseajourAjoutClient/>} />
            <Route path="/gestionclientclient" element={<Gestionclientclient />} />
                  <Route path="/clientclient" element={<Clientsclient />} />
                  <Route path="/listeclientclient" element={<Listedesclientsclient />} />
                  <Route path="/miseajourAjoutclientRecupclient/:id" element={<MiseajourAjoutClientclient/>} />
            
                   
            <Route path="/gestionfournisseur" element={<Gestionfrs />} />                  
                  <Route path="/fournisseur" element={<Fournisseurs />} />
                  <Route path="/listeFournisseur" element={<ListeFournisseur />} />
                  <Route path="/Miseajourfrs/:id" element={<EditFournisseur/>} />
            <Route path="/gestionfournisseurclient" element={<Gestionfrsclient />} />                  
                  <Route path="/fournisseurclient" element={<Fournisseursclient />} />
                  <Route path="/listeFournisseurclient" element={<ListeFournisseurclient />} />
                  <Route path="/Miseajourfrsclient/:id" element={<EditFournisseurclient/>} />

            
            <Route path="/gestionachatoucharge" element={<Gestionachatcharge />} />
                  <Route path="/achatcharge" element={<Achatoucharge />} />
                  <Route path="/achatchargeliste" element={<AchatchargeRecupliste />} />
            <Route path="/gestionachatouchargecl" element={<Gestionachatchargecl />} />
                  <Route path="/achatchargecl" element={<Achatouchargecl />} />
                  <Route path="/achatchargelistecl" element={<AchatchargeRecuplistecl />} />

      
            <Route path="/gestionstocketvnte" element={<Gestiondesventess />} />
                  <Route path="/Ajoutstock" element={<AddProduct />} />
                  <Route path="/listedesstock" element={<ProductList />} />
                    <Route path="/ventedesprod8" element={<SellProduct />} />
                    <Route path="/listesell" element={<SellRecupliste />} />
                    <Route path="/sellProduitpaie" element={<SellProduitpaiement />} /> 
                        <Route path="/factureinitial/:id" element={<Factureinitial />} />
                        <Route path="/facturepaiementd/:id" element={<Facturepaiementdue />} />
                        <Route path="/miseRecupsale/:id" element={<MiseajourSellRecup/>} />
            <Route path="/gestionstocketvntecl" element={<Gestiondesventesscl />} />
                  <Route path="/Ajoutstockcl" element={<AddProductcl />} />
                  <Route path="/sellProductadd" element={<SellProductforadd />} />
                  <Route path="/listedesstockcl" element={<ProductListcl />} />
                        <Route path="/ventedesprod8cl" element={<SellProductcl />} />
                        <Route path="/listesellcl" element={<SellRecuplistecl />} />
                        <Route path="/sellProduitpaiecl" element={<SellProduitpaiementcl />} />
                              <Route path="/factureinitialcl/:id" element={<Factureinitialcl />} />
                              <Route path="/facturepaiementdcl/:id" element={<Facturepaiementduecl />} />
                              <Route path="/miseRecupsalecl/:id" element={<MiseajourSellRecupcl/>} />

                          



          </Routes>
      </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App

