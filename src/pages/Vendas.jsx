import TabelaVendas from "../components/Venda/TabelaVendas";
import { VendaProvider } from "../context/VendaContext";

const Vendas = () => {
  return (
      <div>
        <h2 className="cadastro-titulo">Controle de Vendas</h2>
        <VendaProvider>
          <TabelaVendas />
        </VendaProvider>
      </div>
  )
};

export default Vendas;
