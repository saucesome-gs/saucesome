import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getSubtotal } from '../store';

class CartSummary extends Component {

  constructor(props) {
    super(props);
    this.updateSubtotal = this.updateSubtotal.bind(this);
  }

  componentDidMount() {
    this.updateSubtotal();
  }

  componentDidUpdate() {
    this.updateSubtotal();
  }

  updateSubtotal() {
    const { cart } = this.props;
    const cartProdPrices = {};
    const cartIds = Object.keys(cart).map(el => +el);
    this.props.products
      .filter(el => cartIds.indexOf(el.id) > -1)
      .map(el => {
        let elPrice = el.prices[el.prices.length - 1].price;
        cartProdPrices[el.id] = elPrice;
      });
    let subtotal = 0;
    for (let prodId in cart) {
      let quantity = cart[prodId];
      subtotal += (quantity * cartProdPrices[prodId]);
    }
    this.props.getSubtotal(subtotal);
  }

  render() {

    const { subtotal } = this.props;

    return (
            <div id="cart-details">
              <table className="cart-summary">
                <tbody>
                  <tr>
                    <th colSpan="2">Your Sauce Deets</th>
                  </tr>
                  <tr>
                    <td className="type">Subtotal</td>
                    <td className="amount">${subtotal}</td>
                  </tr>
                  <tr>
                    <td className="type">Shipping</td>
                    <td className="amount">enter shipping jsx here</td>
                  </tr>
                  <tr>
                    <td className="type">Total</td>
                    <td className="amount">enter total jsx here</td>
                  </tr>
                </tbody>
              </table>
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
    getSubtotal: (subtotal) => {
      dispatch(getSubtotal(subtotal));
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartSummary));
