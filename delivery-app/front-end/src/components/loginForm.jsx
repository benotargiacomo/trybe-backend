import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import USER from './helper';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [buttonOn, setButtonOn] = useState(true);
  const history = useHistory();

  const handleClick = async () => {
    try {
      const body = {
        email, password,
      };
      const result = await axios.post('http://localhost:3001/user/login', body);

      localStorage.setItem(USER, JSON.stringify(result.data));
      setHasError(false);
      if (result.data.role === 'customer') {
        history.push('/customer/products');
      } else if (result.data.role === 'seller') {
        history.push('/seller/orders');
      } else {
        history.push('/admin/manage');
      }
    } catch (error) {
      console.log(error.response.data.error);
      setHasError(true);
      setMessageError(error.response.data.error);
    }
  };

  const buttonActivate = useCallback(() => {
    const passwordLength = 5;
    const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (validEmail.test(email) && password.length > passwordLength) {
      setButtonOn(false);
    } else {
      setButtonOn(true);
    }
  }, [email, password.length]);

  useEffect(() => {
    history.push('/login');
  }, [history]);

  useEffect(() => {
    buttonActivate();
  }, [buttonActivate]);

  return (
    <div>
      <form>
        <label htmlFor="login">
          login
          <input
            value={ email }
            data-testid="common_login__input-email"
            type="email"
            onChange={ ({ target }) => setEmail(target.value) }
            placeholder="email@trybeer.com"
          />
        </label>
        <label htmlFor="senha">
          senha
          <input
            value={ password }
            data-testid="common_login__input-password"
            type="password"
            onChange={ ({ target }) => setPassword(target.value) }
            placeholder="**********"
          />
        </label>
        <button
          data-testid="common_login__button-login"
          type="button"
          disabled={ buttonOn }
          onClick={ handleClick }
        >
          LOGIN
        </button>
        <button
          data-testid="common_login__button-register"
          type="button"
          onClick={ () => history.push('/register') }
        >
          Ainda não tenho conta
        </button>
        { hasError
          ? (
            <h3 data-testid="common_login__element-invalid-email">{messageError}</h3>
          ) : null }
      </form>
    </div>
  );
}
