import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addItem, deleteItem, addItemToDb, deleteItemFromDb, getSubtotal } from '../store';
import { CartPreview, CartSummary } from './';

const Cart = () => (

            <div>
              <CartPreview />
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
