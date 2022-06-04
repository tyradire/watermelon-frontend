import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import CreateProduct from '../components/modals/CreateProduct';
import CreateVendor from '../components/modals/CreateVendor';

const Admin = () => {

  const [vendorVisible, setVendorVisible] = useState(false);
  const [productVisible, setProductVisible] = useState(false);

  return (
    <Container className='d-flex flex-column'>
      <Button variant='outline-dark' className='mt-4 p2' onClick={() => setVendorVisible(true)} >Добавить производителя</Button>
      <Button variant='outline-dark' className='mt-4 p2' onClick={() => setProductVisible(true)} >Добавить продукт</Button>
      <CreateVendor show={vendorVisible} onHide={() => setVendorVisible(false)}/>
      <CreateProduct show={productVisible} onHide={() => setProductVisible(false)}/>
    </Container>
  );
};

export default Admin;