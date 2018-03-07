import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { CartPreview, CartSummary } from './';

const Cart = (props) => (
    <div>
  { Object.keys(props.cart).length &&
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
