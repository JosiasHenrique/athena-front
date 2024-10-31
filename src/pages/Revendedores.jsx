import TabelaRevendedores from "../components/Revendedor/TabelaRevendedores";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const Revendedores = () => {
  return (
    <>
      <Navbar />
      <div>
        <h2 className="cadastro-titulo">Controle de Revendedores</h2>
        <TabelaRevendedores />
      </div>
      <Footer />
    </>
  )
};

export default Revendedores;
