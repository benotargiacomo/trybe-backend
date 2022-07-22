import axios from 'axios';
import React, { useCallback, useEffect, useContext } from 'react';
import Loading from '../components/Loading';
import Navbar from '../components/NavbarAdmin';
import AdminUsers from '../components/AdminUsers';
import AdminCreate from '../components/AdminCreate';
import ApplicationContext from '../context/applicationContext';

export default function Admin() {
  const {
    setUsers, loadind, setLoading, setReload, reload,
  } = useContext(ApplicationContext);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const result = await axios.get('http://localhost:3001/user/users');
      console.log('allUsers', result);
      setReload(false);
      setUsers(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setUsers, setReload]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders, reload]);

  return (
    <section>
      <Navbar />
      <AdminCreate />
      {
        loadind
          ? <Loading />
          : <AdminUsers />
      }
    </section>
  );
}
