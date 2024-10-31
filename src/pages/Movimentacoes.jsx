import TabelaMovimentacoes from "../components/Movimentacao/TabelaMovimentacoes";
import { MovimentacaoProvider } from "../context/MovimentacaoContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Movimentacoes = () => {

    return (
        <>
            <Navbar />
            <div>
                <h2 className="cadastro-titulo">Controle de Movimentações</h2>
                <MovimentacaoProvider>
                    <TabelaMovimentacoes />
                </MovimentacaoProvider>
            </div>
            <Footer />
        </>
    )
};

export default Movimentacoes;
