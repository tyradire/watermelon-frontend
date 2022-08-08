import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import VendorBar from '../components/VendorBar';
import { getProducts } from '../utils/ProductApi';
import {Context} from "../index";
import UnauthorizedAlert from '../components/UnauthorizedAlert/UnauthorizedAlert';
import './Shop.css';
import RegisterUser from '../components/modals/RegisterUser';

const Shop = observer(() => {

  const [show, setShow] = useState(false);

  const {product} = useContext(Context)
  const {user} = useContext(Context)

  const alert = () => {
    setShow(true)
    setTimeout(function () {
      setShow(false);
    }, 4000);
  }

  useEffect(() => {
    getProducts(product.selectedVendor.id)
    .then(data => product.setProducts(data))
    .catch(err => console.log(err))
  }, [])

  let newArray = [];

  for (let i = 0; i < product.products.length; i++) {
    newArray.push(product.products[i].name);
  }

  return (
    <div>
      <div className='shop'>
        <div >
          <VendorBar />
        </div>
        <div >
          <ProductList alert={alert} />
        </div>
      </div>
      <UnauthorizedAlert show={show} setShow={setShow} location={'избранное'} />
      {user.isReg ? <RegisterUser /> : ''}
    </div>
  );
});

export default Shop;