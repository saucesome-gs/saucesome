import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { addItemFromSingle } from '../store/cart';

export const SingleProduct = (props) => {

  const { products } = props;

  const product = products.filter(product => Number(props.match.params.productId) === product.id)[0];

  return (
    <div>
      { (products.length) &&
        <div>
          <img src={product.imageUrl} />
          <h1>{product.name}</h1>
          <button value={product.id} onClick={props.handleAddToCart}>Add To Cart</button>
        </div>
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addItemFromSingle(id) {
      dispatch(addItemFromSingle(id));
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleProduct));
