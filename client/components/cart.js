import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { addItem, deleteItem } from '../store/cart';

class Cart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      subtotal: 0
    }
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.updateSubtotal = this.updateSubtotal.bind(this);
  }

  componentDidMount(){
    this.updateSubtotal();
  }

  async handleIncrement(event) {
    event.preventDefault();
    await this.props.addItem(event.target.value);
    this.updateSubtotal();
  }

  async handleDecrement(event) {
    event.preventDefault();
    await this.props.deleteItem(event.target.value);
    this.updateSubtotal();
  }

  updateSubtotal() {

    const cart = this.props.cart;
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

    this.setState({
      subtotal
    })

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
                        <NavLink
                          to={`/products/${+productId}`}>{`${productDetails.name}
                            - $${productPrice} `}
                        </NavLink>
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
          <div id="cart-details">
            <table className="cart-summary">
              <tbody>
                <tr>
                  <th colSpan="2">Your Sauce Deets</th>
                </tr>
                <tr>
                  <td className="type">Subtotal</td>
                  <td className="amount">${this.state.subtotal}</td>
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


// {
//   Object.keys(cart).length && Object.keys(cart).map(productId => {
//     const productDetails = products.find(cartItem => +productId === +cartItem.id);
//     const productPriceArr = productDetails.prices;
//     console.log('productPriceArr', productPriceArr)
//     console.log('PRICE --> ', productPriceArr[productPriceArr.length-1].price)
//     let subtotal = 0;
//   })
// }

// Subtotal prices
// {
//   Object.keys(cart).length && Object.keys(cart).reduce( (acc, curr) => {
//     let product = products.find(cartItem => +curr === +cartItem.id);
//     let productPrice = product.prices[product.prices.length - 1].price;
//     console.log('productPrice -->', productPrice)
//     console.log('ACC -->', acc);
//     console.log('CURR -->', curr)
//     return acc + productPrice;

//   }, 0)
// }
