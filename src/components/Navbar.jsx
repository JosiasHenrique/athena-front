import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import '../styles/dashboard.css';
import logo from '../assets/img/LOGO.svg';
import { BellIcon, Cog6ToothIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext'; 

const Navbar = () => {
    const [menuAberto, setMenuAberto] = useState(false);
    const [menuConfigAberto, setMenuConfigAberto] = useState(false);
    const { logout } = useAuth();
    const location = useLocation(); 

    const toggleMenu = () => {
        setMenuAberto(prev => !prev);
    };

    const toggleConfigMenu = () => {
        setMenuConfigAberto(prev => !prev);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className='navbar-dash bg-athena'>
            <div className="logo">
                <img src={logo} alt="logo-athena" />
            </div>
            <ul className="flex space-x-4">
                <li>
                    <Link 
                        to="/" 
                        className={`${isActive('/') ? 'op-selected' : ''}`}
                    >
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/vendas" 
                        className={`${isActive('/vendas') ? 'op-selected' : ''}`}
                    >
                        Vendas
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/compras" 
                        className={`${isActive('/compras') ? 'op-selected' : ''}`}
                    >
                        Compras
                    </Link>
                </li>
                <li className="relative">
                    <button className="flex items-center" onClick={toggleMenu}>
                        Cadastros
                        <ChevronDownIcon className="ml-1 h-5 w-5" />
                    </button>
                    {menuAberto && (
                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <Link 
                                    to="/clientes" 
                                    className={`block px-4 py-2 text-sm ${
                                        isActive('/clientes') ? 'op-selected-dropdown' : 'hover:bg-gray-200 hover:text-black'
                                    }`}
                                    role="menuitem"
                                >
                                    Cadastro de Clientes
                                </Link>
                                <Link 
                                    to="/produtos" 
                                    className={`block px-4 py-2 text-sm ${
                                        isActive('/produtos') ? 'op-selected-dropdown' : 'hover:bg-gray-200 hover:text-black'
                                    }`}
                                    role="menuitem"
                                >
                                    Cadastro de Produtos
                                </Link>
                                <Link 
                                    to="/revendedores" 
                                    className={`block px-4 py-2 text-sm ${
                                        isActive('/revendedores') ? 'op-selected-dropdown' : 'hover:bg-gray-200 hover:text-black'
                                    }`}
                                    role="menuitem"
                                >
                                    Cadastro de Revendedores
                                </Link>
                            </div>
                        </div>
                    )}
                </li>
                <li>
                    <Link 
                        to="/relatorios" 
                        className={`${isActive('/relatorios') ? 'op-selected' : ''}`}
                    >
                        Relatórios
                    </Link>
                </li>
            </ul>
            <div className="nav-utils">
                <button>
                    <BellIcon className="h-6 w-6 icon-nav" />
                </button>
                <div className="relative">
                    <button onClick={toggleConfigMenu}>
                        <Cog6ToothIcon className="h-6 w-6 icon-nav" />
                    </button>
                    {menuConfigAberto && (
                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <button 
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                                    onClick={handleLogout}
                                >
                                    Sair
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
