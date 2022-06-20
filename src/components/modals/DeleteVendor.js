import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Context } from '../../index';
import { deleteVendor } from '../../utils/VendorApi';

const DeleteVendor = ({ show, onHide }) => {

  const [valueVendor, setValueVendor] = useState('');

  const {product} = useContext(Context)

  const deleteVendorButton = () => {
    deleteVendor(valueVendor)
    .then(data => {
      product.deleteVendor(valueVendor);
      setValueVendor('');
      onHide();
    })
  }

  return (
    <div>
      <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Удалить производителя
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={valueVendor}
            onChange={e => setValueVendor(e.target.value)}
            placeholder='Введите название производителя'
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
        <Button variant='outline-success' onClick={deleteVendorButton}>Удалить</Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
};

export default DeleteVendor;