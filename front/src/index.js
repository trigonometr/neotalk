import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import { initStore } from './store';
import './index.css';

ReactDOM.render(
  <Router>
    <Provider store={initStore()}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root'),
);
