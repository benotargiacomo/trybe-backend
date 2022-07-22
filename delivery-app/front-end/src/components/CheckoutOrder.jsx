import React, { useContext, useCallback, useEffect } from 'react';
import { ACTION } from '../context/provider/checkoutProvider';

import CheckoutContext from '../context/checkoutContext';

const tableHead = [
  'Item',
  'Descrição',
  'Quantidade',
  'Valor Unitário',
  'Sub-total',
  'Remover item',
];

export default function CheckoutOrder() {
  const { checkout, dispatch, totalAmount, setTotalAmount } = useContext(CheckoutContext);

  const updateCart = useCallback(() => {
    const total = checkout.reduce((acc, crr) => acc + crr.product.price * crr.quantity, 0)
      .toFixed(2);

    setTotalAmount(total);
  }, [checkout, setTotalAmount]);

  useEffect(() => {
    updateCart();
  }, [updateCart]);

  const handleRemove = (id) => {
    dispatch({ type: ACTION.DELETE, payload: { id } });
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            { tableHead.map((title) => (<th key={ title }>{ title }</th>))}
          </tr>
        </thead>
        <tbody>
          { checkout.map(({ product, quantity }, index) => (
            <tr key={ product.id }>
              <th
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                { index + 1 }
              </th>
              <th
                data-testid={ `customer_checkout__element-order-table-name-${index}` }
              >
                { product.name }
              </th>
              <th
                data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
              >
                { quantity }
              </th>
              <th
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                { product.price.toString().replace('.', ',') }
              </th>
              <th
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                { checkout && (product.price * quantity).toFixed(2).replace('.', ',') }
              </th>
              <th>
                <button
                  type="button"
                  data-testid={ `customer_checkout__element-order-table-remove-${index}` }
                  onClick={ () => handleRemove(product.id) }
                >
                  REMOVER
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <span
        data-testid="customer_checkout__element-order-total-price"
      >
        { totalAmount.toString().replace('.', ',') }
      </span>
    </>
  );
}
