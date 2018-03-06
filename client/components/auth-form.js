import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {auth, addItemToDb} from '../store';

/**
 * COMPONENT
 */
class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (evt) {
    evt.preventDefault()
    const formName = evt.target.name
    const email = evt.target.email.value
    const password = evt.target.password.value
    this.props.auth(email, password, formName)
    .then(() => console.log('cart is', this.props.cart));
    this.addCartToDb();
  }

  addCartToDb () {
    const itemIds = Object.keys(this.props.cart);
    const orderId = this.props.order;
    itemIds.map(id => {
      // for (var i = 0; i < this.props.cart[id]; i++) {
      //   this.props.addItemToDb(id, orderId);
      addItemToDb(id, orderId)
      })
  }

  render() {

  const {name, displayName, error} = this.props;


  return (
    <div>
      <form onSubmit={this.handleSubmit} name={name}>
        <div>
          <label htmlFor="email"><small>Email</small></label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password"><small>Password</small></label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
    cart: state.cart,
    products: state.products,
    order: state.order
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
    cart: state.cart
  }
}

const mapDispatch = (dispatch) => {
  return {
    auth: (email, password, formName) => dispatch(auth(email, password, formName)),
    addItemToDb: (itemId, orderId) => dispatch(addItemToDb(itemId, orderId))
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  // handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
  cart: PropTypes.object
}
