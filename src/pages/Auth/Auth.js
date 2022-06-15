import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, SHOP_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts';
import { register, authorize } from '../../utils/ApiAuth';  
import { Context } from '../../index';
import Register from '../../components/Register';
import Login from '../../components/Login';
import './Auth.css';

const Auth = observer(() => {

  const {user} = useContext(Context)
  const location = useLocation()
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE

  const handleRegisterSubmit = (email, password, role) => {
    register(email, password, role)
    .then(() => {
      handleLoginSubmit(email, password);
    })
    .catch((err) => {
      user.setIsRegErr(true);
    })
  }

  const handleLoginSubmit = (email, password) => {
    authorize(email, password)
    .then((res) => {
      localStorage.setItem('jwt', res.token);
      user.setEmail(email);
      user.setIsAuth(true);
      user.setRole(res.role);
      navigate(SHOP_ROUTE);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div
      className='auth'
    >
      <div className='auth__card'>
        <h2 className='auth__title'>
          {isLogin ? 'Авторизация' : 'Регистрация'}
        </h2>
        {
          isLogin ? <Login onSubmitLogin={handleLoginSubmit} /> : <Register onSubmitRegister={handleRegisterSubmit} />
        }
        <div className='auth__interaction'>
          <p className='auth__account-text'>{isLogin ? `Нет аккаунта?` : `Есть аккаунт?`}</p> 
          {
          isLogin ? <Link className='auth__link' to={REGISTRATION_ROUTE}>Зарегистрироваться</Link> : <Link className='auth__link' to={LOGIN_ROUTE}>Войти</Link>
        }
        </div>
      </div>      
    </div>
  );
});

export default Auth;