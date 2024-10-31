import TabelaMovimentacoes from "../components/Movimentacao/TabelaMovimentacoes";
import { MovimentacaoProvider } from "../context/MovimentacaoContext";

const Movimentacoes = () => {

    return (
        <div>
            <h2 className="cadastro-titulo">Controle de Movimentações</h2>
            <MovimentacaoProvider>
                <TabelaMovimentacoes />
            </MovimentacaoProvider>
        </div>
    )
};

export default Movimentacoes;
