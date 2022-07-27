import React, { useContext } from 'react';
import './BasketItem.css';
import { observer } from 'mobx-react-lite';
import { addToBasket, deleteOnePiece } from '../../utils/BasketApi';
import {Context} from "../../index";
import { Link } from 'react-router-dom';
import defaultImage from '../../assets/default-image.jpg';

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
      <img className='product__image' alt={'product'} src={card['img'] ? process.env.REACT_APP_PUBLIC_URL + card['img'] : defaultImage}/>
      <Link to={`product/${card.productId}`} className='product__title' target='_blank'>{ card['name'] }</Link>
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