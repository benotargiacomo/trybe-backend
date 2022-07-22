import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './App';

import ApplicationProvider from './context/provider/applicationProvider';
import CheckoutProvider from './context/provider/checkoutProvider'
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <CheckoutProvider>
    <ApplicationProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </ApplicationProvider>
    </CheckoutProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
