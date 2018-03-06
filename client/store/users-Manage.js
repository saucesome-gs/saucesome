import axios from "axios";
import history from "../history";

/**
 * ACTION TYPES
 */
const GET_USERS = "GET_USERS"
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";

/**
 * INITIAL STATE
 */
const users = [];

/**
 * ACTION CREATORS
 */
const getUsers = users => ({type: GET_USERS, users})
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

/**
 * THUNK CREATORS
 */
export const fetchUsersAdmin = () => dispatch =>
   axios.get('/api/users/all')
   .then(users => dispatch(getUsers(users)))
   .catch(err => console.log(err))


/**
 * REDUCER
 */
export default function(state = users, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    // case GET_USER:
    //   return action.user;
    // case REMOVE_USER:
    //   return 1;
    default:
      return state;
  }
}
