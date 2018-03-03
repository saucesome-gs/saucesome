import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_REVIEWS = 'GET_REVIEWS';
const GET_REVIEW = 'GET_REVIEW';
const CREATE_REVIEW = 'CREATE_REVIEW';
const UPDATE_REVIEW = 'UPDATE_REVIEW';
const REMOVE_REVIEW = 'REMOVE_REVIEW';

/**
 * INITIAL STATE
 */

const reviews = [];

/**
 * ACTION CREATORS
 */

export const getReviews = (reviews) => {
  return {
    type: GET_REVIEWS,
    reviews
  }
}

export const getReview = (reviewId) => {
  return {
    type: GET_REVIEW,
    reviewId
  }
}

export const createReview = (review) => {
  return {
    type: CREATE_REVIEW,
    review
  }
}

export const updateReview = (review) => {
  return {
    type: UPDATE_REVIEW,
    review
  }
}

export const removeReview = (reviewId) => {
  return {
    type: REMOVE_REVIEW,
    reviewId
  }
}

/**
 * THUNK CREATORS
 */

// export const fetchReviews = () => {
//   return dispatch =>
//     axios.get('/api/reviews')
//       .then(res => res.data)
//       .then(reviews => dispatch(getReviews(reviews)))
//       .catch(err => console.error(err));
// }

// export const fetchReview = (reviewId) => {
//   return dispatch =>
//     axios.get(`/api/reviews/${reviewId}`)
//       .then(res => res.data)
//       .then(review => dispatch(getReview(review.id)))
//       .catch(err => console.error(err));
// }

export const postReview = (review) => {
  return dispatch =>
    axios.post('/api/reviews/', review)
      .then(res => res.data)
      .then(newReview => dispatch(createReview(newReview)))
      .catch(err => console.error(err));
}

export const putReview = (review) => {
  return dispatch =>
    axios.put(`/api/reviews/${review.id}`, review)
      .then(res => res.data)
      .then(updatedReview => dispatch(updateReview(updatedReview)))
      .catch(err => console.error(err));
}

export const deleteReview = (reviewId) => {
  return dispatch =>
    axios.delete(`/api/reviews/${reviewId}`)
      .then(() => dispatch(removeReview(reviewId)))
      .catch(err => console.error(err));
}

/**
 * REDUCER
 */

export default function (state = reviews, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews;
    case GET_REVIEW:
      return state.filter(review => (review.id === action.reviewId))
    case CREATE_REVIEW:
      return [...state, action.review];
    case UPDATE_REVIEW:
      return state.map(review => ( review.id === action.review.id ? action.review : review ));
    case REMOVE_REVIEW:
      return state.filter(review => (review.id !== action.reviewId))
    default:
      return state;
  }
}
