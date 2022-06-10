import React, { useContext, useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { getOneProduct } from '../utils/ProductApi';
import { addToBasket } from '../utils/BasketApi';
import { useParams } from 'react-router-dom';
import likeBtn from '../assets/like.svg';
import plug from '../assets/image-plug.png';
import likeBtnActive from '../assets/like-active.svg';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import './ProductPage.css';

const ProductPage = observer(() => {

  const {product} = useContext(Context)
  const {user} = useContext(Context)
  const [pageItem, setPageItem] = useState({info: []})
  const {id} = useParams();

  const addProduct = () => {
    addToBasket(id)
    .then((item) => {
      let newProduct = {};
      newProduct[item.product.productId] = { name: pageItem.name, price: pageItem.price, img: pageItem.img, key: item.product.id, quantity: 1, productId: item.product.productId };
      product.addProductToBasket(newProduct);
    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    getOneProduct(id)
    .then(product => setPageItem(product))
    .catch(err => console.log(err))
  }, []);

  return (
    <div className='product-page'>
      <div className='product-page__container'>
        <div>
          <img alt='фото товара' className='product-page__image' src={pageItem.img ? process.env.REACT_APP_PUBLIC_URL + pageItem.img : plug}/>
        </div>
        <div className='product-page__text-container'>
          <h2 className='product-page__title'>{pageItem.name}</h2>
          <p className='product-page__description'>{pageItem.info}</p>
          <div className='d-flex ms-2 mt-3 align-items-center'>
            {pageItem.price} &#8381;
            <Button variant={'outline-dark'} className='ms-5 mr-3' onClick={addProduct}>Купить</Button>
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
        />
      </div>
    </div>
  );
});

export default ProductPage;