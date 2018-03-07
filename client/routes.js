import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import { Login, Signup, UserHome, AllProducts, SingleProduct, Cart, SearchTag, AllOrders, Checkout, SingleOrder, UserManagement } from './components'
import { me, fetchProducts, addItem, addItemToDb, fetchUsersOrders } from './store';


/**
 * COMPONENT
 */
class Routes extends Component {

  constructor(props) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  componentDidMount () {
    this.props.loadInitialData()
    this.props.getProducts()
  }

  handleAddToCart(event) {
    if (this.props.isLoggedIn) {
      this.props.addItemToDb(event.target.value, this.props.order);
      } else {
    event.preventDefault();
    this.props.addItem(event.target.value);
      }
    }

  render () {
    const {isLoggedIn, isAdmin} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}

        <Route exact path="/products" render={() => <AllProducts handleAddToCart={this.handleAddToCart} isAdmin={isAdmin} />} />
        <Route exact path="/products/:productId" render={() => <SingleProduct handleAddToCart={this.handleAddToCart} isAdmin = {isAdmin} />} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={Cart} />
        <Route path="/tag/:tagId" render={() => <SearchTag handleAddToCart={this.handleAddToCart} />} />
        <Route path="/checkout" component={Checkout} />
        <Route exact path="/orders/:userId" component={AllOrders} />
        <Route path="/orders/order/:orderId" component={SingleOrder} />
        {
          isLoggedIn &&
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
              <Route path="/usermanage" component= {UserManagement} />
     </Switch>
        }
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isAdmin: state.user.isAdmin,
    isLoggedIn: !!state.user.id,
    products: state.products,
    user: state.user,
    order: state.order,
    pastOrders: state.pastOrders
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
    },
    getProducts () {
      dispatch(fetchProducts());
    },
    addItem(id) {
      dispatch(addItem(id));
    },
    addItemToDb(productId, orderId) {
      dispatch(addItemToDb(productId, orderId));
    },
    fetchUsersOrders(userId) {
      dispatch(fetchUsersOrders(userId));
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
