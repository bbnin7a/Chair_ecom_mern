import axios from 'axios';

import { USER_SERVER } from '../components/utils/misc';
import { LOGIN_USER, REGISTER_USER } from './types';

/**
 * Action - Login User
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
 * Action - Register a User
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
