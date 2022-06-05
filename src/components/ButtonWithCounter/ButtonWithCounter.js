import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../../index';
import './ButtonWithCounter.css';

const ButtonWithCounter = observer(({ productId, addProduct, deleteProduct, card }) => {

  const {product} = useContext(Context)
  const {user} = useContext(Context);

  return (
    <div 
        className="button-counter" 
        // variant={
        //   Object.keys(product.basket).includes(productId + '') ?
        //   "success" :
        //   "outline-success"
        // }         
        disabled={!user.isAuth}
        >
          {Object.keys(product.basket).includes(productId + '') ? 
            <div className='button-counter__quantity-wrapper'>
              <button alt='Минус' className='button-counter__count-btn' onClick={deleteProduct} disabled={(product.basket[productId] ? product.basket[productId].quantity : 1) < 2}>-</button>
              <p className='button-counter__quantity'>{product.basket[productId].quantity}</p>
              <button alt='Плюс' className='button-counter__count-btn' onClick={addProduct}>+</button>
            </div> :
           <div
            className='button-counter__add-btn'
            onClick={addProduct} 
           >
             Добавить в корзину
            </div>}
      </div>
  );
});

export default ButtonWithCounter;