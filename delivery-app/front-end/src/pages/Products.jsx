import React, { useEffect, useContext, useCallback } from 'react';
import axios from 'axios';

import ApplicationContext from '../context/applicationContext';

import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import ProductList from '../components/ProductsList';
import CartWidget from '../components/CartWidget';

export default function Products() {
  const { setProducts, loading, setLoading } = useContext(ApplicationContext);

  const fetchProducts = useCallback(async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));

    try {
      setLoading(true);

      const result = await axios.get('http://localhost:3001/product', {
        headers: { authorization: token },
      });

      setProducts(result.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <Navbar />
      { loading ? <Loading /> : <ProductList /> }
      <CartWidget />
    </>
  );
}
