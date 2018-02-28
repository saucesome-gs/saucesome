import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { fetchProducts } from '../store/product';

class AllProducts extends Component {
  constructor(props) {
    super(props)
  }
  
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    console.log('props', );
    const { products } = this.props;
    
    return (
        <div>
          <h1>Products</h1>
          <ul>
          { (products.length) && products.map((product => {
            return (
              <li key={product.id}>
                <NavLink to={`/products/${+product.id}`}>{product.name}</NavLink>
              </li>
            )}
          ))
        }
        </ul>
        </div>
    )
}
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

// <ul>
//               { (products.length) && products.map((product => {
//                 return (
//                   <li key={product.id}>
//                     <NavLink to={`/products/${+product.id}`}>{product.name}</NavLink>
//                   </li>
//                 )}
//               ))
//             }
//             </ul>