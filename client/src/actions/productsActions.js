import axios from 'axios';

import { PRODUCT_SERVER } from '../components/utils/misc';
import {
  GET_PRODUCT_BY_SELL,
  GET_PRODUCT_BY_ARRIVAL,
  GET_BRANDS,
  ADD_BRAND,
  GET_TYPES,
  ADD_TYPE,
  GET_PRODUCTS_TO_SHOP,
  ADD_PRODUCT,
  CLEAR_PRODUCT
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
    let accumulatedProducts = [...previousState, ...res.data.products];

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

/**
 * Create new product
 * @param {Object} dataToSubmit
 */
export const addProduct = dataToSubmit => {
  const request = axios
    .post(`${PRODUCT_SERVER}/product`, dataToSubmit)
    .then(res => res.data);

  return {
    type: ADD_PRODUCT,
    payload: request
  };
};

/**
 * Clear the addProduct in redux store
 */
export const clearProduct = () => {
  return {
    type: CLEAR_PRODUCT,
    payload: ''
  };
};

/////////////////////////////////////////
//////        CATEGORIES
/////////////////////////////////////////

/**
 * Fetch all product brands (GET)
 */
export const getBrands = () => {
  const request = axios.get(`${PRODUCT_SERVER}/brands`).then(res => res.data);

  return {
    type: GET_BRANDS,
    payload: request
  };
};

/**
 * Create new brand on database (POST)
 * @param {Object} dataToSubmit {name: "newbrand"}
 * @param {Array} existingBrands current state of list of brands
 */
export const addBrand = (dataToSubmit, existingBrands) => {
  const request = axios
    .post(`${PRODUCT_SERVER}/brand`, dataToSubmit)
    .then(res => {
      // merge the exisitng brands with new created brand
      let brands = [...existingBrands, res.data.brand];

      // return the reconstructed payload
      return {
        success: res.data.success,
        brands
      };
    })

  return {
    type: ADD_BRAND,
    payload: request
  };
};

/**
 * Fetch all product types (GET)
 */
export const getTypes = () => {
  const request = axios.get(`${PRODUCT_SERVER}/types`).then(res => res.data);

  return {
    type: GET_TYPES,
    payload: request
  };
};

/**
 * Create new type on database (POST)
 * @param {Object} dataToSubmit {name: "newbrand"}
 * @param {Array} existingTypes current state of list of brands
 */
export const addType = (dataToSubmit, existingTypes) => {
  const request = axios
    .post(`${PRODUCT_SERVER}/type`, dataToSubmit)
    .then(res => {
      // merge the exisitng brands with new created brand
      let types = [...existingTypes, res.data.type];

      // return the reconstructed payload
      return {
        success: res.data.success,
        types
      };
    })

  return {
    type: ADD_TYPE,
    payload: request
  };
};