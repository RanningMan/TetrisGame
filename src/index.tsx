import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import { rootReducer } from './redux/reducers/rootReducer';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
