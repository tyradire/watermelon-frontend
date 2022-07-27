import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Context } from '../../index';
import { createVendor } from '../../utils/VendorApi';

const CreateVendor = observer(({ show, onHide }) => {

  const {product} = useContext(Context);

  const [value, setValue] = useState('');

  const addVendor = () => {
    createVendor({name: value})
    .then(data => {
      setValue('');
      onHide();
      product.addVendor(data);
    })
    .catch(err => console.log(err))
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
          Добавить производителя
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder='Введите название производителя'
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
        <Button variant='outline-success' onClick={addVendor}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateVendor;