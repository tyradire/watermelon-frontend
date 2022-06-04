import React, { useContext } from 'react';
import './BasketPageList.css';
import BasketPageCard from '../BasketPageCard/BasketPageCard';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import { deleteBasketProduct } from '../../utils/BasketApi';

const BasketPageList = observer(() => {

  const {product} = useContext(Context);

  const deleteProductBasket = (id) => {
    deleteBasketProduct(id)
    .then(() => {
      delete product.basket[id];
    })
    .catch(err => console.log(err));
  }

  return (
    <div>
      {
        Object.keys(product.basket).map(item => {
        return <BasketPageCard 
          key={product.basket[item].key} 
          card={product.basket[item]} 
          vendor={product.getVendorNameById(item.vendorId)}
          deleteProduct={deleteProductBasket}
        />
        })
      }
    </div>
  );
});

export default BasketPageList;