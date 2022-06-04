import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { createVendor } from '../../utils/VendorApi';

const CreateVendor = ({ show, onHide }) => {

  const [value, setValue] = useState('');

  const addVendor = () => {
    createVendor({name: value}).then(data => {
      setValue('');
      onHide();
    })
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
};

export default CreateVendor;