import React, { Component } from 'react';
import {connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteItem } from '../store/cart';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.removeItemHandler = this.removeItemHandler.bind(this);
  }

  removeItemHandler (event) {
    event.preventDefault();
    // console.log(event.target.value);
    this.props.deleteItem(event.target.value);
  }

  render() {

    const { cart } = this.props;
    let counter = {};
    cart.forEach(item => {
      console.log('item name is ', item.name)
      if (!counter[item.name]) counter[item.name] = 1;
      else counter[item.name]++;
    })
    console.log('counter is ', counter);

    return (
      <div>
          <p>Your cart:</p>
          <div>

            {cart.length && Object.keys(counter).map(itemName => {

              const fullItem = cart.find(cartItem => itemName === cartItem.name);
              return (
                <div key={fullItem.id}>
                  <img src={fullItem.imageUrl} />
                  <ul>
                    <li>
                      <NavLink to={`/products/${+fullItem.id}`}>{fullItem.name}</NavLink>
                    </li>
                    <li>Quantity: {counter[itemName]}</li>
                  </ul>
                  <button value={itemName.id} onClick={this.removeItemHandler}>Remove from cart</button>
                </div>
              )
            })}

            {/* {(cart.length) && cart.map(item => {
            return (
              <div key={item.id}>
                <img src={item.imageUrl} />
                <ul>
                  <li>
                    <NavLink to={`/products/${+item.id}`}>{item.name}</NavLink>
                  </li>
                </ul>
                <button value={item.id} onClick={this.removeItemHandler}>Remove from cart</button>
              </div>
          )
        }
      )} */}

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
const mapDispatchToProps = (dispatch) => {
  return {
    deleteItem: (itemId => dispatch(deleteItem(itemId))),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
