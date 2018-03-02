import axios from 'axios';

const order = 0;

const SET_ORDER = 'SET_ORDER';

export const setOrderAction = (orderNumber) => {
  return {
    type: SET_ORDER,
    orderNumber
  }
}

export const setOrderThunk = userId => dispatch => {
  axios.post('/api/cart', { userId })
  .then(createdOrder =>
  dispatch(setOrderAction(createdOrder.data.id)))
};

export default function(state = order, action) {
  switch (action.type) {
    case SET_ORDER:
      return action.orderNumber;
    default:
      return state;
  }
}
