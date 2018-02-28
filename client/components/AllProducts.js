import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { fetchProducts } from '../store/product';

export const AllProducts = (props) => {
  
    const { products } = props;
    
    return (
        <div>
          <h1>Products</h1>
          <div>
          { (products.length) && products.map((product => {
            return (
              <div key={product.id}>
                <img src={product.imageUrl} />
                <ul>
                  <li>
                    <NavLink to={`/products/${+product.id}`}>{product.name}</NavLink>
                  </li>
                </ul>
                <button>Add to Cart</button>
              </div>
            )}
          ))
        }
        </div>
        
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
