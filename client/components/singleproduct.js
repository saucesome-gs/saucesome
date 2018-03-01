import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { addItem } from '../store/cart';

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
<<<<<<< HEAD

const mapDispatchToProps = null;
=======
const mapDispatchToProps = dispatch => {
  return {
    addItem(id) {
      dispatch(addItem(id));
    }
  }
};
>>>>>>> dc513f73fcb370802b1bf0175df77e838d6b3e86

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleProduct));
