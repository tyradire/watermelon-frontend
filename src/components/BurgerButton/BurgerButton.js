import React, { useContext, useState } from 'react';
import burgerButton from '../../assets/burger.svg';
import { BASKET_ROUTE, FAVOURITES_ROUTE, SHOP_ROUTE } from '../../utils/consts';
import { Context } from '../../index';
import like from '../../assets/like-active.svg';
import './BurgerButton.css';

const BurgerButton = ({ signOut }) => {

  const [burgerOpen, setBurgerOpen] = useState(false);

  const {user} = useContext(Context);

  const openBurgerMenu = () => {
    setBurgerOpen(!burgerOpen);
  }

  return (
    <div className='burger'>
      <div className={burgerOpen ? 'burger__cover burger__cover_opened' : 'burger__cover'}>
        <div onClick={() => {openBurgerMenu()}} className='burger__close'></div>
        <p className='burger__email'>{user.email}</p>
        <div className='burger__list'>  
          <a className='burger__list-item' href={FAVOURITES_ROUTE}>Избранное <img src={like} alt="Лайк" width={16} height={16} /></a>
          <a className='burger__list-item' href={BASKET_ROUTE}>Корзина</a>
          <a className='burger__list-item' href={SHOP_ROUTE}>Магазин</a>
          <a className='burger__list-item' href={SHOP_ROUTE} onClick={() => signOut()}>Выйти</a>
        </div>
      </div>
      <img onClick={() => {openBurgerMenu()}} className='burger__button' alt='button' src={burgerButton}/>
    </div>
  );
};

export default BurgerButton;