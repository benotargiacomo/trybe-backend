import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ApplicationContext from '../applicationContext';

function ApplicationProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState([]);

  const values = {
    loading,
    setLoading,
    products,
    setProducts,
    orders,
    setOrders,
    user,
    setUser,
    users,
    setUsers,
    reload,
    setReload,
  };

  return (
    <ApplicationContext.Provider value={ values }>
      {children}
    </ApplicationContext.Provider>
  );
}

ApplicationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ApplicationProvider;
