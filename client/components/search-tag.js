import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { fetchProducts } from '../store/product';
export class SearchTag extends Component {
  constructor(props) {
    super(props)

  }
  componentDidMount(){
    this.props.fetchProducts()
  }

  render() {
    const products = this.props.products;
    console.log(products);
    const tagId = this.props.match.params.tagId
    const tagProducts = products.filter(product => product.tags.includes(tagId));

  return (
    <div>
    <h1>All sauces that are {tagId}!</h1>
      { (tagProducts.length) && tagProducts.map(product => {
        return (
        <div key={product.id}>
          <a href={`/products/${+product.id}`}>
            <img src={product.imageUrl} />
          </a>
          <div>
            <div>{product.brand.name}</div>
            <div>
              <NavLink to={`/products/${+product.id}`}>
                {product.name}
              </NavLink>
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
    )}
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
  fetchProducts: () => dispatch(fetchProducts()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchTag));
