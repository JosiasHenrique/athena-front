import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Dashboard = () => {

  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  );
};

export default Dashboard;
