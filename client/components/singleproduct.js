import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { fetchProduct } from '../store/product';

export const SingleProduct = (props) => {

  const { product } = props;



  return (
    
    <div>
      <h1>Product</h1>
      <h1>{product.name}</h1>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    product: state.product
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchProduct: () => dispatch(fetchProduct(Number(ownProps.match.params.productId)))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleProduct));
