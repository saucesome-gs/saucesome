import axios from 'axios';

// ACTION TYPES

const ADD_PAST_ORDER = 'GET_USERS_ORDERS';

// INITIAL STATE

const pastOrders = [];

// ACTION CREATORS

const addPastOrderAction = (order) => {
  return {
    type: ADD_PAST_ORDER,
    order
  }
}

// THUNK CREATORS

export const fetchUsersOrders = (userId) => (dispatch) => {
  console.log('fetching users orders')
  axios.get(`/api/past-orders/${userId}`)
  .then(foundOrders => foundOrders.data)
  .then(formattedOrders =>
    formattedOrders.map(order => dispatch(addPastOrderAction({orderId: order.id, date: order.updatedAt})))
)
}

// REDUCER

export default function reducer(state = pastOrders, action) {
  switch (action.type) {
    case ADD_PAST_ORDER: {
      return [...state, action.order];
    }
    default:
      return state;
  }
}

