import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ApplicationContext from '../context/applicationContext';

const PATCH_URL = 'http://localhost:3001/sale';

const DELIVERY = {
  pendente: 'Pendente',
  preparando: 'Preparando',
  transito: 'Em Trânsito',
  entregue: 'Entregue',
};

const parseDate = (dataString) => new Date(dataString)
  .toLocaleDateString(
    'pt-BR',
    {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    },
  );

export default function OrderHead({ order }) {
  const { id, sale_date: saleDate, status, seller } = order;

  const [deliveryStatus, setDeliveryStatus] = useState(status);
  const { setReload } = useContext(ApplicationContext);

  const handleStatus = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const headers = { headers: { authorization: token } };

    const body = { id, status: 'Entregue' };

    try {
      const { status: newStatus } = await axios.patch(PATCH_URL, body, headers);

      setDeliveryStatus(newStatus);
      setReload(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeliveryStatus = () => {
    if (status === DELIVERY.pendente
      || status === DELIVERY.preparando
      || status === DELIVERY.entregue
    ) return true;

    return false;
  };

  return (
    <section>
      <span
        data-testid="customer_order_details__element-order-details-label-order-id"
      >
        {`PEDIDO ${id};`}
      </span>
      <span
        data-testid="customer_order_details__element-order-details-label-seller-name"
      >
        {seller.name}
      </span>
      <span
        data-testid="customer_order_details__element-order-details-label-order-date"
      >
        { parseDate(saleDate) }
      </span>
      <span
        data-testid="customer_order_details__element-order-details-label-delivery-status"
      >
        { deliveryStatus }
      </span>
      <button
        type="button"
        data-testid="customer_order_details__button-delivery-check"
        onClick={ handleStatus }
        disabled={ handleDeliveryStatus() }
      >
        MARCAR COMO ENTREGUE
      </button>
    </section>
  );
}

OrderHead.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    seller: PropTypes.shape({
      name: PropTypes.string,
    }),
    sale_date: PropTypes.string,
    status: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};
