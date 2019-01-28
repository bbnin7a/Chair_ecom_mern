import axios from 'axios';

import { PRODUCT_SERVER } from '../components/utils/misc';
import {
  GET_PRODUCT_BY_SELL,
  GET_PRODUCT_BY_ARRIVAL,
  GET_BRANDS,
  GET_TYPES,
  GET_PRODUCTS_TO_SHOP
} from './types';

/////////////////////////////////////////
//////        PRODUCTS
/////////////////////////////////////////

/**
 * Fetch all products by 'arrival' to filter newly arrival products
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
 * Fetch all products by 'sell' to filter the top selling products
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

/**
 * Fetch all products with criteria
 * Products will be listed in shop
 * @param {number} skip
 * @param {nubmer} limit 
 * @param {Object} filters { brand: [string], footStep: [string], price: [number, number]}
 * @param {Array} previousState the current state of products list 
 */
export const getProductsToShop = (
  skip,
  limit,
  filters = {},
  previousState = []
) => {
  const data = { limit, skip, filters };

  const request = axios.post(`${PRODUCT_SERVER}/shop`, data).then(res => {

    // Merge current state of product(if have) list 
    // with new fetched products
    let accumulatedProducts =[
      ...previousState,
      ...res.data.products
    ]

    return {
      size: res.data.size,
      products: accumulatedProducts
    };
  });

  return {
    type: GET_PRODUCTS_TO_SHOP,
    payload: request
  };
};

/////////////////////////////////////////
//////        CATEGORIES
/////////////////////////////////////////

/**
 * Fetch all product brands
 */
export const getBrands = () => {
  const request = axios.get(`${PRODUCT_SERVER}/brands`).then(res => res.data);

  return {
    type: GET_BRANDS,
    payload: request
  };
};

/**
 * Fetch all product types
 */
export const getTypes = () => {
  const request = axios.get(`${PRODUCT_SERVER}/types`).then(res => res.data);

  return {
    type: GET_TYPES,
    payload: request
  };
};
