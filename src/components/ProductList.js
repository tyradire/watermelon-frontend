import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../index';
import ProductItem from './ProductItem/ProductItem';
import './ProductList.css';

const ProductList = observer(({ show, alert }) => {

  const { product } = useContext(Context)

  return (
    <div className='product-list'>
      {product.filtredProducts.map(item => 
         item.vendorId === ( Number(product.selectedVendor.id) || item.vendorId ) ?
          <ProductItem show={show} alert={alert} key={item.id} card={item} vendor={product.vendors[item.vendorId]} vendorId={item.vendorId} productId={item.id} />
        : ''
      )}
    </div>
  );
});

export default ProductList;