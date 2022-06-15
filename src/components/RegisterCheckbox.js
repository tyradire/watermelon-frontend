import React from 'react';
import './RegisterCheckbox.css';

const RegisterCheckbox = ({ check, setCheck }) => {

  return (
    <div className="register-checkbox">
        <label className="register-checkbox__container">
          <input type="checkbox" className="register-checkbox__input" onChange={() => setCheck(!check)} />
          <span className="register-checkbox__input"></span>
        </label>
        <p className={check ? 'register-checkbox__description register-checkbox__description_admin' : 'register-checkbox__description'}>Зарегистрироваться как администратор</p>
        <div className='register-checkbox__tooltip'>?
          <div className='register-checkbox__help' >
            Администратор может добавлять продавцов и продукты.
          </div>
        </div>  
      </div>
  );
};

export default RegisterCheckbox;