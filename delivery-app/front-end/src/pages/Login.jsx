import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LoginForm from '../components/loginForm';

export default function Login() {
  const history = useHistory();

  useEffect(() => {
    const hasUser = JSON.parse(localStorage.getItem('user'));

    if (hasUser && hasUser.role === 'customer') {
      history.push('/customer/products');
    }
    if (hasUser && hasUser.role === 'seller') {
      history.push('/seller/orders');
    }
    if (hasUser && hasUser.role === 'administrator') {
      history.push('/admin/manage');
    }
  }, [history]);
  return (
    <div>
      <h1>TryBeer</h1>
      <LoginForm />
    </div>
  );
}
