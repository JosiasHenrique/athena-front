import TabelaVendas from "../components/Venda/TabelaVendas";
import { VendaProvider } from "../context/VendaContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Vendas = () => {
  return (
    <>
      <Navbar />
      <div>
        <h2 className="cadastro-titulo">Controle de Vendas</h2>
        <VendaProvider>
          <TabelaVendas />
        </VendaProvider>
      </div>
      <Footer />
    </>

  )
};

export default Vendas;
