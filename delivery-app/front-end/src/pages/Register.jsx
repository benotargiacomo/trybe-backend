import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import USER from '../components/helper';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);
  const [buttonOn, setButtonOn] = useState(true);
  const [messageError, setMessageError] = useState('');

  const history = useHistory();

  const handleClick = async () => {
    try {
      const create = {
        name, email, password, role: 'customer',
      };
      const login = {
        email, password,
      };
      await axios.post('http://localhost:3001/user', create);

      setHasError(false);

      const assingAccount = await axios.post('http://localhost:3001/user/login', login);

      localStorage.setItem(USER, JSON.stringify(assingAccount.data));
      history.push('/customer/products');
    } catch (error) {
      console.log(error.response.data.error);
      setHasError(true);
      setMessageError(error.response.data.error);
    }
  };

  const buttonActivate = useCallback(() => {
    const nameLength = 11;
    const passwordLength = 5;
    const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (validEmail.test(email)
    && password.length > passwordLength
    && name.length > nameLength) {
      setButtonOn(false);
    } else {
      setButtonOn(true);
    }
  }, [email, name.length, password.length]);

  useEffect(() => {
    buttonActivate();
  }, [buttonActivate]);

  return (
    <form>
      <h1>TryBeer</h1>
      <label htmlFor="nome">
        nome
        <input
          value={ name }
          data-testid="common_register__input-name"
          type="text"
          onChange={ ({ target }) => setName(target.value) }
          placeholder="Seu nome"
        />
      </label>
      <label htmlFor="email">
        email
        <input
          value={ email }
          data-testid="common_register__input-email"
          type="email"
          onChange={ ({ target }) => setEmail(target.value) }
          placeholder="seuEmail@site.com.br"
        />
      </label>
      <label htmlFor="senha">
        senha
        <input
          value={ password }
          data-testid="common_register__input-password"
          type="password"
          onChange={ ({ target }) => setPassword(target.value) }
          placeholder="**********"
        />
      </label>
      <button
        disabled={ buttonOn }
        data-testid="common_register__button-register"
        type="button"
        onClick={ handleClick }
      >
        CADASTRAR
      </button>
      { hasError
        ? (
          <h3 data-testid="common_register__element-invalid_register">
            { messageError }
          </h3>
        ) : null }
      <Link to="/login">
        <button type="button">voltar</button>
      </Link>
    </form>
  );
}
