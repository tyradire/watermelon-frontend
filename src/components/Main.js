import React from 'react';
import AppRouter from './AppRouter';
import NavBar from './NavBar/NavBar';
import Footer from './Footer';
import './Main.css';

const Main = () => {
  return (
    <div className='main'>
      <NavBar />
      <AppRouter />
      <Footer />
    </div>
  );
};

export default Main;