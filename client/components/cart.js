import React, { Component } from 'react';
import {connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {

    const { cart } = this.props;


    return (
      <div>
          <p>Your cart:</p>
          <div>
            {(cart.length) &&  cart.map(item => {
            return (
              <div key={item.id}>
                <img src={item.imageUrl} />
                <ul>
                  <li>
                    <NavLink to={`/products/${+item.id}`}>{item.name}</NavLink>
                  </li>
                </ul>
                <button value={item.id} >Remove from cart</button>
              </div>
          )
        }
      )}
      </div>
      </div>
    )
}
  }

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    products: state.products
  }
};
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
