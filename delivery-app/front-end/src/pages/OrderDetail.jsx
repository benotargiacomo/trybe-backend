import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';

import Loading from '../components/Loading';
import OrderTable from '../components/OrderTable';
import OrderHead from '../components/OrderHead';
import useOrder from '../hooks/useOrder';

export default function OrderDetail({ match }) {
  const { id } = match.params;

  const { order, status, error } = useOrder(id);

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'error') {
    return <span>{ error }</span>;
  }

  if (status === 'success') {
    return (
      <>
        <Navbar />
        <main>
          <section>
            <span>Detalhe do Pedido</span>
            {console.log(order)}
            <OrderHead order={ order } />
            <OrderTable products={ order.products } />
          </section>
        </main>
      </>
    );
  }

  return null;
}

OrderDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
