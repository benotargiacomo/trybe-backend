import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Order from './pages/Order';
import Admin from './pages/Admin';
import OrderDetail from './pages/OrderDetail';
import Checkout from './pages/Checkout';
import SellerOrder from './pages/SellerOrder';
import sellerStatus from './pages/sellerStatus';

function App() {
  return (
    <Switch>
      <Route exact path="/products" component={ Products } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/admin/manage" component={ Admin } />
      <Route exact path="/seller/orders" component={ SellerOrder } />
      <Route exact path="/seller/orders/:id" component={ sellerStatus } />
      <Route exact path="/customer/checkout" component={ Checkout } />
      <Route exact path="/customer/products" component={ Products } />
      <Route exact path="/customer/orders/:id" component={ OrderDetail } />
      <Route exact path="/customer/orders" component={ Order } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
