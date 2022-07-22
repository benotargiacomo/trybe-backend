import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import ApplicationContext from '../context/applicationContext';

export default function AdminCreate() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('selecione a opção');
  const [hasError, setHasError] = useState(false);
  const [buttonOn, setButtonOn] = useState(true);
  const [messageError, setMessageError] = useState('');
  const { setReload } = useContext(ApplicationContext);

  const handleClick = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const headers = { headers: { authorization: token } };

    try {
      const create = {
        name, email, password, role,
      };

      await axios.post('http://localhost:3001/user', create, headers);
      setReload(true);
      setHasError(false);
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
    function roleValid() {
      if (role === 'seller' || role === 'customer') return true;
    }

    if (validEmail.test(email)
    && password.length > passwordLength
    && name.length > nameLength
    && roleValid()) {
      setButtonOn(false);
    } else {
      setButtonOn(true);
    }
  }, [email, name.length, password.length, role]);

  useEffect(() => {
    buttonActivate();
  }, [buttonActivate]);

  return (
    <form>
      <h1>Cadastrar novo usuário</h1>
      <label htmlFor="nome">
        Nome
        <input
          value={ name }
          data-testid="admin_manage__input-name"
          type="text"
          onChange={ ({ target }) => setName(target.value) }
          placeholder="Nome e sobrenome"
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          value={ email }
          data-testid="admin_manage__input-email"
          type="email"
          onChange={ ({ target }) => setEmail(target.value) }
          placeholder="seu-email@site.com.br"
        />
      </label>
      <label htmlFor="senha">
        Senha
        <input
          value={ password }
          data-testid="admin_manage__input-password"
          type="password"
          onChange={ ({ target }) => setPassword(target.value) }
          placeholder="**********"
        />
      </label>
      <label htmlFor="role">
        Tipo
        <select
          name="role"
          value={ role }
          data-testid="admin_manage__select-role"
          onChange={ ({ target }) => setRole(target.value) }
        >
          <option>Escolha</option>
          <option value="seller">Vendedor</option>
          <option value="customer">Cliente</option>
        </select>
      </label>
      <button
        disabled={ buttonOn }
        data-testid="admin_manage__button-register"
        type="button"
        onClick={ handleClick }
      >
        CADASTRAR
      </button>
      { hasError
        ? (
          <h3 data-testid="admin_manage__element-invalid-register">
            { messageError }
          </h3>
        ) : null }
    </form>
  );
}
