import { Link } from "react-router-dom";
import logo from "../assets/img/LOGO.svg";

const CadastroLogin = () => {
  return (
    <div className="flex items-center justify-center h-screen container-cadastro">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-16 w-16" />
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">Cadastro</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600 font-bold mb-2">Nome</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              placeholder="Digite seu nome"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              placeholder="Ex: usuario@email.com"
            />
          </div>
          <div className="flex mb-6 space-x-4">
            <div className="w-full">
              <label htmlFor="password" className="block text-gray-600 font-bold mb-2">Senha</label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                placeholder="Digite sua senha"
              />
            </div>
            <div className="w-full">
              <label htmlFor="confirm-password" className="block text-gray-600 font-bold mb-2">Confirmar Senha</label>
              <input
                type="password"
                id="confirm-password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                placeholder="Confirmar senha"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full font-bold py-2 px-4 rounded-lg text-gray-700"
          >
            Criar Conta
          </button>
          <div className="flex flex-col items-center mt-4">
            <Link className="text-gray-600 hover:text-gray-800 hover:underline" to="/login">Já tem uma conta? Entre aqui</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroLogin;
