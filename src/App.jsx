import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Vendas from "./pages/Vendas";
import Compras from "./pages/Compras";
import Relatorios from "./pages/Relatorios";
import CadastroLogin from "./pages/CadastroLogin";
import ProtectedRoute from "./ProtectedRoute";
import Revendedores from "./pages/Revendedores";
import Produtos from "./pages/Produtos";
import Clientes from "./pages/Clientes";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }>
          <Route path="vendas" element={<Vendas />} />
          <Route path="compras" element={<Compras />} />
          <Route path="revendedores" element={<Revendedores />} />
          <Route path="produtos" element={<Produtos />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="relatorios" element={<Relatorios />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro-login" element={<CadastroLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App
