import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Vendas from "./pages/Vendas";
import Compras from "./pages/Compras";
import Relatorios from "./pages/Relatorios";
import CadastroClientes from "./pages/CadastroClientes";
import CadastroProdutos from "./pages/CadastroProdutos";
import CadastroRevendedores from "./pages/CadastroRevendedores";
import CadastroLogin from "./pages/Cadastro";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="vendas" element={<Vendas />} />
          <Route path="compras" element={<Compras />} />
          <Route path="cadastro-revendedores" element={<CadastroRevendedores />} />
          <Route path="cadastro-produtos" element={<CadastroProdutos />} />
          <Route path="cadastro-clientes" element={<CadastroClientes />} />
          <Route path="relatorios" element={<Relatorios />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro-login" element={<CadastroLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App
