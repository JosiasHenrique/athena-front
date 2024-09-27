import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Painel de Controle</h1>
      <nav>
        <ul>
          <li>
            <Link to="vendas">Vendas</Link>
          </li>
          <li>
            <Link to="produtos">Produtos</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
};

export default Dashboard;
