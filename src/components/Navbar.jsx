import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import '../styles/dashboard.css';
import logo from '../assets/img/LOGO.svg';
import { BellIcon, Cog6ToothIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
    const [menuAberto, setMenuAberto] = useState(false);
    const location = useLocation(); // Hook para obter a URL atual

    const handleMouseEnter = () => {
        setMenuAberto(true);
    };

    const handleMouseLeave = () => {
        setMenuAberto(false);
    };

    const isSelected = (path) => {
        return location.pathname === path ? 'selected' : '';
    };

    // Verifica se a rota atual começa com "/cadastro"
    const isCadastrosSelected = () => {
        return location.pathname.startsWith("/cadastro-") ? 'selected' : '';
    };

    return (
        <nav className='navbar-dash bg-athena'>
            <div className="logo">
                <img src={logo} alt="logo-athena" />
            </div>
            <ul className="flex space-x-4">
                <li className={isSelected("/")}>
                    <Link to="/">Dashboard</Link>
                </li>
                <li className={isSelected("/vendas")}>
                    <Link to="/vendas">Vendas</Link>
                </li>
                <li className={isSelected("/compras")}>
                    <Link to="/compras">Compras</Link>
                </li>
                <li 
                    className={`relative ${isCadastrosSelected()}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <button className="flex items-center">
                        Cadastros
                        <ChevronDownIcon className="ml-1 h-5 w-5" />
                    </button>
                    {menuAberto && (
                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <Link to="/cadastro-clientes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                    Cadastro de Clientes
                                </Link>
                                <Link to="/cadastro-produtos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                    Cadastro de Produtos
                                </Link>
                                <Link to="/cadastro-revendedores" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                    Cadastro de Revendedores
                                </Link>
                            </div>
                        </div>
                    )}
                </li>
                <li className={isSelected("/relatorios")}>
                    <Link to="/relatorios">Relatórios</Link>
                </li>
            </ul>
            <div className="nav-utils">
                <button>
                    <BellIcon className="h-6 w-6 icon-nav" />
                </button>
                <button>
                    <Cog6ToothIcon className="h-6 w-6 icon-nav" />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
