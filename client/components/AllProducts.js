import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

export const AllProducts = (props) => {
  
  const { products } = props;
  console.log(props);
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

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
