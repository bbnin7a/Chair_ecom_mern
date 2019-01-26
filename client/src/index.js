import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

/** STYLING */
import 'normalize.css/normalize.css';
import './styles/styles.scss';

/** REDUX */
import { Provider } from 'react-redux';
import configureStore from './store/configureStore'

// Instantiate the store
const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root')
);
