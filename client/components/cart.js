import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { CartPreview, CartSummary } from './';

const Cart = (props) => (
    <div>
  { Object.keys(props.cart).length &&
            <div>
              <CartPreview />
              <div className="my-5">
                <CartSummary />
                <Link to="/checkout">
                  <div className="checkout-button">
                    <button>
                      Cash Out Dat Sauce
                    </button>
                  </div>
                </Link>
              </div>
            </div> }
    { !Object.keys(props.cart).length &&
    <div>
      No items to display
      </div>}
  </div>
)

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  }
};
const mapDispatchToProps = null;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
