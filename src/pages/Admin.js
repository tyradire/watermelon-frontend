import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import CreateProduct from '../components/modals/CreateProduct';
import CreateVendor from '../components/modals/CreateVendor';
import DeleteVendor from '../components/modals/DeleteVendor';
import './Admin.css';

const Admin = () => {

  const [vendorVisible, setVendorVisible] = useState(false);
  const [productVisible, setProductVisible] = useState(false);
  const [productDeleteVisible, setProductDeleteVisible] = useState(false);

  return (
    <div className='admin-page'>
      <div className='admin-page__buttons'>
        <Button variant="success" className='mt-4 p2' onClick={() => setVendorVisible(true)} >Добавить производителя</Button>
        <Button variant="success" className='mt-4 p2' onClick={() => setProductVisible(true)} >Добавить продукт</Button>
        {/* <Button variant="success" className='mt-4 p2' onClick={() => setProductDeleteVisible(true)} >Удалить производителя</Button> */}
        {/* Временно отключил удаление производителя */}
      </div>
      <CreateVendor show={vendorVisible} onHide={() => setVendorVisible(false)}/>
      <CreateProduct show={productVisible} onHide={() => setProductVisible(false)}/>
      <DeleteVendor show={productDeleteVisible} onHide={() => setProductDeleteVisible(false)}/>
    </div>
  );
};

export default Admin;