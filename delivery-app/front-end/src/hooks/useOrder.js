import { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import ApplicationContext from '../context/applicationContext';

export default function useOrder(id) {
  const [order, setOrder] = useState({});
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const {
    setReload, reload,
  } = useContext(ApplicationContext);

  const getSale = useCallback(() => {
    (async () => {
      const { token } = JSON.parse(localStorage.getItem('user'));
      const headers = { headers: { authorization: token } };

      try {
        setStatus('loading');

        const result = await axios.get(`http://localhost:3001/sale/${id}`, headers);

        setOrder(result.data);
        setError('');
        setStatus('success');
        setReload(false);
      } catch (err) {
        setError(err.message);
        setStatus('error');
      } finally {
        setStatus('success');
      }
    })();
  }, [id, setReload]);

  useEffect(() => {
    getSale();
  }, [getSale, reload]);

  return { order, status, error };
}
