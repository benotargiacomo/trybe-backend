import React from 'react';

import CheckoutAddress from '../components/CheckoutAddress';
import CheckoutOrder from '../components/CheckoutOrder';
import Navbar from '../components/Navbar';

export default function Checkout() {
  return (
    <>
      <Navbar />
      <main>
        <section>
          <span>FINALIZAR PEDIDO</span>
          <CheckoutOrder />
        </section>
        <section>
          <span>Detalhes e Endereço para entrega</span>
          <CheckoutAddress />
        </section>
      </main>
    </>
  );
}
