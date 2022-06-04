import React, { useContext } from 'react';
import './BasketItem.css';
import { observer } from 'mobx-react-lite';
import { addToBasket, deleteOnePiece } from '../../utils/BasketApi';
import {Context} from "../../index";

const BasketItem = observer(({ card, deleteProduct }) => {

  const {product} = useContext(Context)

  const deleteItem = () => {
    deleteProduct(card.productId);
  } 

  const clickMinus = () => {
    deleteOnePiece(card.productId);
    product.deleteProductPiece(card.productId);
  }

  const clickPlus = () => {
    addToBasket(card.productId)
    .then((item) => {
      let newProduct = {};
      newProduct[item.product.productId] = { name: card.name, price: card.price, img: card.img, key: item.product.id, quantity: 1, productId: item.product.productId };
      product.addProductToBasket(newProduct);
    })
    .catch(err => console.log(err));
  };

  return (
    <div className='product'>
      <button className='product__delete-btn' onClick={deleteItem}><span>x</span></button>
      <img className='product__image' alt={'product'} src={process.env.REACT_APP_PUBLIC_URL + card['img']}/>
      <p className='product__title'>{ card['name'] }</p>
      <div className='product__quantity-wrapper'>
        <button alt='minus-button' className='quantity-wrapper__btn quantity-wrapper__btn-minus' onClick={clickMinus} disabled={product.basket[card.productId].quantity < 2}></button>
        <p className='product__quantity'>{card.quantity}</p>
        <button alt='minus-button' className='quantity-wrapper__btn quantity-wrapper__btn-plus' onClick={clickPlus}></button>
      </div>
      <p className='product__price'>{ card.price } &#8381;</p> 
    </div>
  );
});

export default BasketItem;