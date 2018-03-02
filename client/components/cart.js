import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
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
  componentDidMount() {
    console.log('IN COMPONENT DID MOUNT!!')
    // this.props.
  }

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

    console.log('THIS.PROPS --> ', this.props)
    const { cart, products } = this.props;
    console.log('CART -->', cart);
    console.log('PRODUCTS -->', products);

    return (
      <div>
        <p>Yo sauce:</p>
        <div>
          {
            Object.keys(cart).length && Object.keys(cart).map(productId => {
              const productDetails = products.find(cartItem =>
                +productId === +cartItem.id
              );
              // console.log('productId is', productId)
              if (cart[productId]) {
                return (
                  <div key={productId} className="cart-product">
                    <a href={`/products/${+productId}`}>
                      <img src={productDetails.imageUrl} />
                    </a>
                    <div className="cart-product-info">
                      <div>
                        <NavLink to={`/products/${+productId}`}>{productDetails.name}</NavLink>
                      </div>
                      <div className="cart-product-quantity">
                        <button
                          className="edit-qty"
                          value={productId}
                          onClick={this.handleDecrement}>
                          -
                        </button>
                        <span> Quantity: {cart[productId]} </span>
                        <button
                          className="edit-qty"
                          value={productId}
                          onClick={this.handleIncrement}>
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )
              }
            })
          }
        </div>
        <div>
          <div id="cart-details">
            <table className="cart-summary">
              <tbody>
                <tr>
                  <th colSpan="2">Yo Sauce Deets</th>
                </tr>
                <tr>
                  <td className="type">Subtotal</td>
                  <td className="amount">
                    {
                      Object.keys(cart).length && Object.keys(cart).map(productId => {
                        const productDetails = products.find(cartItem => +productId === +cartItem.id);
                        let subtotal = 0;
                      })
                    }
                  </td>
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
          <button
            className="checkout"
            value="">
            Cash Out Dat Sauce
          </button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
