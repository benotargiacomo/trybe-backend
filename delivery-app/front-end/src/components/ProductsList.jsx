import React, { useContext } from 'react';

import ApplicationContext from '../context/applicationContext';

import ProductCard from './ProductCard';

export default function ProductsList() {
  const { products } = useContext(ApplicationContext);
  return (
    <main style={ { display: 'flex', flexWrap: 'wrap', gap: '1rem' } }>
      { products.map((product) => (
        <ProductCard
          key={ product.name }
          product={ product }
        />
      )) }
    </main>
  );
}
