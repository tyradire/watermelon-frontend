import React, { useContext, useEffect, useState } from 'react';
import { getOneProduct } from '../utils/ProductApi';
import { addToBasket, deleteOnePiece } from '../utils/BasketApi';
import { Link, useParams } from 'react-router-dom';
import likeBtn from '../assets/like.svg';
import defaultImage from '../assets/default-image.jpg';
import likeBtnActive from '../assets/like-active.svg';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import './ProductPage.css';
import { addLike, deleteLike } from '../utils/LikeApi';
import ButtonWithCounter from '../components/ButtonWithCounter/ButtonWithCounter';

const ProductPage = observer(() => {

  const {product} = useContext(Context)
  const {user} = useContext(Context)
  const [pageItem, setPageItem] = useState({info: []})
  const {id} = useParams();

  const addProduct = () => {
    addToBasket(id)
    .then((item) => {
      let newProduct = {};
      newProduct[item.product.productId] = { name: pageItem.name, vendorId: pageItem.vendorId, price: pageItem.price, img: pageItem.img, key: item.product.id, quantity: 1, productId: item.product.productId };
      product.addProductToBasket(newProduct);
    })
    .catch(err => console.log(err));
  };

  const deleteProduct = () => {
    deleteOnePiece(id)
    .then(() => {
      if (product.basket[id].quantity < 2) {
        delete product.basket[id]
      } else {
        product.deleteProductPiece(id);
      }})
    .catch(err => console.log(err));
  }

  useEffect(() => {
    getOneProduct(id)
    .then(product => setPageItem(product))
    .catch(err => console.log(err))
  }, []);

  const productPageLike = () => {
    if (user.likes.includes(parseInt(id))) {
      deleteLike(id)
      .then(res => {
        user.deleteLikeById(parseInt(id))
      })
      .catch(err => console.log(err))
    } else {
    addLike(id)
    .then(res => {
      user.addLikeById(parseInt(id))
    })
    .catch(err => console.log(err))}
  }

  const selectVendor = () => {
    product.setSelectedVendor({id: pageItem.vendorId + '', name: product.vendors[pageItem.vendorId]});
  }

  return (
    <div className='product-page'>
      <div className='product-page__container'>
        <div>
          <img alt='фото товара' className='product-page__image' src={pageItem.img ? process.env.REACT_APP_PUBLIC_URL + pageItem.img : defaultImage}/>
        </div>
        <div className='product-page__text-container'>
          <h2 className='product-page__title'>{pageItem.name}</h2>
          <p className='product-page__description'>{pageItem.info}</p>
          <Link to={'/'} replace className='product-page__vendor' onClick={selectVendor}>{product.vendors[pageItem.vendorId]}</Link>
          <div className='product-page__buy-order'>
            <p className='product-page__price'>{pageItem.price} &#8381;</p>
            <ButtonWithCounter productId={id} addProduct={addProduct} deleteProduct={deleteProduct} />
          </div>
        </div>
        <img
          alt='лайк'
          className='product-page__like'
          width={30}
          height={30}
          src={
            user.likes.includes(parseInt(id)) ? likeBtnActive : likeBtn
          }
          onClick={productPageLike}
        />
      </div>
    </div>
  );
});

export default ProductPage;