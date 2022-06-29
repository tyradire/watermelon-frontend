import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../../index';

const LoginUserError = observer(() => {
  
  const {user} = useContext(Context)

  const closeLoginUserError = () => {
    user.setIsLoginErr(false);
  }

  return (
    <div
      onClick={closeLoginUserError}
      className={user.isLoginErr ? 'register-user__container' : 'register-user__container_hide'}
    >
      <div className='register-user__header'>
        <div id="example-modal-sizes-title-sm" className='register-user__title register-user__title_err'>
          Введены некорректные данные!
        </div>
        <div className='register-user__close-btn' onClick={closeLoginUserError}></div>
      </div>
    </div>
  );
});

export default LoginUserError;