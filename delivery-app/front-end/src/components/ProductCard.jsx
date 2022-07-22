import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
// import axios from 'axios';

import { ACTION } from '../context/provider/checkoutProvider';
import CheckoutContext from '../context/checkoutContext';

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(0);
  const { dispatch } = useContext(CheckoutContext);

  const { id, name: productName, price, url_image: thumbnail } = product;

  const handleChange = ({ target: { value } }) => {
    setQuantity(value);

    const payload = {
      product: { id, name: productName, price },
      quantity: Number(value),
    };

    dispatch({ type: ACTION.CHANGE, payload });
  };

  const handlePlus = () => {
    setQuantity((previousValue) => Number(previousValue) + 1);

    const payload = { product: { id, name: productName, price }, quantity: 1 };

    dispatch({ type: ACTION.ADD, payload });
  };

  const handleMinus = () => {
    // -------------------------------------
    // Cria regra para não ficar menor que 0;
    // -------------------------------------
    setQuantity((previousValue) => Number(previousValue) - 1);

    const payload = { product: { id, name: productName, price }, quantity: 1 };

    dispatch({ type: ACTION.REMOVE, payload });
  };

  return (
    <section
      style={ {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '18rem',
        height: '22rem',
        border: '1px solid',
      } }
    >
      <div>
        <div>
          <span
            data-testid={ `customer_products__element-card-price-${id}` }
          >
            { price.toString().replace('.', ',') }
          </span>
          <img
            data-testid={ `customer_products__img-card-bg-image-${id}` }
            src={ thumbnail }
            alt={ productName }
            height="250"
            width="250"
          />
        </div>
        <div>
          <span
            data-testid={ `customer_products__element-card-title-${id}` }
          >
            { productName }
          </span>
        </div>
        <div>
          <button
            type="button"
            data-testid={ `customer_products__button-card-rm-item-${id}` }
            onClick={ quantity > 0 ? handleMinus : null }
          >
            -
          </button>
          <input
            type="text"
            value={ quantity }
            data-testid={ `customer_products__input-card-quantity-${id}` }
            onChange={ handleChange }
          />
          <button
            type="button"
            data-testid={ `customer_products__button-card-add-item-${id}` }
            onClick={ handlePlus }
          >
            +
          </button>
        </div>
      </div>
    </section>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    url_image: PropTypes.string.isRequired,
  }).isRequired,
};
