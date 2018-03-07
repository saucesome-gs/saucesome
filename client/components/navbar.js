import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink, withRouter } from 'react-router-dom'
import {logout, clearCartAction } from '../store'

const Navbar = ({ handleClick, isLoggedIn, cart, user }) => (

  <div className="black">
    <div id="saucesome-wrapper">
      <img src="images/hot-pepper.png" className="hot-pepper-img" />
      <h1 id="saucesome">
        <NavLink to="/">SAUCESOME</NavLink>
      </h1>
      <img src="images/hot-pepper.png" className="hot-pepper-img" />
    </div>
    <nav>
      <div className="column-1">
        <NavLink to="/products">All Products</NavLink>
        <NavLink to="/cart">Your Cart:
          <span>
            ({Object.keys(cart).reduce((acc, curr) => (
              acc + cart[curr]
            ), 0)}) items
          </span>
        </NavLink>
      </div>
      <div className="column-2">
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
            <NavLink to="/login">Login to Shop</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </div>
        )}
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
