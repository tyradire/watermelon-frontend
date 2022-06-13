import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../../index';
import { SHOP_ROUTE, LOGIN_ROUTE, ADMIN_ROUTE, BASKET_ROUTE, FAVOURITES_ROUTE } from '../../utils/consts';
import BasketContainer from '../BasketContainer/BasketContainer';
import like from '../../assets/like-active.svg';
import './NavBar.css';
import BurgerButton from '../BurgerButton/BurgerButton';

const NavBar = observer(() => {

  const location = useLocation()
  const notBasket = location.pathname !== BASKET_ROUTE
  const isFavourites = location.pathname === FAVOURITES_ROUTE

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
    <div className='navbar-container'>
      <div className='navbar__nav-side'>
        <Link className="navbar__logo-link" to={SHOP_ROUTE}>
          Watermelon Shop
        </Link>
        {user.isAuth ? 
            (
              !isMobile ?
              <a className={`navbar__favourites-button  d-inline ${isFavourites ? 'text-danger' : ''}`} href={FAVOURITES_ROUTE}>
                Избранное <img src={like} alt="Лайк" width={16} height={16} />
              </a> :
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
          {user.role === 'ADMIN' ? <div variant={'outline-light'} onClick={() => navigate(ADMIN_ROUTE)} className="navbar__admin-button" >Админ панель</div> : ''}
          <div onClick={() => signOut()} className="navbar__auth-button navbar__auth-button_logout"></div>
        </div>
        : '')
        :
        <div className='navbar__login' onClick={() => navigate(LOGIN_ROUTE)}>
          <p className='navbar__login-text'>Войти</p>
          <div className="navbar__login-button"></div>
        </div>
      }
    </div>
  );
})

export default NavBar;