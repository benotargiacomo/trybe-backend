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

export default function SellerOrderHead({ order }) {
  const { id, sale_date: saleDate, status } = order;

  const [deliveryStatus, setDeliveryStatus] = useState(status);
  const { setReload } = useContext(ApplicationContext);

  const handlePrepareStatus = () => {
    if (status === DELIVERY.preparando
      || status === DELIVERY.transito
      || status === DELIVERY.entregue
    ) return true;

    return false;
  };

  const handleDeliveryStatus = () => {
    if (status === DELIVERY.pendente
      || status === DELIVERY.transito
      || status === DELIVERY.entregue
    ) return true;

    return false;
  };

  const handlePrepare = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const headers = { headers: { authorization: token } };

    const body = { id, status: 'Preparando' };

    try {
      const { status: newStatus } = await axios.patch(PATCH_URL, body, headers);

      setDeliveryStatus(newStatus);
      setReload(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelivery = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const headers = { headers: { authorization: token } };

    const body = { id, status: DELIVERY.transito };

    try {
      const { status: newStatus } = await axios.patch(PATCH_URL, body, headers);

      setDeliveryStatus(newStatus);
      setReload(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <span
        data-testid="seller_order_details__element-order-details-label-order-id"
      >
        {`PEDIDO ${id};`}
      </span>
      <span
        data-testid="seller_order_details__element-order-details-label-order-date"
      >
        { parseDate(saleDate) }
      </span>
      <span
        data-testid="seller_order_details__element-order-details-label-delivery-status"
      >
        { deliveryStatus }
      </span>
      <button
        type="button"
        data-testid="seller_order_details__button-preparing-check"
        onClick={ handlePrepare }
        disabled={ handlePrepareStatus() }
      >
        PREPARAR PEDIDO
      </button>
      <button
        type="button"
        data-testid="seller_order_details__button-dispatch-check"
        onClick={ handleDelivery }
        disabled={ handleDeliveryStatus() }
      >
        SAIU PARA ENTREGA
      </button>
    </section>
  );
}

SellerOrderHead.propTypes = {
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
