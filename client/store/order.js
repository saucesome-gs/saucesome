import axios from 'axios';

// INITIAL STATE
const order = 0;

// ACTION TYPES
const SET_ORDER = 'SET_ORDER';

// ACTION CREATORS
export const setOrderAction = (orderNumber) => {
  return {
    type: SET_ORDER,
    orderNumber
  }
}

// THUNKS
export const setOrder = userId => dispatch => {
  axios.post('/api/cart', { userId })
  .then(createdOrder =>
    dispatch(setOrderAction(createdOrder.data.id))
  )
  .catch(error => {
    console.log(error)
  })
}

export const resetOrder = (orderId) => dispatch => {
  axios.put(`/api/checkout/${orderId}`)
  .then( (updatedOrder) => {
    axios.get(`/api/cart/${updatedOrder.userId}`)
  })
  .then(newOrder => {
    dispatch(setOrderAction(newOrder.data.id))
  })
}

// REDUCERS
export default function(state = order, action) {
  switch (action.type) {
    case SET_ORDER:
      return action.orderNumber;
    default:
      return state;
  }
}
