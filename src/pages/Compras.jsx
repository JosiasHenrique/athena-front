import TabelaCompras from "../components/Compra/TabelaCompras";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CompraProvider } from "../context/CompraContext";

const Compras = () => {
  return (
    <>
      <Navbar />
      <div>
        <h2 className="cadastro-titulo">Controle de Compras</h2>
        <CompraProvider>
          <TabelaCompras />
        </CompraProvider>
      </div>
      <Footer />
    </>
  )
};

export default Compras;
