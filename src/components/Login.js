import { observer } from 'mobx-react-lite';
import React, {useContext, useState} from 'react';
import { Context } from '../index';
import '../pages/Auth/Auth.css';
import LoginUserError from './modals/LoginUserError';

const Login = observer(({ onSubmitLogin }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);

  const loginEmailReg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/g;

  const {user} = useContext(Context)

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmitLogin(email, password);
  }

  return (
    <form className='auth__form'>
      {user.isLoginErr ? <LoginUserError /> : ''}
      <input 
        className='auth__input'
        placeholder='Введите ваш Email'
        type='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        pattern="^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$"
        required
      />
      <div className='auth__password-wrapper'>
        <input 
          className='auth__input'
          placeholder='Введите ваш пароль'
          type={!showPassword ? 'password' : 'text'}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <label className={!showPassword ? 'auth__show-wrapper' : 'auth__show-wrapper auth__show-wrapper_unshow'}>
          <input 
          className='auth__show-button' 
          type={'checkbox'}
          onClick={e => setShowPassword(!showPassword)}
          ></input>
        </label>
      </div>
      <div
        className='auth__submit-container'
      >
        <p className='auth__password-check'></p>
        <button
          onClick={e => handleSubmit(e)}
          disabled={!(email.match(loginEmailReg) && password)}
          className='auth__button auth__button_login'
        >
          Войти
        </button>
      </div>
    </form>
  );
});

export default Login;