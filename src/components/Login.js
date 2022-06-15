import React, {useState} from 'react';
import '../pages/Auth/Auth.css';

const Login = ({ onSubmitLogin }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmitLogin(email, password);
  }

  return (
    <form className='auth__form'>
      <input 
        className='auth__input'
        placeholder='Введите ваш Email'
        type='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input 
        className='auth__input'
        placeholder='Введите ваш пароль'
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div
        className='auth__submit-container'
      >
        <p className='auth__password-check'></p>
        <button
          onClick={e => handleSubmit(e)}
          disabled={!(email && password)}
          className='auth__button auth__button_login'
        >
          Войти
        </button>
      </div>
    </form>
  );
};

export default Login;