import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS';
// const GET_USER = 'GET_USER';
const UPDATE_USER = 'UPDATE_USER';
const REMOVE_USER = 'REMOVE_USER';

/**
 * INITIAL STATE
 */
const users = [];

/**
 * ACTION CREATORS
 */
const getUsers = users => ({type: GET_USERS, users})
//const getUser = user => ({ type: GET_USER, user });
const removeUser = (userId) => ({ type: REMOVE_USER, userId });
const updateUser = user => ({type: UPDATE_USER, user })

/**
 * THUNK CREATORS
 */
export const fetchUsersAdmin = () => dispatch =>
   axios.get('/api/users/all')
   .then(res => res.data)
   .then(users => dispatch(getUsers(users)))
   .catch(err => console.log(err))

export const updateUserAdmin = (user) => dispatch =>
   axios.put(`/api/user/${user.id}`, user)
   .then(res => res.data)
   .then(updatedUser =>{
    console.log(updatedUser)
    dispatch(updateUser(updatedUser))})
  //  .then((user) => {
  //   console.log("this is user:", user);
  //   that.props.history.push(`/products`)
// })
.catch(err => console.error(err));

export const deleteUserAdmin = (userId) => dispatch =>
   axios.delete(`/api/user/${userId}`)
   .then(() => dispatch(removeUser(userId)))
   .catch(err => console.error(err))
/**
 * REDUCER
 */
export default function(state = users, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    case UPDATE_USER:
      return state.map(user => ( user.id === action.user.id ? action.user : user ));
    case REMOVE_USER:
      return state.filter(user => (user.id !== action.userId))
    default:
      return state;
  }
}
