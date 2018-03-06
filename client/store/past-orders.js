import axios from 'axios';

// ACTION TYPES

const FETCH_PAST_ORDERS = 'GET_USERS_ORDERS';
const CLEAR_PAST_ORDERS = 'CLEAR_PAST_ORDERS';

// INITIAL STATE

const pastOrders = [];

// ACTION CREATORS

const fetchPastOrdersAction = (orders) => {
  return {
    type: FETCH_PAST_ORDERS,
    orders
  }
}

export const clearPastOrdersAction = () => {
  return {
    type: CLEAR_PAST_ORDERS
  }
}

// THUNK CREATORS

export const fetchUsersOrders = (userId) => (dispatch) => {
  axios.get(`/api/past-orders/user/${userId}`)
  .then(foundOrders => foundOrders.data)
  .then(formattedOrders => {
    console.log('formatted orders are', formattedOrders)
    let orderObjects = formattedOrders.map(order => ({orderId: order.id, date: order.updatedAt, status: order.status}));
    dispatch(fetchPastOrdersAction(orderObjects));
  })
  .catch(err => console.log(err));
}

export const fetchAllOrders = () => dispatch => {
  axios.get('/api/past-orders')
  .then(allOrders => allOrders.data)
  .then(allOrdersData => {
    let orderObjects = allOrdersData.map(order => ({orderId: order.id, date: order.updatedAt, status: order.status}));
    dispatch(fetchPastOrdersAction(orderObjects));
  })
  .catch(err => console.log(err));
}

export const fetchOrdersByStatus = (status) => dispatch => {
  axios.get(`/api/past-orders/${status}`)
  .then(allOrders => allOrders.data)
  .then(allOrdersData => {
    let orderObjects = allOrdersData.map(order => ({orderId: order.id, date: order.updatedAt, status: order.status}));
    dispatch(fetchPastOrdersAction(orderObjects));
  })
}

// REDUCER

export default function reducer(state = pastOrders, action) {
  switch (action.type) {
    case FETCH_PAST_ORDERS:
      return action.orders;
    case CLEAR_PAST_ORDERS:
      return [];
    default:
      return state;
  }
}

