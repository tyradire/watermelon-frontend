import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './CreateOrder.css';
import SuccessOrder from './SuccessOrder';

const CreateOrder = observer(({ inputPhone, inputDate, inputEmail, productCount, priceCount }) => {

  const [show, setShow] = useState(false);
  const [closeSuccessOrder, setCloseSuccessOrder] = useState(true);

  const handleClose = () => {
    setShow(false);
    setCloseSuccessOrder(!closeSuccessOrder);
  };
  const handleShow = () => setShow(true);

  const regexEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

  const deliveryDate = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

  function splitDate(date) {
    const month = deliveryDate[parseInt(inputDate.split('-').slice(1,2), 10) - 1]
    return `${date.split('-').splice(2).reverse().join(' ')} ${month}`;
  }

  return (
    <div>
      <button 
        className='order__submit-button'
        disabled={!(inputPhone && inputDate && inputEmail.match(regexEmail) && priceCount !== 0)} 
        onClick={handleShow}
      >Купить</button>
      <Modal size="sm" show={show} onHide={handleClose} >
        <Modal.Header className='order__header'  closeButton>
          <Modal.Title>Подтверждение</Modal.Title>
        </Modal.Header>
        <Modal.Body className='order__body'>
          <p className='order__text'>Дата доставки - <span className='order__text-point'>{splitDate(inputDate)}</span></p>
          <p className='order__text'>Контактный email - <span className='order__text-point'>{inputEmail}</span></p>
          <p className='order__text'>Номер телефона - <span className='order__text-point'>{inputPhone}</span></p>
          <p className='order__text'>Количество позиций - <span className='order__text-point'>{productCount}</span></p>
          <p className='order__text'>Общая стоимость - <span className='order__text-point'>{priceCount} &#8381;</span></p>
        </Modal.Body>
        <Modal.Footer className='order__footer'>
          <Button className="px-3" variant="danger" onClick={handleClose}>
            X
          </Button>
          <Button variant="success" onClick={handleClose}>
            Подтвердить
          </Button>
        </Modal.Footer>
      </Modal>
      <SuccessOrder closeSuccessOrder={closeSuccessOrder} setCloseSuccessOrder={setCloseSuccessOrder} />
    </div>
  );
});

export default CreateOrder;