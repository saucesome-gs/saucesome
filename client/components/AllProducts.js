import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { fetchProducts, fetchProduct } from '../store/product';
import { addItem } from '../store/cart';

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
                <button value={product.id} onClick={props.handleAddToCart}>Add to Cart</button>
              </div>
            )}
          ))
        }
        </div>
        </div>
      )
    }


  // handleAddToCart(event) {
  //   event.preventDefault();
  //   console.log(event.target.id)
  //   // addItemAction(event.target.id);
  //   }




const mapStateToProps = state => {
  return {
    products: state.products
  }
}
const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
  // addItem: (itemId) => dispatch(addItem(itemId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllProducts));
