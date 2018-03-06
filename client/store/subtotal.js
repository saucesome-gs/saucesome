import axios from 'axios';

// ACTION TYPES
const GET_SUBTOTAL = 'FETCH_SUBTOTAL';

// INITIAL STATE
let initialSubtotal = 0;

// ACTION CREATORS
export const getSubtotal = (subtotal) => {
  return {
    type: GET_SUBTOTAL,
    subtotal
  }
}

// REDUCERS
export default function(state = initialSubtotal, action) {
  switch (action.type) {
    case GET_SUBTOTAL:
      return action.subtotal;
    default:
      return state;
  }
}
