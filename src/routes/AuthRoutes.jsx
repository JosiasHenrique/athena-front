import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import CadastroLogin from '../pages/CadastroLogin';

const AuthRoutes = () => {
    const user = localStorage.getItem("@athena:user");

  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro-login" element={<CadastroLogin />} />
        { user ?? <Route path="*" element={ <Navigate to="/login" /> } /> }
      </Routes>
  );
};

export default AuthRoutes
