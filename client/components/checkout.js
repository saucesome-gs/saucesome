import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { checkoutLoggedInCart } from '../store';
import { CartPreview, CartSummary } from './';

class Checkout extends Component {

  constructor(props) {
    super(props);
    this.handleCheckout = this.handleCheckout.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.state = {
      email: ''
    }
  }

  handleCheckout() {
    if (this.props.isLoggedIn) this.props.checkoutLoggedInCart(this.props.order, this.state.email);
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  render() {

    return (
      <div>
        <div className="address-details">
          <form className="shipping-details">
            <fieldset>
              <legend>Shipping Address</legend>
              <label>Full Name*
                <input placeholder="Jane Doe" id='name' name='name' type='text' />
              </label>
              <label>Shipping Address 1*
                <input placeholder="123 Broadway" id='address1' name='address1' type='text' />
              </label>
              <label>Shipping Address 2
                <input placeholder="Apt 1" id='address2' name='address1' type='text' />
              </label>
              <label>City*
                <input placeholder="New York" id='city' name='city' type='text' />
              </label>
              <label>State*
                <input placeholder="NY" id='state' name='state' type='text' />
              </label>
              <label>Zip Code*
                <input placeholder="00000" id='zip' name='zip' type='text' />
              </label>
            </fieldset>
          </form>
        </div>
        <div className="address-details">
          <form className="billing-details">
            <fieldset>
              <legend>Billing Address</legend>
              <label>Desired Contact Email*
                <input placeholder="janeDoe@email.com" id='email' name='email' type='text'
                onChange={this.handleEmailChange} />
              </label>
              <label>Full Name*
                <input placeholder="Jane Doe" id='name' name='name' type='text' />
              </label>
              <label>Shipping Address 1*
                <input placeholder="123 Broadway" id='address1' name='address1' type='text' />
              </label>
              <label>Shipping Address 2
                <input placeholder="Apt 1" id='address2' name='address1' type='text' />
              </label>
              <label>City*
                <input placeholder="New York" id='city' name='city' type='text' />
              </label>
              <label>State*
                <input placeholder="NY" id='state' name='state' type='text' />
              </label>
              <label>Zip Code*
                <input placeholder="00000" id='zip' name='zip' type='text' />
              </label>
            </fieldset>
          </form>
        </div>
        <CartPreview />
        <CartSummary />
        <Link to="/checkout-success">
          <button className="checkout" onClick={this.handleCheckout}>
            Place Order
          </button>
        </Link>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    products: state.products,
    user: state.user,
    order: state.order,
    isLoggedIn: !!state.user.id,
    subtotal: state.subtotal
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkoutLoggedInCart: ((orderId, email) => dispatch(checkoutLoggedInCart(orderId, email)))
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout));
