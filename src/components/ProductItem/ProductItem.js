import React, { useContext } from 'react';
import { Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import likeBtn from '../../assets/like.svg';
import likeBtnActive from '../../assets/like-active.svg';
import { PRODUCT_ROUTE } from '../../utils/consts';
import { addToBasket, deleteOnePiece } from '../../utils/BasketApi';
import {Context} from "../../index";
import { observer } from 'mobx-react-lite';
import './ProductItem.css';
import { addLike, deleteLike } from '../../utils/LikeApi';
import ButtonWithCounter from '../ButtonWithCounter/ButtonWithCounter';

const ProductItem = observer(({ card, vendor, vendorId, productId, alert }) => {

  const {product} = useContext(Context);
  const {user} = useContext(Context);
  const navigate = useNavigate();

  const toggleLike = () => {
    if (user.likes.includes(card.id)) {
      deleteLike(card.id)
      .then(res => user.deleteLikeById(card.id))
      .catch(err => console.log(err))
    } else {
    addLike(card.id)
    .then(res => user.addLikeById(productId))
    .catch(err => console.log(err))}
  }

  const notAuth = () => {
    alert(true);
  }

  const addProduct = () => {
    addToBasket(card.id)
    .then((item) => {
      let newProduct = {};
      newProduct[item.product.productId] = { name: card.name, vendorId: vendorId, price: card.price, img: card.img, key: item.product.id, quantity: 1, productId: item.product.productId };
      product.addProductToBasket(newProduct);
    })
    .catch(err => console.log(err));
  };

  // const deleteProductFull = () => {
  //   deleteBasketProduct(card.id)
  //   .then(() => {
  //     delete product.basket[card.id];
  //   })
  //   .catch(err => console.log(err));
  // }

  const deleteProduct = () => {
    deleteOnePiece(card.id)
    .then(() => {
      if (product.basket[card.id].quantity < 2) {
        delete product.basket[card.id]
      } else {
        product.deleteProductPiece(card.id);
      }})
    .catch(err => console.log(err));
  }

  return (
    <div className='product-item__card'>
      <Image className='product-item__image' src={process.env.REACT_APP_PUBLIC_URL + card.img} onClick={() => navigate(PRODUCT_ROUTE + '/' + card.id)}/>
      {/* <button className='product-item__delete-button' onClick={() => deleteProductFull()}>Х</button> */}
      <div className='product-item__info-wrapper'>
        <Link className='product-item__product-name' to={(PRODUCT_ROUTE + '/' + card.id)}>{card.name}</Link>
        <img className='product-item__like-btn'
          alt='лайк'
          src={
            user.likes.includes(productId) ? likeBtnActive : likeBtn
          }
          onClick={user.isAuth ? toggleLike : notAuth}/>
      </div>
      {/* <div className='product-item__vendor-name'>{vendor}</div> */}
      <ButtonWithCounter className='product-item__button-component' productId={productId} addProduct={addProduct} deleteProduct={deleteProduct} card={card} alert={alert} notAuth={notAuth} />
    </div>
  );
});

export default ProductItem;