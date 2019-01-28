import axios from 'axios';

import { PRODUCT_SERVER } from '../components/utils/misc';
import { 
  GET_PRODUCT_BY_SELL,
  GET_PRODUCT_BY_ARRIVAL,
  GET_BRANDS,
  GET_TYPES
 } from './types';


/////////////////////////////////////////
//////        PRODUCTS
/////////////////////////////////////////

/**
 * Action - 
 * Get all products by 'arrival' to filter newly arrival products
 * query sample: /api/product/products?sortBy=createdAt&order=desc&limit=100
 */
export const getProductsByArrival = () => {
  const request = axios
    .get(`${PRODUCT_SERVER}/products?sortBy=createdAt&order=desc&limit=4`)
    .then(res => res.data);

  return {
    type: GET_PRODUCT_BY_ARRIVAL,
    payload: request
  };
};

/**
 * Action - 
 * Get all products by 'sell' to filter the top selling products
 * query sample: /api/product/products?sortBy=sold&order=desc&limit=100
 */
export const getProductsBySell = () => {
  const request = axios
    .get(`${PRODUCT_SERVER}/products?sortBy=sold&order=desc&limit=4`)
    .then(res => res.data);

  return {
    type: GET_PRODUCT_BY_SELL,
    payload: request
  };
};


/////////////////////////////////////////
//////        CATEGORIES
/////////////////////////////////////////

export const getBrands = () => {
  const request = axios
    .get(`${PRODUCT_SERVER}/brands`)
    .then(res => res.data);

  return {
    type: GET_BRANDS,
    payload: request
  };
}

export const getTypes = () => {
  const request = axios
    .get(`${PRODUCT_SERVER}/types`)
    .then(res => res.data);

  return {
    type: GET_TYPES,
    payload: request
  };
}
