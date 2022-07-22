import axios from 'axios';
import React, { useCallback, useEffect, useContext } from 'react';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import OrdersList from '../components/OrdersList';
import ApplicationContext from '../context/applicationContext';

export default function Order() {
  const { setOrders, loadind, setLoading } = useContext(ApplicationContext);

  const fetchOrders = useCallback(async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));

    try {
      setLoading(true);

      const result = await axios.get('http://localhost:3001/sale', {
        headers: { authorization: token },
      });
      console.log(result);
      setOrders(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setOrders]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <section>
      <Navbar />
      {loadind ? <Loading /> : <OrdersList />}
    </section>
  );
}
