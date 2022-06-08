import React, {useContext, useState} from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
import {Context} from "../index";
import './Register.css';
import RegisterUserError from './modals/RegisterUserError';
import { observer } from 'mobx-react-lite';

const Register = observer(({ onSubmitRegister, registerError }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [check, setCheck] = useState(false);

  const {user} = useContext(Context);

  const handleSubmit = () => {
    onSubmitRegister(email, password, handleRole());
    user.setIsReg(true);
  }

  const handleRole = () => {
    return check ? 'ADMIN' : 'USER'
  }

  return (
    <Form className='d-flex flex-column'>
      {user.isRegErr ? <RegisterUserError /> : ''}
      <Form.Control 
        className='mt-3'
        placeholder='Введите ваш Email'
        type='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Form.Control 
        className='mt-3'
        placeholder='Введите ваш пароль'
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div className='register-checkbox__container'>
        <Form.Check 
          type="switch"
          id="custom-switch"
          className='my-2 register-checkbox__admin'
          label="Зарегистрироваться как администратор"
          onChange={() => setCheck(!check)}
        />
      <div className='register-checkbox__tooltip'>?</div>
      <div className='mx-auto register-checkbox__help' >
        Администратор может добавлять продавцов и продукты.
      </div>
      </div>
      <Col
        className='d-flex justify-content-between mt-1 pl-3 pr-3'
      >
         <div className='register__interaction'>
          <p className='register__account-text'>Есть аккаунт?</p> 
          <Link className='register__link' to={LOGIN_ROUTE}>Войти</Link>
        </div>
        <div
          onClick={handleSubmit}
          className='register__button'
        >
          Регистрация
        </div>
      </Col>
    </Form>
  );
});

export default Register;