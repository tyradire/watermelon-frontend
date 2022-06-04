import React, {useState} from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
import './Register.css';

const Register = ({ onSubmitRegister, registerError }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    onSubmitRegister(email, password);
  }

  // window.addEventListener('mousemove', function(evt) {
  //   console.log(evt.target)
  // })

  return (
    <Form className='d-flex flex-column'>
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
          className='my-2'
          label="Зарегистрироваться как администратор"
        />
      <div className='register-checkbox__tooltip'>?</div>
      <div className='mx-auto register-checkbox__help' >
        Администратор может добавлять продавцов и продукты.
      </div>
      </div>
      <Col
        className='d-flex justify-content-between mt-1 pl-3 pr-3'
      >
        <div>Есть аккаунт? <Link to={LOGIN_ROUTE}>Войти</Link></div>
        <Button
          variant={'outline-success'}
          onClick={handleSubmit}
        >
          Регистрация
        </Button>
      </Col>
    </Form>
  );
};

export default Register;