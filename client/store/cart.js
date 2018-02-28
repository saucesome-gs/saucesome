import axios from 'axios';
import history from '../history';

// ACTION TYPES

const GET_CART = 'GET_CART';
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_ITEM_QTY = 'UPDATE_ITEM_QTY';

// INITIAL STATE
const cart = [];

// ACTION CREATORS

export const getCartAction = (cart) => ({
  type: GET_CART,
  cart
});

export const addItemAction = (item) => ({
  type: ADD_ITEM,
  item
});

export const removeItemAction = (item) => ({
  type: REMOVE_ITEM,
  item
});

export const updateItemQtyAction = (item) => ({
  type: UPDATE_ITEM_QTY,
  item
});

// THUNK CREATORS

export const getCartThunk = (orderId) => (dispatch) => {
    axios.get(`/cart/${orderId}`)
    .then((res) => {
      dispatch(getCartAction(res.data));
    })
}

export const addItem = (itemId) => (dispatch) => {
  axios.get(`/product/${itemId}`)
  .then((res) => {
    dispatch(addItemAction(res.data));
  })
}

// REDUCER

export default function(state = cart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case ADD_ITEM:
      return [...action.cart, action.item];
    default:
      return state;
  }
}
