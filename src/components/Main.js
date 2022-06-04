import React from 'react';
import AppRouter from './AppRouter';
import NavBar from './NavBar/NavBar';

const Main = () => {
  return (
    <div>
      <NavBar />
      <AppRouter />
    </div>
  );
};

export default Main;