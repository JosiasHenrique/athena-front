import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../styles/dashboard.css';
import logo from '../assets/img/LOGO.svg';
import { BellIcon, Cog6ToothIcon, ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import NavbarMobile from './NavbarMobile';

const Navbar = () => {
    const [menuAberto, setMenuAberto] = useState(false);
    const [menuConfigAberto, setMenuConfigAberto] = useState(false);
    const [menuMobileAberto, setMenuMobileAberto] = useState(false);
    const location = useLocation();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const menuRef = useRef();

    const toggleMenu = () => {
        setMenuAberto(prev => !prev);
    };

    const toggleConfigMenu = () => {
        setMenuConfigAberto(prev => !prev);
    };

    const toggleMobileMenu = () => {
        setMenuMobileAberto(prev => !prev);
    };

    const isSelected = (path) => {
        return location.pathname === path ? 'selected' : '';
    };

    const isCadastrosSelected = () => {
        return location.pathname.startsWith("/cadastro-") ? 'selected' : '';
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuAberto && menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuAberto(false);
            }
            if (menuMobileAberto && !menuRef.current.contains(event.target)) {
                setMenuMobileAberto(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuAberto, menuMobileAberto]);

    return (
        <nav className={`navbar-dash bg-athena ${menuMobileAberto ? 'menu-mobile' : ''}`} ref={menuRef}>
            <div className={`logo ${menuMobileAberto}`}>
                <img src={logo} alt="logo-athena" />
            </div>
            <button className={`md:hidden flex items-center ${menuMobileAberto ? 'menu-btn-left' : ''}`} onClick={toggleMobileMenu}>
                {menuMobileAberto ? (
                    <>
                        <XMarkIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                        Fechar
                    </>
                ) : (
                    <>
                        <Bars3Icon className="h-5 w-5 mr-2" aria-hidden="true" />
                        Menu
                    </>
                )}
            </button>

            <div className="hidden md:flex">
                <ul className="flex space-x-4 items-center">
                    <li className={isSelected("/")}>
                        <Link to="/">Dashboard</Link>
                    </li>
                    <li className={isSelected("/vendas")}>
                        <Link to="/vendas">Vendas</Link>
                    </li>
                    <li className={isSelected("/compras")}>
                        <Link to="/compras">Compras</Link>
                    </li>
                    <li className={`relative ${isCadastrosSelected()}`}>
                        <button className="flex items-center" onClick={toggleMenu}>
                            Cadastros
                            <ChevronDownIcon className="ml-1 h-5 w-5" />
                        </button>
                        {menuAberto && (
                            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    <Link to="/cadastro-clientes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={() => setMenuAberto(false)}>
                                        Cadastro de Clientes
                                    </Link>
                                    <Link to="/cadastro-produtos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={() => setMenuAberto(false)}>
                                        Cadastro de Produtos
                                    </Link>
                                    <Link to="/cadastro-revendedores" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={() => setMenuAberto(false)}>
                                        Cadastro de Revendedores
                                    </Link>
                                </div>
                            </div>
                        )}
                    </li>
                    <li className={isSelected("/panos")}>
                        <Link to="/panos">Panos</Link>
                    </li>
                    <li className={isSelected("/relatorios")}>
                        <Link to="/relatorios">Relatórios</Link>
                    </li>
                    <li className={isSelected("/movimentacoes")}>
                        <Link to="/movimentacoes">Movimentações</Link>
                    </li>
                </ul>
            </div>

            <NavbarMobile
                menuAberto={menuAberto}
                toggleMenu={toggleMenu}
                menuMobileAberto={menuMobileAberto}
                toggleMobileMenu={toggleMobileMenu}
                isSelected={isSelected}
                isCadastrosSelected={isCadastrosSelected}
            />

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
                                <button onClick={handleLogout}>Sair</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
