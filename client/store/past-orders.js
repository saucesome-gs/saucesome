import axios from 'axios';

// ACTION TYPES

const FETCH_PAST_ORDERS = 'GET_USERS_ORDERS';

// INITIAL STATE

const pastOrders = [];

// ACTION CREATORS

const fetchPastOrdersAction = (orders) => {
  return {
    type: FETCH_PAST_ORDERS,
    orders
  }
}

// THUNK CREATORS

export const fetchUsersOrders = (userId) => (dispatch) => {
  console.log('fetching users orders')
  axios.get(`/api/past-orders/${userId}`)
  .then(foundOrders => foundOrders.data)
  .then(formattedOrders => {
    let orderObjects = formattedOrders.map(order => ({orderId: order.id, date: order.updatedAt, status: order.status}));
    dispatch(fetchPastOrdersAction(orderObjects));
  })


}

// REDUCER

export default function reducer(state = pastOrders, action) {
  switch (action.type) {
    case FETCH_PAST_ORDERS: {
      return action.orders;
    }
    default:
      return state;
  }
}

