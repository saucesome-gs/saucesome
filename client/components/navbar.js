import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink, withRouter } from 'react-router-dom'
import {logout, clearCartAction } from '../store'

const Navbar = ({ handleClick, isLoggedIn, cart, user }) => (

  <div>
    <h1>
      <NavLink to="/">SAUCESOME</NavLink>
    </h1>
    <nav>
      <div>
        <NavLink to="/products">Products</NavLink>
      </div>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <NavLink to="/home">Your Account</NavLink>
          <NavLink to={`/orders/${user.id}`}>Your Past Orders</NavLink>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </div>
        )}
      <div>
        <NavLink to="/cart">Your Cart:
          <span>
            ({Object.keys(cart).reduce((acc, curr) => (
              acc + cart[curr]
            ), 0)}) items
          </span>
        </NavLink>
      </div>
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.cart,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
      dispatch(clearCartAction())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
