import { Link } from "react-router-dom";
import '../styles/dashboard.css';
import logo from '../assets/img/LOGO.svg';
import { BellIcon, Cog6ToothIcon  } from '@heroicons/react/24/outline';


const Navbar = () => {
    return (
        <nav className='navbar-dash bg-athena'>
            <div className="logo">
                <img src={logo} alt="logo-athena" />
            </div>
            <ul>
                <li>
                    <Link to="/" >Dashboard</Link>
                </li>
                <li>
                    <Link to="vendas">Vendas</Link>
                </li>
                <li>
                    <Link to="compras">Compras</Link>
                </li>
                <li>
                    <Link to="relatorios">Relatórios</Link>
                </li>
            </ul>
            <div className="nav-utils">
                <button>
                    <BellIcon className="h-6 w-6 icon-nav" />
                </button>
                <button>
                    <Cog6ToothIcon  className="h-6 w-6 icon-nav" />
                </button>
            </div>
        </nav>
    )
};

export default Navbar;
