import React, { useContext, useState } from 'react';
import { Button, Dropdown, Form, Modal } from 'react-bootstrap';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import { createProduct } from '../../utils/ProductApi';
import './CreateProduct.css';

const CreateProduct = observer(({ show, onHide }) => {

  const { product } = useContext(Context);
  
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState('');

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  }

  const addProduct = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', `${price}`);
    formData.append('img', file);
    formData.append('vendorId', product.selectedVendor);
    if (info.length > 0) {formData.append('info', info)};
    createProduct(formData)
    .then((data) => {
      product.addOneProduct(data)
      onHide()
    })
    .catch(err => console.log(err));
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить продукт
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className='mt-2'>
            <Dropdown.Toggle>{product.vendors[product.selectedVendor] || 'Выберите производителя'}</Dropdown.Toggle>
            <Dropdown.Menu>
              {Object.keys(product.vendors).map(vendor =>
                <Dropdown.Item onClick={() => product.setSelectedVendor(vendor)} key={vendor}>{product.vendors[vendor]}</Dropdown.Item>  
              )}
            </Dropdown.Menu>
            <Form.Control 
              className='mt-3'
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder='Введите название продукта *'
            />
            <Form.Control 
              className='mt-3'
              value={price || 'Введите стоимость продукта'}
              onChange={e => setPrice(Number(e.target.value))}
              placeholder='Введите стоимость продукта *'
              type='number'
            />
            <Form.Control 
              className='mt-3'
              value={info}
              onChange={e => setInfo(e.target.value)}
              placeholder='Введите описание продукта'
            />
            <Form.Control 
              className='mt-3'
              type='file'
              onChange={selectFile}
            />
            <div className='create-product__note'>* - Обязательные поля</div>
          </Dropdown>
        </Form>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
        <Button variant='outline-success' onClick={addProduct}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateProduct;