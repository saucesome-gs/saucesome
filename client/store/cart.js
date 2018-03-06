import axios from 'axios';
import { setOrderAction } from './order';

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
  .catch(error => {
    console.log(error)
  })
}

export const addItem = (itemId) => (dispatch) => {
  return axios.get(`/api/products/${itemId}`)
  .then((res) => {
    dispatch(addItemAction(res.data));
  })
  .catch(error => {
    console.log(error)
  })
}

export const addItemToDb = (itemId, orderId) => (dispatch) => {
  return axios.get(`/api/products/${itemId}`)
  .then((foundItem) => {
    dispatch(addItemAction(foundItem.data))
    axios.post(`/api/cart/${orderId}`, {orderId: orderId, productId: foundItem.data.id, priceId: null})
  })
  .catch(error => {
    console.log(error)
  })
}

export const deleteItem = (itemId) => (dispatch) => {
  return axios.get(`/api/products/${itemId}`)
  .then((res) => {
    dispatch(removeItemAction(res.data));
  })
  .catch(error => {
    console.log(error)
  })
}

export const deleteItemFromDb = (itemId, orderId) => (dispatch) => {
  return axios.get(`/api/products/${itemId}`)
  .then((foundItem) => {
    dispatch(removeItemAction(foundItem.data));
    axios.put('/api/cart', {orderId: orderId, productId: foundItem.data.id})
  })
  .catch(error => {
    console.log(error)
  })
}

export const checkoutCart = (cartArr) => (dispatch) => {
  return axios.post(`/api/checkout`, cartArr)
  .then( () => dispatch(clearCartAction()) )
  .catch(error => {
    console.log(error)
  })
}
export const checkoutLoggedInCart = (orderId) => dispatch => {
  return axios.put(`/api/checkout/${orderId}`)
  .then( () => dispatch(clearCartAction()));
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
