import React from 'react';
import PropTypes from 'prop-types';

const tableHead = [
  'Item',
  'Descrição',
  'Quantidade',
  'Valor Unitário',
  'Sub-total',
];

export default function SellerOrderTable({ products }) {
  const total = products
    .reduce((acc, crr) => acc + crr.product.price * crr.quantity, 0)
    .toFixed(2);

  return (
    <table>
      <thead>
        <tr>
          { tableHead.map((title) => (<th key={ title }>{ title }</th>))}
        </tr>
      </thead>
      <tbody>
        { products.map(({ product, quantity }, index) => (
          <tr key={ product.name }>
            <th
              data-testid={
                `seller_order_details__element-order-table-item-number-${index}`
              }
            >
              { index + 1 }
            </th>
            <th
              data-testid={ `seller_order_details__element-order-table-name-${index}` }
            >
              { product.name }
            </th>
            <th
              data-testid={
                `seller_order_details__element-order-table-quantity-${index}`
              }
            >
              { quantity }
            </th>
            <th
              data-testid={
                `seller_order_details__element-order-table-unit-price-${index}`
              }
            >
              { product.price.toString().replace('.', ',') }
            </th>
            <th
              data-testid={
                `seller_order_details__element-order-table-sub-total-${index}`
              }
            >
              { (product.price * quantity).toFixed(2).replace('.', ',') }
            </th>
          </tr>
        ))}
        <tr>
          <th
            data-testid="seller_order_details__element-order-total-price"
          >
            { total.toString().replace('.', ',') }
          </th>
        </tr>
      </tbody>
    </table>
  );
}

SellerOrderTable.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    product: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    }),
  })).isRequired,
};
