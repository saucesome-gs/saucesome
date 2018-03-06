import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { EditForm, ReviewForm } from './';
import { addItem } from '../store/cart';
import { me, addItemToDb, fetchProduct } from '../store';

export class SingleProduct extends Component {

  componentDidMount() {
    const productId = this.props.match.params.productId;
    this.props.fetchProduct(productId);
  }

render()
 {

  const { product, isAdmin, isLoggedIn, reviews } = this.props;
  const productReviews = reviews.filter(review => review.productId === product.id);
  return (

    <div>
    {
      (product.quantity) && (product.quantity > 0) ?
      <div>
        { (product) &&
          <div>
            <img src={product.imageUrl} />
            <h3>{product.brand && product.brand.name}</h3>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <div>
              {
                `$${product.prices && product.prices.length && (product.prices[product.prices.length - 1].price)}`
              }
            </div>
            <ul>
              <p>Tags:</p>
              {
                product.tags.map( (tag, key) => <li key={key}><Link to={`/tag/${tag}`}>#{tag}</Link></li> )
              }
            </ul>
            <button
              value={product.id}
              onClick={this.props.handleAddToCart}>
              Add To Cart
            </button>
            {(isLoggedIn) ? <ReviewForm user={this.props} /> : <p>Please <Link to="/login">log in</Link> or <Link to="/signup">sign up</Link> to add a review</p> }
            <ul>
        { product.reviews && product.reviews.map(review => <li key={review.id}>{review.body}</li>) }
        { productReviews && productReviews.map(review => <li key={review.id}>{review.body}</li>) }
      </ul>
          </div> }
        {(isAdmin) ? <EditForm productId = {product.id} props={this.props} /> : <div></div> }
      </div> :
      <div>
        <img className="grayscale" src={product.imageUrl} />
        <h1>Currently Unavailable</h1>
      </div>

    }
    </div>
  )
}
}

const mapStateToProps = state => {
  return {
    reviews: state.reviews,
    product: state.products[0],
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    loadInitialData () {
      dispatch(me())
    },
    addItem(id) {
      dispatch(addItem(id));
    },
    addItemToDb(productId, orderId) {
      dispatch(addItemToDb(productId, orderId));
    },
    fetchProduct (productId) {
      dispatch(fetchProduct(productId));
    }
  }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleProduct));
