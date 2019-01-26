import axios from 'axios';

import { USER_SERVER } from '../components/utils/misc';
import { LOGIN_USER } from './types'

/**
 * Action - Handle user login
 * @param {Object} dataToSubmit
 */
export const loginUser = (dataToSubmit) => {
  const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
    .then(res => res.data)

  return {
    type: LOGIN_USER,
    payload: request
  }
}