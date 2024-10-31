import { useForm } from 'react-hook-form';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/LOGO.svg";
import api from "../api/api";
import ClipLoader from "react-spinners/ClipLoader"; 
import { toast, ToastContainer } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css';

const CadastroLogin = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const password = watch("password");

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await api.post('/users', { 
        name: data.name, 
        email: data.email, 
        password: data.password 
      });
      toast.success("Conta criada com sucesso!");
      
      setTimeout(() => {
        navigate('/login');
      }, 1000);
      
    } catch (error) {
      console.error('Cadastro falhou', error.response ? error.response.data : error.message);
      const errorMessage = error.response?.data?.message || 'Ocorreu um erro ao cadastrar. Tente novamente.';
      toast.error(errorMessage, {
        theme: "colored"
      });
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600 font-bold mb-2">Nome</label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Nome é obrigatório" })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Digite seu nome"
            />
            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email é obrigatório",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Email inválido"
                }
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500' : ''}`}
              placeholder="Ex: usuario@email.com"
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </div>
          <div className="flex mb-6 space-x-4">
            <div className="w-full">
              <label htmlFor="password" className="block text-gray-600 font-bold mb-2">Senha</label>
              <input
                type="password"
                id="password"
                {...register("password", { required: "Senha é obrigatória" })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500' : ''}`}
                placeholder="Digite sua senha"
              />
              {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>
            <div className="w-full">
              <label htmlFor="confirm-password" className="block text-gray-600 font-bold mb-2">Confirmar Senha</label>
              <input
                type="password"
                id="confirm-password"
                {...register("confirmPassword", {
                  required: "Confirmação de senha é obrigatória",
                  validate: value => value === password || "As senhas não coincidem"
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                placeholder="Confirmar senha"
              />
              {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
            </div>
          </div>
          <button
            type="submit"
            className="w-full font-bold py-2 px-4 rounded-lg text-gray-700 bg-athena hover:bg-pink-500 transition duration-200 ease-in-out"
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
