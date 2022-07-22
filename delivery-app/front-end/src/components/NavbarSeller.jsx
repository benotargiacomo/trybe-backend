import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import USER from './helper';

export default function NavbarSeller() {
  const [username, setUsername] = useState('');
  const history = useHistory();
  const { pathname } = history.location;

  const handleClick = () => {
    if (pathname === '/seller/orders') {
      window.location.reload();
    }
    history.push('/seller/orders');
  };

  const handleLogout = () => {
    localStorage.removeItem(USER);

    history.push('/login');
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem(USER));

    if (user && user.token) {
      setUsername(user.name);
    } else {
      history.push('/login');
    }
  }, [history]);

  return (
    <nav>
      <ul style={ { display: 'flex', listStyle: 'none' } }>
        <li>
          <button
            type="button"
            name="orders"
            data-testid="customer_products__element-navbar-link-orders"
            onClick={ handleClick }
          >
            PEDIDOS
          </button>
        </li>
        <li data-testid="customer_products__element-navbar-user-full-name">
          { username }
        </li>
        <li>
          <button
            type="button"
            name="logout"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ handleLogout }
          >
            Sair
          </button>
        </li>
      </ul>
    </nav>
  );
}
