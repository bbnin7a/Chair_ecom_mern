import axios from 'axios';

import { USER_SERVER } from '../components/utils/misc';
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART_USER
} from './types';

/**
 * Login User
 * @param {Object} dataToSubmit
 */
export const loginUser = dataToSubmit => {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then(res => res.data);

  return {
    type: LOGIN_USER,
    payload: request
  };
};

/**
 * Register a User
 * @param {Object} dataToSubmit
 */
export const registerUser = dataToSubmit => {
  const request = axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .then(res => res.data);

  return {
    type: REGISTER_USER,
    payload: request
  };
};

/**
 * Authicate a User
 */
export const authUser = () => {
  const request = axios.get(`${USER_SERVER}/auth`).then(res => res.data);

  return {
    type: AUTH_USER,
    payload: request
  };
};

/**
 * Logout User
 */
export const logoutUser = () => {
  const request = axios.get(`${USER_SERVER}/logout`).then(res => res.data);

  return {
    type: LOGOUT_USER,
    payload: request
  };
};

/**
 * Add product to cart
 * @param {string} prodId the product id
 */
export const addToCart = (prodId) => {
  const request = axios.post(`${USER_SERVER}/addToCart?productId=${prodId}`).then(res => res.data);


  return {
    type: ADD_TO_CART_USER,
    payload: request
  };
};
