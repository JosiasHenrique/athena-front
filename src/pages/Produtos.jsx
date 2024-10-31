import TabelaProdutos from "../components/Produto/TabelaProdutos";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Produtos = () => {
  return (
    <>
      <Navbar />
      <div>
        <h2 className="cadastro-titulo">Controle de Produtos</h2>
        <TabelaProdutos />
      </div>
      <Footer />
    </>
  )
};

export default Produtos;
