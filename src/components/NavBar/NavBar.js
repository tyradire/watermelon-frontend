import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../../index';
import { SHOP_ROUTE, LOGIN_ROUTE, ADMIN_ROUTE, BASKET_ROUTE, FAVOURITES_ROUTE } from '../../utils/consts';
import BasketContainer from '../BasketContainer/BasketContainer';
import like from '../../assets/like-bookmark.svg';
import './NavBar.css';
import BurgerButton from '../BurgerButton/BurgerButton';
import SearchForm from '../SearchForm/SearchForm';
import watermelonLogo from '../../assets/watermelon-logo.png';

const NavBar = observer(() => {

  const location = useLocation()
  const notBasket = location.pathname !== BASKET_ROUTE
  const isFavourites = location.pathname === FAVOURITES_ROUTE
  const isShop = location.pathname === SHOP_ROUTE

  const [isMobile, setIsMobile] = useState(false);

  const {user} = useContext(Context);
  const {product} = useContext(Context);
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem('jwt');
    user.setUser({});
    user.setIsAuth(false);
    user.setLikes([]);
    product.clearBasket();
  }

  useEffect(() => {
    window.addEventListener('resize', setWindowSize);
    return () => {
      window.removeEventListener('resize', setWindowSize);
    };
  }, []);

  const setWindowSize = () => {
    if (window.screen.width < 500) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    return
  }

  useEffect(() => {
    setWindowSize();
  },[])

  return (
    <div className='navbar-main' >
      <div className='navbar-container'>
      <div className='navbar__nav-side'>
        <Link className="navbar__logo-link" to={SHOP_ROUTE}>
          <img src={watermelonLogo} className="logo-link__pic" />
          <p className='logo-link__name'>SHOP.RU</p>
        </Link>
        {user.isAuth ? 
            (
              !isMobile ?
              <Link className='navbar__favourites-button' to={FAVOURITES_ROUTE}>
                <p className={isFavourites ? 'favourites-button__text favourites-button__text_active' : 'favourites-button__text'}>Избранное</p>
                <div className='favourites-button__icon'>
                  <svg width="34px" height="34px" viewBox="0 0 22 22" fill="#ff6666" stroke="#0f5132" xmlns="http://www.w3.org/2000/svg"><path  d="M19 22V4c0-1.103-.897-2-2-2H7c-1.103 0-2 .897-2 2v18l7-4.666L19 22zM8.006 8.056c0-.568.224-1.083.585-1.456.361-.372.86-.603 1.412-.603 0 0 .996-.003 1.997 1.029 1.001-1.032 1.997-1.029 1.997-1.029.552 0 1.051.23 1.412.603s.585.888.585 1.456-.224 1.084-.585 1.456L12 13.203 8.591 9.512a2.083 2.083 0 0 1-.585-1.456z"/></svg>
                </div>
              </Link> :
              <BurgerButton signOut={signOut} />
            )
            : ''
        }
      </div>
      {user.isAuth ?
        (!isMobile ? 
        <div className='navbar__user-side'>
          
          <p className='navbar__email'>{user.email}</p>
          {notBasket ? <BasketContainer /> : ''}
          {user.role === 'ADMIN' ? <div variant={'outline-light'} onClick={() => navigate(ADMIN_ROUTE)} className="navbar__admin-button">
            <svg width="28px" height="28px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="none" stroke="#589377" stroke-width="2" d="M8,11 C10.7614237,11 13,8.76142375 13,6 C13,3.23857625 10.7614237,1 8,1 C5.23857625,1 3,3.23857625 3,6 C3,8.76142375 5.23857625,11 8,11 Z M13.0233822,13.0234994 C11.7718684,11.7594056 10.0125018,11 8,11 C4,11 1,14 1,18 L1,23 L8,23 M10,19.5 C10,20.88 11.12,22 12.5,22 C13.881,22 15,20.88 15,19.5 C15,18.119 13.881,17 12.5,17 C11.12,17 10,18.119 10,19.5 L10,19.5 Z M23,15 L20,12 L14,18 M17.5,14.5 L20.5,17.5 L17.5,14.5 Z"/>
            </svg>
          </div> : ''}
          <div onClick={() => signOut()} className="navbar__auth-button">
            <svg width="28px" height="28px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="none" stroke="#589377" stroke-width="2" d="M13,9 L13,2 L1,2 L1,22 L13,22 L13,15 M22,12 L5,12 M17,7 L22,12 L17,17"/>
            </svg>
          </div>
        </div>
        : '')
        :
        <div className='navbar__login' onClick={() => navigate(LOGIN_ROUTE)}>
          <p className='navbar__login-text'>Войти</p>
        </div>
      }
      </div>{
        isShop ? <SearchForm /> : ''
      }
    </div>
  );
})

export default NavBar;