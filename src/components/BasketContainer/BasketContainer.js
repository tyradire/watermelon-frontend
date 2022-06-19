import React, { useContext, useEffect } from 'react';
import './BasketContainer.css';
import BasketItem from '../BasketItem/BasketItem';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BASKET_ROUTE } from '../../utils/consts';
import { deleteBasketProduct, getBasketProducts } from '../../utils/BasketApi';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import basketEmpty from '../../assets/basket-empty.png';
import basketWithProduct from '../../assets/basket-with-product.png';
import Empty from '../Empty/Empty';

const BasketContainer = observer(() => {

  const navigate = useNavigate();
  const {product} = useContext(Context)

  useEffect(() => {
    getBasketProducts()
    .then(products => {
      product.setBasket(products.product);
    })
    .catch(err => console.log(err));
  }, [])

  const deleteProductBasket = (id) => {
    deleteBasketProduct(id)
    .then(() => {
      delete product.basket[id];
    })
    .catch(err => console.log(err));
  }

  const total = Object.keys(product.basket).reduce((a, b) => a + product.basket[b].price * product.basket[b].quantity, 0);

  return (
    <div className='basket-container'>
      <div className='basket-container__button-wrapper'>
        <p className='basket-container__total-price'>{total} &#8381;</p>
        <img 
          src={Object.keys(product.basket).length === 0 ? basketEmpty : basketWithProduct} 
          alt='корзина' 
          className='basket-container__button'
          onClick={() => navigate(BASKET_ROUTE)}
        />
      </div>
      <div className='basket-container__content'>
        <span className='basket-container__arrow'></span>
        <div className='basket-container__products'>

          { Object.keys(product.basket).length === 0 ? 
          <Empty location={'корзине'} /> :

          Object.keys(product.basket).map(item =>
            <BasketItem key={product.basket[item].key} card={product.basket[item]} deleteProduct={deleteProductBasket} />
      
      )}
        </div>
        <div className='basket-container__footer d-flex justify-content-between align-items-center'>
          <div>
            <p className='footer__description-price'>Общая сумма</p>
            <p className='footer__price'>{total} &#8381;</p>
          </div>
          <Button className='h-75' variant="outline-success" size="sm" onClick={() => navigate(BASKET_ROUTE)}>В корзину</Button>
        </div>
      </div>
    </div>
  );
});

export default BasketContainer;