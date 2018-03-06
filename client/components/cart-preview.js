import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addItem, deleteItem, addItemToDb, deleteItemFromDb, getSubtotal } from '../store';

class CartPreview extends Component {

  constructor(props) {
    super(props);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }

  handleIncrement(event) {
    event.preventDefault();
    if (this.props.isLoggedIn) {
      this.props.addItemToDb(event.target.value, this.props.order);
    } else {
      this.props.addItem(event.target.value);
    }
  }

  handleDecrement(event) {
    event.preventDefault();
    if (this.props.isLoggedIn) {
      this.props.deleteItemFromDb(event.target.value, this.props.order);
    } else {
      this.props.deleteItem(event.target.value);
    }
  }

  render() {

    const { cart, products } = this.props;

    return (
            <div>
              <p>Yo sauce:</p>
              <div className="cart-items">
                {
                  Object.keys(cart).length && Object.keys(cart).map(productId => {
                    const productDetails = products.find(cartItem =>
                      +productId === +cartItem.id
                    );
                    let productPrice = productDetails.prices[productDetails.prices.length - 1].price;

                    if (cart[productId]) {
                      return (
                        <div key={productId} className="cart-single-item">
                          <Link to={`/products/${+productId}`}>
                            <img src={productDetails.imageUrl} />
                          </Link>
                          <div className="cart-product-info">
                            <div>
                              <Link
                                to={`/products/${+productId}`}>{`${productDetails.name}
                                  - $${productPrice} `}
                              </Link>
                            </div>
                            <div className="cart-product-quantity">
                              <button
                                className="edit-qty"
                                value={productId}
                                onClick={this.handleDecrement}>
                                -
                              </button>
                              <span>{` Quantity: ${cart[productId]} `}</span>
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
    isLoggedIn: !!state.user.id
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteItem: (itemId => dispatch(deleteItem(itemId))),
    addItem: (itemId => dispatch(addItem(itemId))),
    addItemToDb: (productId, orderId) => {
      dispatch(addItemToDb(productId, orderId));
    },
    deleteItemFromDb: (itemId, orderId) => {
      dispatch(deleteItemFromDb(itemId, orderId));
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartPreview));
