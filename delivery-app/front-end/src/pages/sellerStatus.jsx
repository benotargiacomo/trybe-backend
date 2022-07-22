import React from 'react';
import PropTypes from 'prop-types';
import SellerNavbar from '../components/NavbarSeller';

import Loading from '../components/Loading';
import SellerOrderHead from '../components/SellerOrderHead';
import SellerOrderTable from '../components/SellerOrderTable';
import SellerUseOrder from '../hooks/useOrder';

export default function sellerOrder({ match }) {
  const { id } = match.params;

  const { order, status, error } = SellerUseOrder(id);

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'error') {
    return <span>{ error }</span>;
  }

  if (status === 'success') {
    return (
      <>
        <SellerNavbar />
        <main>
          <section>
            <span>Detalhe do Pedido</span>
            <SellerOrderHead order={ order } />
            <SellerOrderTable products={ order.products } />
          </section>
        </main>
      </>
    );
  }

  return null;
}

sellerOrder.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
