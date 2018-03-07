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
  componentDidMount(){
    this.props.fetchProducts()
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
            <div id="all-products-flex">
              <div>
                <h1>🔥 All Products 🔥</h1>
              </div>
              <div>
                <form>
                  <input
                    className="form-control form-control-md all-products-search"
                    placeholder="Search All Products..."
                    type="text"
                    id="value"
                    value={value}
                    onChange={this.handleChange}
                  />
                </form>
              </div>
            </div>
            <div className="wrapper">
              { (!products.length)
                ? <p>Loading...</p>
                : <div className="flex-container">
                    { (products.length) && filteredProducts.map((product => {
                      return (
                        <div key={product.id}>
                          <Link to={`/products/${+product.id}`}>
                            <img src={product.imageUrl} />
                          </Link>
                          <div className="all-product-desc">
                            <div>
                              <div className="uppercase-bold">{product.brand && product.brand.name}</div>
                              <div>
                                <Link to={`/products/${+product.id}`}>
                                  {product.name}
                                </Link>
                              </div>
                              {
                                (product.reviews) && (product.reviews.length)
                                ? <div> { Math.round((((product.reviews.reduce((a, b) => a + b.rating, 0)) / product.reviews.length) * 100) / 100)} Star Review </div>
                                : <div>No reviews</div>
                              }
                              <div>
                                ${product.prices && product.prices.length && (product.prices[product.prices.length - 1].price)}
                              </div>
                            </div>
                            <button
                              value={product.id}
                              onClick={this.props.handleAddToCart}>
                              Add to Cart 🔥
                            </button>
                          </div>
                        </div>
                      )}))
                    }
                  </div>
              }
              {
                (isAdmin)
                ? <ProductForm products={products} props={this.props} />
                : <div />
              }
            </div>
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
