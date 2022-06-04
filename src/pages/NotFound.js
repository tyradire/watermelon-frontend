import React from 'react';
import zero from '../assets/zero.svg';
import { useNavigate } from 'react-router-dom';
import { SHOP_ROUTE } from '../utils/consts';

const NotFound = () => {

  const navigate  = useNavigate();

  return (
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-12 text-center">
          <span class="display-1 d-block">4<img className='mb-3' src={zero} alt='Арбуз' width={60} height={60} />4</span>
          <div class="mb-4 lead">Страница не найдена.</div>
          <button onClick={() => navigate(-1)} class="btn btn-link">Назад</button>
          <button onClick={() => navigate(SHOP_ROUTE)} class="btn btn-link">На главную</button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;