import React, { useState, useReducer } from 'react';
import PropTypes from 'prop-types';

import CheckoutContext from '../checkoutContext';

export const ACTION = {
  ADD: 'add',
  REMOVE: 'remove',
  CHANGE: 'change',
  DELETE: 'delete',
  RESET: 'reset',
};

function actionAdd(cart, payload) {
  return cart.some((item) => item.product.id === payload.product.id)
    ? cart.map((item) => {
      if (item.product.id === payload.product.id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    })
    : [...cart, payload];
}

function actionRemove(cart, payload) {
  const res = cart.some((item) => item.product.id === payload.product.id)
    ? cart.map((item) => {
      if (item.product.id === payload.product.id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    })
    : [...cart, payload];
  return res.filter((item) => item.quantity !== 0);
}

const setCheckout = (cart, { type, payload }) => {
  switch (type) {
  case ACTION.ADD:
    return actionAdd(cart, payload);
  case ACTION.REMOVE:
    return actionRemove(cart, payload);
  case ACTION.CHANGE:
    return cart.some((item) => item.product.id === payload.product.id)
      ? cart.map((item) => {
        if (item.product.id === payload.product.id) {
          return { ...item, quantity: payload.quantity };
        }
        return item;
      })
      : [...cart, payload];
  case ACTION.DELETE:
    return cart.filter((item) => item.product.id !== payload.id);
  case ACTION.RESET:
    return [];
  default:
    return cart;
  }
};

function CheckoutProvider({ children }) {
  const [totalAmount, setTotalAmount] = useState(0);
  const [checkout, dispatch] = useReducer(setCheckout, []);

  const values = {
    totalAmount,
    setTotalAmount,
    checkout,
    dispatch,
  };

  return (
    <CheckoutContext.Provider value={ values }>
      {children}
    </CheckoutContext.Provider>
  );
}

CheckoutProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CheckoutProvider;
