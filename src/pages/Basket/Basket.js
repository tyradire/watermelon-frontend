import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../index';
import './Basket.css';
import BasketPageList from '../../components/BasketPageList/BasketPageList';
import { getBasketProducts } from '../../utils/BasketApi';
import { Button, Modal } from 'react-bootstrap';
import CreateOrder from '../../components/modals/CreateOrder';
import Empty from '../../components/Empty/Empty';

const Basket = observer(() => {
  
  let date = new Date()
  let todayDate = date.toISOString().split('T')[0];
  let now = Date.now();
  let nowNew = new Date(now + 86400000 * 3).toLocaleDateString().split('.').reverse().join('-');

  const {product} = useContext(Context);
  const {user} = useContext(Context);
  const [basketIsLoading, setBasketIsLoading] = useState(true);
  const [inputEmail, setInputEmail] = useState(user.email);
  const [inputPhone, setInputPhone] = useState('');
  const [inputDate, setInputDate] = useState(todayDate);
 
  const priceCount = Object.keys(product.basket).reduce((a, b) => a + product.basket[b].price * product.basket[b].quantity, 0)
  const productCount = Object.keys(product.basket).reduce((a, b) => a + product.basket[b].quantity, 0);
  
  function morph(int, array) {
    return (array = array || ['товар', 'товара', 'товаров']) && array[(int % 100 > 4 && int % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(int % 10 < 5) ? int % 10 : 5]];
  }

  function editPhone(e) {
    let formattingValue = formattingInputValue(e.target);
    if (!formattingValue || e.target.value == '+') {
      console.log(11111111111)
      setInputPhone('');
      return e.target.value = '';
    };
    
    if (['7', '8', '9'].indexOf(formattingValue[0]) !== -1) {
      if (formattingValue[0] === '9') return setInputPhone('+7' + formattingValue); //если ввод начали с "9", меняем его на "+7" ВОЗМОЖНО НУЖЕН РЕТЮРН
      let firstNumbers = (formattingValue[0] == '8') ? '8' : '+7';
      //firstNumbers += ' ';

      setInputPhone(firstNumbers + ' ');
      if (formattingValue.length > 1) {
        firstNumbers += ' (' + formattingValue.substring(1,4);
      }
      if (formattingValue.length >= 5) {
        firstNumbers += ') ' + formattingValue.substring(4,7);
      }
      if (formattingValue.length >= 8) {
        firstNumbers += '-' + formattingValue.substring(7,9);
      }
      if (formattingValue.length >= 10) {
        firstNumbers += '-' + formattingValue.substring(9,11);
      }
      setInputPhone(firstNumbers);
    } else {
      return setInputPhone('+' + formattingValue.slice(0));
    }

  }

  function formattingInputValue(input) {
    return input.value.replace(/\D/g, '');
  }

  useEffect(() => {
    getBasketProducts()
    .then(products => {
      product.setBasket(products.product);
      setBasketIsLoading(false);
    })
    .catch(err => console.log(err));
  }, [])

  return (
    <div className='basket-page__container'>
      { Object.keys(product.basket).length === 0 ? 
          <Empty location={'корзине'} /> :
          <BasketPageList />
      }
      <div className='basket-page__form'>
        <div className='basket-page__sidebar'>
          <p className='basket-page__info'>Доставить на дом:</p>
          <p className='basket-page__input-subtitle'>Выберите дату доставки</p>
          <input 
          className='basket-page__input basket-page__input_date' 
          min={todayDate} 
          max={nowNew} 
          type={'date'} 
          id='datePicker'
          value={inputDate}
          onChange={(e) => setInputDate(e.target.value)}
          ></input>
          <p className='basket-page__input-subtitle' >Введите email</p>
          <input 
            className='basket-page__input' 
            value={inputEmail} 
            type={'email'}
            onChange={(e) => setInputEmail(e.target.value)}
            placeholder='example@example.com'
          ></input>
          <p className='basket-page__input-subtitle'>Введите номер телефона</p>
          <input 
            type={'tel'}
            value={inputPhone}
            data-tel-input
            placeholder='+7 (123) 456-78-90'
            className='basket-page__input' 
            maxLength={18}
            onChange={(e) => editPhone(e)}
          ></input>
        </div>
        <div className='basket-page__sidebar'>
          <p className='basket-page__info'>
            Итого: {basketIsLoading ? 0 : productCount} {morph(productCount, ['товар', 'товара', 'товаров'])} на 
            <span className='basket-page__price-count'> {priceCount} &#8381;</span>
          </p>
          <CreateOrder inputPhone={inputPhone} inputDate={inputDate} inputEmail={inputEmail} productCount={productCount} priceCount={priceCount} />
          {/* <Button 
            className='h-75 mx-auto mb-2 w-75' 
            variant="outline-success" 
            size="sm" 
            disabled={!(inputPhone && inputDate && inputEmail)} 
            onClick={handleShow}
          >Купить</Button> */}
          { !(inputPhone && inputDate && inputEmail && priceCount !== 0) ?
            <span className='basket-page__submit-note'>Для заказа заполните все поля</span>
          : ''}
        </div>
      </div>
      <div className='basket-page__cover'></div>
    </div>
  );
});

export default Basket;