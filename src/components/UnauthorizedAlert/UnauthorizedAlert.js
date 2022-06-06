import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts';
import './UnauthorizedAlert.css';

const UnauthorizedAlert = ({ show, location }) => {

  const navigate = useNavigate();

  return (
    <Alert className='mt-5 mx-auto unauthorized-alert' show={show} variant="warning">
        <div className='d-flex '>
          <p className='unauthorized-alert__description'>
            Только зарегистрированные пользователи могут совершать покупки и добавлять товары в {location}
          </p>
          <div className='unauthorized-alert__buttons'>
            <Button size="sm" className='m-1' onClick={() => navigate(LOGIN_ROUTE)} variant="success">
              Войти
            </Button>
            <Button size="sm" className='m-1' onClick={() => navigate(REGISTRATION_ROUTE)} variant="success">
              Зарегистрироваться
            </Button>
          </div> 
        </div>   
      </Alert>
  );
};

export default UnauthorizedAlert;