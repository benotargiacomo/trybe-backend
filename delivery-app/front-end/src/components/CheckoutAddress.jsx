import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import CheckoutContext from '../context/checkoutContext';

export default function CheckoutAddress() {
  const [loadingSellers, setLoadingSellers] = useState(false);
  const [sellers, setSellers] = useState([]);
  const [sellerId, setSellerId] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const { checkout, totalAmount } = useContext(CheckoutContext);
  const history = useHistory();

  const fetchSellers = useCallback(async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));

    try {
      setLoadingSellers(true);

      const result = await axios.get('http://localhost:3001/user?role=seller', {
        headers: { authorization: token },
      });
      console.log('sellers', result.data);
      setSellers(result.data);
      setSellerId(result.data[0].id);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingSellers(false);
    }
  }, [setLoadingSellers]);

  useEffect(() => {
    fetchSellers();
  }, [fetchSellers]);

  const postOrder = async (order) => {
    const { token } = JSON.parse(localStorage.getItem('user'));

    const headers = { headers: { authorization: token } };
    console.log('token', token);
    try {
      const result = await axios
        .post('http://localhost:3001/sale', order, headers);
      return result.data.id;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitOrder = () => {
    const { id: userId } = JSON.parse(localStorage.getItem('user'));

    const products = checkout
      .map((item) => ({ productId: item.product.id, quantity: item.quantity }));

    const order = {
      totalPrice: totalAmount,
      userId,
      sellerId,
      deliveryAddress,
      deliveryNumber,
      status: 'Pendente',
      products,
    };

    postOrder(order)
      .then((id) => history.push(`/customer/orders/${id}`));
  };

  return (
    <form>
      <label htmlFor="sellers">
        <select
          name="sellers"
          id="sellers"
          value={ sellerId }
          data-testid="customer_checkout__select-seller"
          onChange={ ({ target }) => setSellerId(target.value) }
        >
          { loadingSellers
            ? (<option value="Loading">Loading...</option>)
            : sellers.map(({ name, id }) => (
              <option value={ id } key={ id }>{ name }</option>
            ))}
        </select>
      </label>
      <label htmlFor="address">
        Endereço
        <input
          type="text"
          value={ deliveryAddress }
          onChange={ ({ target }) => setDeliveryAddress(target.value) }
          data-testid="customer_checkout__input-address"
        />
      </label>
      <label htmlFor="number">
        Número
        <input
          type="text"
          value={ deliveryNumber }
          onChange={ ({ target }) => setDeliveryNumber(target.value) }
          data-testid="customer_checkout__input-addressNumber"
        />
      </label>
      <button
        type="button"
        onClick={ handleSubmitOrder }
        data-testid="customer_checkout__button-submit-order"
      >
        FINALIZAR PEDIDO
      </button>
    </form>
  );
}
