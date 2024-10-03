import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/LOGO.svg";
import api from "../api/api";
import ClipLoader from "react-spinners/ClipLoader"; 
import { toast, ToastContainer } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css';

const CadastroLogin = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem"); 
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/users', { name, email, password });
      toast.success("Conta criada com sucesso!");
      
      // Adiciona um delay antes de redirecionar
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (error) {
      console.error('Cadastro falhou', error.response ? error.response.data : error.message);
      const errorMessage = error.response?.data?.message || 'Ocorreu um erro ao cadastrar. Tente novamente.';
      toast.error(errorMessage);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex items-center justify-center h-screen container-cadastro">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-16 w-16" />
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600 font-bold mb-2">Nome</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              placeholder="Digite seu nome"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              placeholder="Ex: usuario@email.com"
              required
            />
          </div>
          <div className="flex mb-6 space-x-4">
            <div className="w-full">
              <label htmlFor="password" className="block text-gray-600 font-bold mb-2">Senha</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                placeholder="Digite sua senha"
                required
              />
            </div>
            <div className="w-full">
              <label htmlFor="confirm-password" className="block text-gray-600 font-bold mb-2">Confirmar Senha</label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                placeholder="Confirmar senha"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full font-bold py-2 px-4 rounded-lg text-gray-700"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <ClipLoader color="#000" loading={loading} size={20} /> 
              </div>
            ) : (
              'Criar Conta'
            )}
          </button>
          <div className="flex flex-col items-center mt-4">
            <Link className="text-gray-600 hover:text-gray-800 hover:underline" to="/login">Já tem uma conta? Entre aqui</Link>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
};

export default CadastroLogin;
