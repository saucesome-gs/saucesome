import axios from 'axios';
import { setOrderAction } from './order';
// import history from '../history';


// ACTION TYPES

const FETCH_CART = 'FETCH_CART';
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_ITEM_QTY = 'UPDATE_ITEM_QTY';
const CLEAR_CART = 'CLEAR_CART';

// INITIAL STATE
const cart = {};

// ACTION CREATORS

export const fetchCartAction = (cart) => ({
  type: FETCH_CART,
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

export const clearCartAction = () => ({
  type: CLEAR_CART
})

// THUNK CREATORS

export const fetchCartAtLogin = (userId) => (dispatch) => {
  console.log('IN THUNK')
  axios.post('/api/cart', { userId })
  .then(createdOrder => {
    dispatch(setOrderAction(createdOrder.data.id))
    const items = createdOrder.data.orderItems;
    if (items) items.forEach((item) => dispatch(addItemAction(item)))
  })
}

// export const fetchCartThunk = (userId) => (dispatch) => {
//     axios.get(`/cart/${userId}`)
//     .then((res) => {
//       dispatch(fetchCartAction(res.data));
//     })
// }

export const addItem = (itemId) => (dispatch) => {
  axios.get(`/api/products/${itemId}`)
  .then((res) => {
    dispatch(addItemAction(res.data));
  })
}

export const addItemToDb = (itemId, orderId) => (dispatch) => {
  axios.get(`/api/products/${itemId}`)
  .then((foundItem) => {
    dispatch(addItemAction(foundItem.data));
    axios.post(`/api/cart/${orderId}`, {orderId: orderId, productId: foundItem.data.id, priceId: null})
  })
}

export const deleteItem = (itemId) => (dispatch) => {
  axios.get(`/api/products/${itemId}`)
  .then((res) => {
    dispatch(removeItemAction(res.data));
  })
}

export const deleteItemFromDb = (itemId, orderId) => (dispatch) => {
  axios.get(`/api/products/${itemId}`)
  .then((foundItem) => {
    dispatch(removeItemAction(foundItem.data));
    axios.put('/api/cart', {orderId: orderId, productId: foundItem.data.id})
  })
}

// REDUCER

export default function(state = cart, action) {

  switch (action.type) {

    case FETCH_CART:
      return action.cart;

    case ADD_ITEM:
    if (!state.hasOwnProperty(action.item.id)) {
      return {...state, [action.item.id]: 1};
    } else {
      const newState = {...state};
      newState[action.item.id]++;
      return newState;
    }

    case REMOVE_ITEM: {
      if (state.hasOwnProperty(action.item.id)) {
        const newState = {...state};
        newState[action.item.id]--;
        if (newState[action.item.id] === 0) delete newState[action.item.id];
        return newState;
      }
      break;
    }

    case CLEAR_CART: {
      return {};
    }

    default:
      return state;
  }
}

