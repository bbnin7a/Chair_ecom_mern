import {
  GET_PRODUCT_BY_SELL, 
  GET_PRODUCT_BY_ARRIVAL,
  GET_BRANDS,
  GET_TYPES
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT_BY_SELL:
      return { ...state, bySell: action.payload};
    case GET_PRODUCT_BY_ARRIVAL:
      return { ...state, byArrival: action.payload};
    case GET_BRANDS:
      return {...state, brands: action.payload}
    case GET_TYPES:
      return {...state, types: action.payload}
    default:
      return state;
  }
};
