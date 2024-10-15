import TabelaCompras from "../components/Compra/TabelaCompras";
import { CompraProvider } from "../context/CompraContext";

const Compras = () => {
  return (
    <div>
      <h2 className="cadastro-titulo">Compras</h2>
      <CompraProvider>
        <TabelaCompras />
      </CompraProvider>
    </div>
  )
};

export default Compras;
