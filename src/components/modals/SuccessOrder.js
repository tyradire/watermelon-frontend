import React from 'react';
import './RegisterUser.css';

const SuccessOrder = ({ closeSuccessOrder, setCloseSuccessOrder }) => {

  return (
    <div
    className={!closeSuccessOrder ? 'register-user__container' : 'register-user__container_hide'}
    >
      <div className='register-user__header'>
        <div id="example-modal-sizes-title-sm" className='register-user__title'>
          Заказ успешно отправлен!
        </div>
        <div className='register-user__close-btn' onClick={e => setCloseSuccessOrder(!closeSuccessOrder)}></div>
      </div>
    </div>
  );
};

export default SuccessOrder;