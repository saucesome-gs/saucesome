import React, { Component } from 'react';
import {connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addItem, deleteItem } from '../store/cart';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.removeItemHandler = this.removeItemHandler.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }

  removeItemHandler (event) {
    event.preventDefault();
    // console.log(event.target.value);
    this.props.deleteItem(event.target.value);
  }

  handleIncrement(event) {
    event.preventDefault();
    this.props.addItem(event.target.value);
  }

  handleDecrement(event) {
    event.preventDefault();
    console.log('decrementing')
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
                  </ul>
                  <button className="edit-qty" value={fullItem.id} onClick={this.handleIncrement}>+</button>
                  <p>Quantity: {counter[itemName]}</p>
                  <button
                    className="edit-qty"
                    value={fullItem.id}
                    onClick={this.handleDecrement}
                    >-</button>
                </div>
              )
            })}

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
    addItem: (itemId => dispatch(addItem(itemId)))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
