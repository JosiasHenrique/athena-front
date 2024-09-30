import { Link } from "react-router-dom";
import logo from "../assets/img/LOGO.svg"

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen container-login">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-16 w-16" />
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 font-bold mb-2">Usuário</label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              placeholder="Ex: usuario@email.com"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600 font-bold mb-2">Senha</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              placeholder="Digite sua senha"
            />
          </div>
          <button
            type="submit"
            className="w-full font-bold py-2 px-4 rounded-lg text-gray-700"
          >
            Entrar
          </button>
          <div className="flex flex-col items-center mt-4">
            <Link className="text-gray-600 hover:text-gray-800 hover:underline" to="/cadastro-login">Ainda não tem uma conta? Cadastre aqui</Link>
           
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
