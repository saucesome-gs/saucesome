import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logout } from '../store'

const Navbar = (props, { handleClick, isLoggedIn }) => (

  <div>
    <h1>SAUCESOME</h1>
    <nav>
      <div>
        <NavLink to="/products">Products</NavLink>
      </div>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <NavLink to="/home">Home</NavLink>
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
          <span> ({Object.keys(props.cart).reduce((acc, curr) => (
            acc + props.cart[curr]
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
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
