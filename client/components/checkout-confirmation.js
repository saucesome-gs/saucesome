import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { checkoutCart } from '../store';

class CheckoutConfirmation extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { subtotal } = this.props;

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
              <input type='submit' />
            </fieldset>
          </form>
        </div>
        <div className="address-details">
          <form className="billing-details">
            <fieldset>
              <legend>Billing Address</legend>
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
              <input type='submit' />
            </fieldset>
          </form>
        </div>
        <CartPreview />
        <CartSummary />
        <Link to="/checkout">
          <button className="checkout">
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
    checkoutCart: (cartArr => dispatch(checkoutCart(cartArr)))
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CheckoutConfirmation));
