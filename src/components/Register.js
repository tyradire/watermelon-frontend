import { observer } from 'mobx-react-lite';
import React, {useContext, useState} from 'react';
import {Context} from "../index";
import RegisterUserError from './modals/RegisterUserError';
import RegisterCheckbox from './RegisterCheckbox';
import '../pages/Auth/Auth.css';

const Register = observer(({ onSubmitRegister }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [check, setCheck] = useState(false)

  const checkSubmit = (email && password && password === repeatPassword);

  const {user} = useContext(Context)

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmitRegister(email, password, handleRole());
    user.setIsReg(true);
  }

  const handleRole = () => {
    return check ? 'ADMIN' : 'USER'
  }

  return (
    <form className='auth__form'>
      {user.isRegErr ? <RegisterUserError /> : ''}
      <input 
        className='auth__input'
        placeholder='Введите ваш Email'
        type='email'
        value={email}
        autoComplete="new"
        required
        onChange={e => setEmail(e.target.value)}
      />
      <input 
        className='auth__input'
        placeholder='Введите ваш пароль'
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <input 
        className='auth__input'
        placeholder='Повторно введите пароль'
        type='password'
        onChange={e => setRepeatPassword(e.target.value)}
      />
      <RegisterCheckbox check={check} setCheck={setCheck} />
      <div
        className='auth__submit-container'
      >
      {repeatPassword !== password ? <p className='auth__password-check'>Пароли не совпадают!</p> : <p className='auth__password-check'></p>}
        
        <button
          onClick={(e => handleSubmit(e))}
          className='auth__button'
          disabled={!checkSubmit}
        >
          Регистрация
        </button>
      </div>
      
    </form>
  );
});

export default Register;