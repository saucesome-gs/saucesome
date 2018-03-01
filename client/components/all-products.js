import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import {EditForm, ProductForm} from './';
// import { fetchProducts } from '../store/product';

export const AllProducts = (props) => {

    const { products, isAdmin } = props;

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
                {(isAdmin) ? <button>Edit Product</button> : <div></div>}
              </div>
            )}
          ))
        }
        </div>
  {(isAdmin) ? <ProductForm /> : <div></div>}
 </div>
    )
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = null;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllProducts));
