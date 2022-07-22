import React, { useContext } from 'react';

import ApplicationContext from '../context/applicationContext';

import OrderCard from './OrderCard';

export default function OrdersList() {
  const { orders } = useContext(ApplicationContext);
  return (
    <main>
      {orders.map((order) => (
        <OrderCard key={ order.id } order={ order } />
      ))}
    </main>
  );
}
