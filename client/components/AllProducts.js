import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { fetchProducts } from '../store/product';

// Using the debug npm:
import d from 'debug'
const debug = d('all-products')

const AllProducts = (props) => {

  const { products } = props;
  debug(props);
  return (
    <div>
      <h1>Products</h1>
        <ul>

        </ul>
    </div>
  )
}


const mapStateToProps = state => {
  return {
    products: state.products
  }
}
const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllProducts));
