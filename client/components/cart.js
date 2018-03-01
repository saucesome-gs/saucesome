import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addItem, deleteItem } from '../store/cart';

class Cart extends Component {
  constructor(props) {
    super(props);
    // this.removeItemHandler = this.removeItemHandler.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }

  // removeItemHandler (event) {
  //   event.preventDefault();
  //   // console.log(event.target.value);
  //   this.props.deleteItem(event.target.value);
  // }

  handleIncrement(event) {
    event.preventDefault();
    this.props.addItem(event.target.value);
  }

  handleDecrement(event) {
    event.preventDefault();
    // console.log('decrementing')
    this.props.deleteItem(event.target.value);
  }

  render() {

    const { cart, products } = this.props;
    console.log('CART -->', cart);

    return (
      <div>
        <p>Your cart:</p>
        <div>
          {
            Object.keys(cart).length && Object.keys(cart).map(productId => {
              const productDetails = products.find(cartItem =>
                +productId === +cartItem.id
              );
              if (cart[productId]) {
                return (
                  <div key={productId}>
                    <img src={productDetails.imageUrl} />
                    <ul>
                      <li>
                        <NavLink to={`/products/${+productId}`}>{productDetails.name}</NavLink>
                      </li>
                    </ul>
                    <button className="edit-qty" value={productId} onClick={this.handleIncrement}>+</button>
                    <p>Quantity: {cart[productId]}</p>
                    <button
                      className="edit-qty"
                      value={productId}
                      onClick={this.handleDecrement}
                    >-</button>
                  </div>
                )
              }
            })
          }
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
