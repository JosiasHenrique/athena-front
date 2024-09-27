import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Vendas from "./pages/Vendas";
import Produtos from "./pages/Produtos";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="vendas" element={<Vendas />} />
          <Route path="produtos" element={<Produtos />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App
