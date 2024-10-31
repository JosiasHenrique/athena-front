// NavbarMobile.js
import { Link } from "react-router-dom";
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const NavbarMobile = ({ menuAberto, toggleMenu, menuMobileAberto, toggleMobileMenu, isSelected, isCadastrosSelected }) => {
    return (
        <>
            {menuMobileAberto && (
                <div className="absolute top-16 left-0 right-0 bg-athena shadow-lg">
                    <ul className="flex flex-col space-y-2 p-4">
                        <li className={isSelected("/")}>
                            <Link to="/" onClick={toggleMobileMenu}>Dashboard</Link>
                        </li>
                        <li className={isSelected("/vendas")}>
                            <Link to="/vendas" onClick={toggleMobileMenu}>Vendas</Link>
                        </li>
                        <li className={isSelected("/compras")}>
                            <Link to="/compras" onClick={toggleMobileMenu}>Compras</Link>
                        </li>
                        <li className={isCadastrosSelected()}>
                            <button className="flex items-center" onClick={toggleMenu}>
                                Cadastros
                                <ChevronDownIcon className="ml-1 h-5 w-5" />
                            </button>
                            {menuAberto && (
                                <div className="flex flex-col">
                                    <Link to="/cadastro-clientes" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => { toggleMobileMenu(); }}>
                                        Cadastro de Clientes
                                    </Link>
                                    <Link to="/cadastro-produtos" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => { toggleMobileMenu(); }}>
                                        Cadastro de Produtos
                                    </Link>
                                    <Link to="/cadastro-revendedores" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => { toggleMobileMenu(); }}>
                                        Cadastro de Revendedores
                                    </Link>
                                </div>
                            )}
                        </li>
                        <li className={isSelected("/panos")}>
                            <Link to="/panos" onClick={toggleMobileMenu}>Panos</Link>
                        </li>
                        <li className={isSelected("/relatorios")}>
                            <Link to="/relatorios" onClick={toggleMobileMenu}>Relatórios</Link>
                        </li>
                        <li className={isSelected("/movimentacoes")}>
                            <Link to="/movimentacoes" onClick={toggleMobileMenu}>Movimentações</Link>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default NavbarMobile;
