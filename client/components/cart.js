import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addItem, deleteItem, addItemToDb, deleteItemFromDb, getSubtotal } from '../store';
import { CartSummary } from './';

class Cart extends Component {

  constructor(props) {
    super(props);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.updateSubtotal = this.updateSubtotal.bind(this);
  }

  componentDidMount() {
    this.updateSubtotal();
  }

  componentDidUpdate() {
    this.updateSubtotal();
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

    const { cart, products } = this.props;

    return (
            <div>
              <p>Yo sauce:</p>
              <div>
                {
                  Object.keys(cart).length && Object.keys(cart).map(productId => {
                    const productDetails = products.find(cartItem =>
                      +productId === +cartItem.id
                    );
                    let productPrice = productDetails.prices[productDetails.prices.length - 1].price;

                    if (cart[productId]) {
                      return (
                        <div key={productId} className="cart-product">
                          <a href={`/products/${+productId}`}>
                            <img src={productDetails.imageUrl} />
                          </a>
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
              <div>
                <CartSummary />
                <Link to="/checkout">
                  <button className="checkout">
                    Cash Out Dat Sauce
                  </button>
                </Link>
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
    isLoggedIn: !!state.user.id,
    subtotal: state.subtotal
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
    },
    getSubtotal: (subtotal) => {
      dispatch(getSubtotal(subtotal));
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
