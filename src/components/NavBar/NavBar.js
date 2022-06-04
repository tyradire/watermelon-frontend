import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../../index';
import { Button, Container, Navbar, Nav } from 'react-bootstrap';
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
    if (window.innerWidth < 500) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    return
  }

  return (
    <Navbar className='navbar' bg="dark" variant="dark">
      <Container>
        <Nav className='navbar__container'>
          <Navbar.Brand className="text-decoration-none text-white" href={SHOP_ROUTE}>
            Watermelon Shop
          </Navbar.Brand>
          {user.isAuth ? 
              (
                !isMobile ?
                <Nav.Link className={`text-decoration-none  d-inline ${isFavourites ? 'text-danger' : ''}`} href={FAVOURITES_ROUTE}>
                  Favourites <img src={like} alt="Лайк" width={16} height={16} />
                </Nav.Link> :
                <BurgerButton />
              )
              : ''
          }
        </Nav>
        {user.isAuth ?
          (!isMobile ? 
          <Nav>
            <p className='text-white-50 m-3'>{user.email}</p>
            {notBasket ? <BasketContainer /> : ''}
            {user.role === 'ADMIN' ? <Button variant={'outline-light'} onClick={() => navigate(ADMIN_ROUTE)} className="ms-2 m-2" >Админ панель</Button> : ''}
            <div onClick={() => signOut()} className="navbar__auth-button navbar__auth-button_logout"></div>
          </Nav>
          : '')
          :
          <Nav className='navbar__login' onClick={() => navigate(LOGIN_ROUTE)}>
            <p className='navbar__login-text'>Войти</p>
            <div className="navbar__login-button"></div>
          </Nav>
        }
      </Container>
    </Navbar>
  );
})

export default NavBar;