import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ClipLoader from 'react-spinners/ClipLoader';
import logo from '../assets/img/LOGO.svg';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login({ email: data.email, password: data.password });
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
      const errorMessage = error.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais e tente novamente.';
      toast.error(errorMessage, {
        theme: "colored"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen container-login">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-16 w-16" />
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-bold mb-2">Usuário</label>
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
          <div className="mb-6">
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
          <button
            type="submit"
            className={`w-full font-bold py-2 px-4 rounded-lg text-gray-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <ClipLoader color="#000" loading={loading} size={20} />
              </div>
            ) : (
              'Entrar'
            )}
          </button>
          <div className="flex flex-col items-center mt-4">
            <Link className="text-gray-600 hover:text-gray-800 hover:underline" to="/cadastro-login">Ainda não tem uma conta? Cadastre aqui</Link>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
};

export default Login;
