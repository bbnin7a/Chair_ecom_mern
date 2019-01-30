import axios from 'axios';

import { USER_SERVER, PRODUCT_SERVER } from '../components/utils/misc';
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART_USER,
  GET_CART_ITEMS_USER,
  REMOVE_CART_ITEM_USER,
  DECREASE_CART_ITEM_USER
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
export const addToCart = prodId => {
  const request = axios
    .post(`${USER_SERVER}/addToCart?productId=${prodId}`)
    .then(res => res.data);

  return {
    type: ADD_TO_CART_USER,
    payload: request
  };
};

/**
 * Get the cart items detail from server
 * need the get productss by id route
 * sample: /api/product/product_by_id?id=89jfkl,jkl81&type=array
 * @param cartItems list of 'product id' in current cart to for query
 * @param userCart the current cart [id{string}, quantity{number}, date{number}]
 */
export const getCartItems = (cartItems, userCart) => {
  const request = axios
    .get(`${PRODUCT_SERVER}/product_by_id?id=${cartItems}&type=array`)
    .then(res => {
      // inject the quantity field to fetched result (the cartDetail)
      userCart.forEach(item => {
        res.data.forEach((prod, i) => {
          if (item.id === prod._id) {
            res.data[i].quantity = item.quantity;
          }
        });
      });

      return res.data;
    });

  return {
    type: GET_CART_ITEMS_USER,
    payload: request
  };
};

/**
 * Remove the cart item from server
 * sample:  /api/user/removeFromCart?productid=jkl18ujio1
 * @param prodId product id
 */
export const removeCartItem = prodId => {
  const request = axios
    .get(`${USER_SERVER}/removeFromCart?productId=${prodId}`)
    .then(res => {
      // inject the quantity field to the cartDetail
      res.data.cart.forEach(item => {
        res.data.cartDetail.forEach((prod, i) => {
          if (item.id === prod._id) {
            res.data.cartDetail[i].quantity = item.quantity;
          }
        });
      });
      return res.data;
    });

  return {
    type: REMOVE_CART_ITEM_USER,
    payload: request
  };
};

/**
 * Decrease the product by 1 to the cart (POST)
 * sample: /api/users/cartItemQtyDecrease?productId=qwe8123984uklj
 * @param prodId product id
 */
export const decreaseCartItem = prodId => {
  const request = axios
    .post(`${USER_SERVER}/cartItemQtyDecrease?productId=${prodId}`)
    .then(res => {
      // inject the quantity field to the cartDetail
      res.data.cart.forEach(item => {
        res.data.cartDetail.forEach((prod, i) => {
          if (item.id === prod._id) {
            res.data.cartDetail[i].quantity = item.quantity;
          }
        });
      });
      return res.data;
    });

  return {
    type: DECREASE_CART_ITEM_USER,
    payload: request
  };
};
