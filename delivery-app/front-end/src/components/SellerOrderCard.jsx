import React, { useCallback, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import ApplicationContext from '../context/applicationContext';

export default function SellerOrderCard() {
  const { orders, setOrders, setLoading } = useContext(ApplicationContext);
  const history = useHistory();

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

  function newData(actualDate) {
    const dataAtual = new Date(actualDate);

    const dataFormatada = dataAtual.toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      },
    );
    return dataFormatada;
  }

  return (
    <div>
      { orders.map((ord) => (
        <button
          key={ ord.id }
          type="button"
          onClick={ () => history.push(`/seller/orders/${ord.id}`) }
        >
          <div>
            <h3
              data-testid={
                `seller_orders__element-order-id-${ord.id}`
              }
            >
              {ord.id}
            </h3>
          </div>
          <div>
            <h3
              data-testid={ `seller_orders__element-delivery-status-${ord.id}` }
            >
              {ord.status}
            </h3>
          </div>
          <div>
            <section>
              <p
                data-testid={
                  `seller_orders__element-order-date-${ord.id}`
                }
              >
                { newData(ord.sale_date) }
              </p>
              <p
                data-testid={ `seller_orders__element-card-price-${ord.id}` }
              >
                { ord.total_price.toString().replace('.', ',') }
              </p>
              <p
                data-testid={ `seller_orders__element-card-address-${ord.id}` }
              >
                { `${ord.delivery_address}, ${ord.delivery_number}` }
              </p>
            </section>
          </div>
        </button>
      )) }
    </div>
  );
}
