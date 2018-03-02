import axios from 'axios';
// import history from '../history';
// import { Product } from '../../server/db/models';


// ACTION TYPES

const FETCH_CART = 'FETCH_CART';
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_ITEM_QTY = 'UPDATE_ITEM_QTY';

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

// THUNK CREATORS

export const fetchCartAtLogin = (userId) => (dispatch) => {
  console.log('IN THUNK')
  axios.post('/api/cart', userId)
  .then(createdOrder => {
    dispatch(fetchCartAction(createdOrder.data))
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

export const deleteItem = (itemId) => (dispatch) => {
  axios.get(`/api/products/${itemId}`)
  .then((res) => {
    dispatch(removeItemAction(res.data));
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

    default:
      return state;
  }
}


