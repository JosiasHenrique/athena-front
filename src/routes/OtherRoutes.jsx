import { Routes, Route } from 'react-router-dom';
import Vendas from '../pages/Vendas';
import Compras from '../pages/Compras';
import Revendedores from '../pages/Revendedores';
import Produtos from '../pages/Produtos';
import Clientes from '../pages/Clientes';
import Relatorios from '../pages/Relatorios';
import Movimentacoes from '../pages/Movimentacoes';
import Dashboard from '../pages/Dashboard';
import Panos from '../pages/Panos';
import Index from '../pages/Index';

const OtherRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Index />}>
                <Route index element={<Dashboard />} />
                <Route path="vendas" element={<Vendas />} />
                <Route path="compras" element={<Compras />} />
                <Route path="cadastro-revendedores" element={<Revendedores />} />
                <Route path="cadastro-produtos" element={<Produtos />} />
                <Route path="cadastro-clientes" element={<Clientes />} />
                <Route path="relatorios" element={<Relatorios />} />
                <Route path="movimentacoes" element={<Movimentacoes />} />
                <Route path="panos" element={<Panos />} />
            </Route>
        </Routes>
    );
};

export default OtherRoutes;
