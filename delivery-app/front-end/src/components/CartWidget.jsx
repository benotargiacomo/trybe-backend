import React, { useCallback, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import CheckoutContext from '../context/checkoutContext';

export default function CartWidget() {
  const { checkout, totalAmount, setTotalAmount } = useContext(CheckoutContext);
  const history = useHistory();

  const isDisable = () => {
    if (totalAmount === '0.00') { return true; }
    return false;
  };

  const updateCart = useCallback(() => {
    const total = checkout.reduce((acc, crr) => acc + crr.product.price * crr.quantity, 0)
      .toFixed(2);

    setTotalAmount(total);
  }, [checkout, setTotalAmount]);

  useEffect(() => {
    updateCart();
  }, [updateCart]);

  const handleClick = () => {
    history.push('/customer/checkout');
  };

  return (
    <div>
      <button
        data-testid="customer_products__button-cart"
        disabled={ isDisable() }
        style={ {
          position: 'absolute',
          bottom: '1rem',
          minHeight: '2.5rem',
          right: '1rem',
        } }
        type="button"
        onClick={ handleClick }
      >
        <span data-testid="customer_products__checkout-bottom-value">
          { totalAmount.toString().replace('.', ',') }
        </span>

      </button>
    </div>
  );
}
