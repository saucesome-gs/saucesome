import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_PRODUCT = 'GET_PRODUCT';
const CREATE_PRODUCT = 'CREATE_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

/**
 * INITIAL STATE
 */

const products = [];

/**
 * ACTION CREATORS
 */

export const getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

export const getProduct = (productId) => {
  return {
    type: GET_PRODUCT,
    productId
  }
}

export const createProduct = (product) => {
  return {
    type: CREATE_PRODUCT,
    product
  }
}

export const updateProduct = (product) => {
  return {
    type: UPDATE_PRODUCT,
    product
  }
}

export const removeProduct = (productId) => {
  return {
    type: REMOVE_PRODUCT,
    productId
  }
}

/**
 * THUNK CREATORS
 */

export const fetchProducts = () => {
  return dispatch =>
    axios.get('/api/products')
      .then(res => res.data)
      .then(products => dispatch(getProducts(products)))
      .catch(err => console.log(err));
}

export const fetchProduct = (productId) => {
  return dispatch =>
    axios.get(`/api/products/${productId}`)
      .then(res => res.data)
      .then(product => dispatch(getProduct(product.id)))
      .catch(err => console.log(err));
}

export const postProduct = (product) => {
  return dispatch => 
    axios.post('/api/products/', product)
      .then(res => res.data)
      .then(newProduct => dispatch(createProduct(newProduct)))
      .catch(err => console.log(err));
}

export const putProduct = (product) => {
  return dispatch =>
    axios.put(`/api/products/${product.id}`, product.info)
      .then(res => res.data)
      .then(updatedProduct => dispatch(updatedProduct(updatedProduct))).catch(err => console.error(err));
}

export const deleteProduct = (productId) => {
  return dispatch =>
    axios.delete(`/api/products/${productId}`)
      .then(() => dispatch(removeProduct(productId)))
      .catch(err => console.error(err));
}

/**
 * REDUCER
 */

export default function (state = products, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return state;
    case GET_PRODUCT:
      return state.filter(product => (product.id === action.productId))
    case CREATE_PRODUCT:
      return [...state.products, action.product];
    case UPDATE_PRODUCT:
      return state.map(product => ( product.id === action.product.id ? action.product : product ));
    case REMOVE_PRODUCT:
      return state.filter(product => (product.id !== action.productId))
    default:
      return state;
  }
}
