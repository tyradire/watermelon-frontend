import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ProductList from '../components/ProductList';
import VendorBar from '../components/VendorBar';
import { getProducts } from '../utils/ProductApi';
import {Context} from "../index";
import UnauthorizedAlert from '../components/UnauthorizedAlert/UnauthorizedAlert';

const Shop = observer(() => {

  const [show, setShow] = useState(false);

  const {product} = useContext(Context)

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

  return (
    <Container>
      <Row className='mt-3'>
        <Col md={3} className='mt-2'>
          <VendorBar />
        </Col>
        <Col md={9}>
          <ProductList alert={alert} />
        </Col>
      </Row>
      <UnauthorizedAlert show={show} setShow={setShow} location={'избранное'} />
    </Container>
  );
});

export default Shop;