import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Row } from 'react-bootstrap';
import { Context } from '../index';
import ProductItem from './ProductItem/ProductItem';

const ProductList = observer(({ show, alert }) => {

  const { product } = useContext(Context)

  return (
    <Row className='d-flex'>
      {product.products.map(item => 
         item.vendorId === ( Number(product.selectedVendor.id) || item.vendorId ) ?
          <ProductItem show={show} alert={alert} key={item.id} card={item} vendor={product.vendors[item.vendorId]} vendorId={item.vendorId} productId={item.id} />
        : ''
      )}
    </Row>
  );
});

export default ProductList;