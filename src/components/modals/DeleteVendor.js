import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Button, Dropdown, Form, Modal } from 'react-bootstrap';
import { Context } from '../../index';
import { deleteVendor } from '../../utils/VendorApi';

const DeleteVendor = observer(({ show, onHide }) => {

  const [valueVendor, setValueVendor] = useState('');

  const {product} = useContext(Context)

  const deleteVendorButton = () => {

    deleteVendor(valueVendor)
    .then(data => {
      product.deleteVendor(valueVendor);
      product.deleteProductsByVendor(valueVendor);
      setValueVendor('');
      onHide();
    })
    .catch(err => console.log(err))
  }

  console.log(product.vendors)

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
        Удалить производителя
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Dropdown className='mt-2 mb-2'>
          <Dropdown.Toggle>{valueVendor || 'Выберите производителя'}</Dropdown.Toggle>
          <Dropdown.Menu>
            {Object.keys(product.vendors).map(vendor =>
              <Dropdown.Item onClick={() => setValueVendor(product.vendors[vendor])} key={vendor}>{product.vendors[vendor]}</Dropdown.Item>  
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
      <Button variant='outline-success' onClick={deleteVendorButton}>Удалить</Button>
    </Modal.Footer>
  </Modal>
  );
});

export default DeleteVendor;