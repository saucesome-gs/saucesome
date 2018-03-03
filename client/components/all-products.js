import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchProducts } from '../store/product';
// import { SearchForm } from './search-form';
import { ProductForm } from './';
// import { fetchProducts } from '../store/product';

export class AllProducts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = event.target.value
    this.setState({
      value: value.toLowerCase()
    })
  }

  render() {

    const products = this.props.products;
    const isAdmin = this.props.isAdmin;
    const value = this.state.value
    const filteredProducts = this.props.products.filter(product => (product.name.toLowerCase().match(value) || product.brand.name.toLowerCase().match(value)) && product.quantity > 0)
    
   return (
    <div>
    <form>
    <input
      type="text"
      id="value"
      value={value}
      onChange={this.handleChange}
    />
  </form>
     <h1>Products</h1>
     { (!products.length) ? <p>Loading...</p> :
       <div>
     { (products.length) && filteredProducts.map((product => {
       return (
         <div key={product.id}>
           <a href={`/products/${+product.id}`}>
             <img src={product.imageUrl} />
           </a>
           <div>
             <div>{product.brand.name}</div>
             <div>
               <Link to={`/products/${+product.id}`}>
                 {product.name}
               </Link>
             </div>
             <div>${product.prices[product.prices.length - 1].price}</div>
           </div>
           <button
             value={product.id}
             onClick={this.props.handleAddToCart}>
             Add to Cart
           </button>
         </div>
       )}
     ))
   }
   </div>
 }
  {(isAdmin) ? <ProductForm /> : <div></div>}
   </div>
   )
}
}

const mapStateToProps = state => {
  return {
    products: state.products,
    order: state.order,
    isLoggedIn: !!state.user.id
  }

}

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
  // addItem: (itemId) => dispatch(addItem(itemId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllProducts));
