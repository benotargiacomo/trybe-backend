import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function OrderCard({ order }) {
  const { id, total_price: totalPrice, status, sale_date: data } = order;
  const history = useHistory();

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
    <button
      type="button"
      onClick={ () => history.push(`/customer/orders/${id}`) }
    >
      <div>
        <h3 data-testid={ `customer_orders__element-order-id-${id}` }>{id}</h3>
      </div>
      <div>
        <h3
          data-testid={ `customer_orders__element-delivery-status-${id}` }
        >
          {status}
        </h3>
      </div>
      <div>
        <section>
          <p
            data-testid={
              `customer_orders__element-order-date-${id}`
            }
          >
            { newData(data) }
          </p>
          <p
            data-testid={ `customer_orders__element-card-price-${id}` }
          >
            { totalPrice.toString().replace('.', ',') }

          </p>
        </section>
      </div>
    </button>
  );
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    total_price: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    sale_date: PropTypes.string.isRequired,
  }).isRequired,
};
