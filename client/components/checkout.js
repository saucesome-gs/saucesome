import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { checkoutCart } from '../store';

class Checkout extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

  }

  render() {

    const props = this.props;
    console.log('CHECKOUT COMPONENT PROPS: \n ', props);

    return (
      <div>{this.props.subtotal}</div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    products: state.products,
    user: state.user,
    order: state.order,
    isLoggedIn: !!state.user.id
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkoutCart: (cartArr => dispatch(checkoutCart(cartArr)))
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout));
