import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import {Context} from '../../index';
import './RegisterUser.css';

const RegisterUserError = observer(() => {

  const {user} = useContext(Context)

  const closeRegisterUserError = () => {
    user.setIsRegErr(false);
  }

  return (
    <div
      onClick={closeRegisterUserError}
      className={user.isRegErr ? 'register-user__container' : 'register-user__container_hide'}
    >
      <div className='register-user__header'>
        <div id="example-modal-sizes-title-sm" className='register-user__title register-user__title_err'>
          Введены некорректные данные!
        </div>
        <div className='register-user__close-btn' onClick={closeRegisterUserError}></div>
      </div>
    </div>
  );
});

export default RegisterUserError; 