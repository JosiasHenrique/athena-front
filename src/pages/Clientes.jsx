import TabelaClientes from "../components/Cliente/TabelaClientes";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Clientes = () => {
  return (
    <>
      <Navbar />
      <div>
        <h2 className="cadastro-titulo">Controle de Clientes</h2>
        <TabelaClientes />
      </div>
      <Footer />
    </>
  )
};

export default Clientes;
