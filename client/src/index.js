import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

/** STYLING */
import 'normalize.css/normalize.css';
import './styles/styles.scss';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import Reducer from './reducers';

const createStoreWithMiddle = applyMiddleware(promiseMiddleware, ReduxThunk)(
  createStore
);

ReactDOM.render(
  <Provider store={createStoreWithMiddle}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root')
);
