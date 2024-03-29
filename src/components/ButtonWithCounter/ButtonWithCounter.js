import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../../index';
import './ButtonWithCounter.css';

const ButtonWithCounter = observer(({ productId, addProduct, deleteProduct, notAuth }) => {

  const {product} = useContext(Context);
  const {user} = useContext(Context);

  return (
    <div 
        className="button-counter"        
        disabled={!user.isAuth}
        >
          {Object.keys(product.basket).includes(productId + '') ? 
            <div className='button-counter__quantity-wrapper'>
              <button alt='Минус' className='button-counter__count-btn' onClick={deleteProduct} disabled={(product.basket[productId] ? product.basket[productId].quantity : 1) < 1}>-</button>
              <p className='button-counter__quantity'>{product.basket[productId].quantity}</p>
              <button alt='Плюс' className='button-counter__count-btn' onClick={addProduct}>+</button>
            </div> :
           <div
            className='button-counter__add-btn'
            onClick={user.isAuth ? addProduct : notAuth}
           >
             Добавить в корзину
            </div>}
      </div>
  );
});

export default ButtonWithCounter;