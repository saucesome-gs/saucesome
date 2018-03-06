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

export const getProduct = (product) => {
  return {
    type: GET_PRODUCT,
    product
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
      .catch(err => console.error(err));
}

export const fetchProduct = (productId) => {
  return dispatch =>
    axios.get(`/api/products/${productId}`)
      .then(res => res.data)
      .then(product => dispatch(getProduct(product)))
      .catch(err => console.error(err));
}

export const postProduct = (product, that) => {
  return dispatch =>
    axios.post('/api/products/', product)
      .then(res => res.data)
      .then(newProduct => {
        console.log(newProduct)
        return dispatch(createProduct(newProduct))})
        .then((product) => {
          console.log("this is that:",that);
          that.props.history.push(`/products/${product.product.id}`)
        })
      .catch(err => console.error(err));
}

export const putProduct = (product, that) => {
  return dispatch =>
    axios.put(`/api/products/${product.id}`, product)
      .then(res => res.data)
      .then(updatedProduct => {
        console.log(updatedProduct)
        dispatch(updateProduct(updatedProduct))})
      .then((product) => {
        console.log("this is that:",that, "this is product:", product);
        that.props.history.push(`/products`)
      })
      .catch(err => console.error(err));
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
      return action.products;
    case GET_PRODUCT:
      return [action.product]
    case CREATE_PRODUCT:
      return [...state, action.product];
    case UPDATE_PRODUCT:
      return state.map(product => ( product.id === action.product.id ? action.product : product ));
    case REMOVE_PRODUCT:
      return state.filter(product => (product.id !== action.productId))
    default:
      return state;
  }
}
