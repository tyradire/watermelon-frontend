import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import {Context} from '../../index';
import './RegisterUser.css';

const RegisterUser = observer(() => {

  const {user} = useContext(Context)

  const closeRegisterUser = () => {
    user.setIsReg(false);
  }

  return (
    <div
      onClick={closeRegisterUser}
      className={user.isReg ? 'register-user__container' : 'register-user__container_hide'}
    >
      <div className='register-user__header'>
        <div id="example-modal-sizes-title-sm" className='register-user__title'>
          Аккаунт успешно создан!
        </div>
        <div className='register-user__close-btn' onClick={closeRegisterUser}></div>
      </div>
    </div>
  );
});

export default RegisterUser; 