import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { EditForm, ReviewForm } from './';
import { addItem } from '../store/cart';
import { me, addItemToDb } from '../store';

export const SingleProduct = (props) => {

  const { products, isAdmin } = props;

  const product = products.find(product => Number(props.match.params.productId) === product.id);

  return (


    <div>
    {
      (product.quantity > 0) && (products.length) ?
      <div>
        { (products.length) &&
          <div>
            <img src={product.imageUrl} />
            <h3>{product.brand.name}</h3>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <div>
              {
                `$${product.prices[product.prices.length - 1].price}`
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
              onClick={props.handleAddToCart}>
              Add To Cart
            </button>
            <ReviewForm user={props} />
            <ul>
       {product.reviews.map(review => <li key={review.id}>{review.body}</li>) }
      </ul>
          </div> }
        {(isAdmin) ? <EditForm productId = {product.id} /> : <div></div> }
      </div> :
      <div>
        <img className="grayscale" src={product.imageUrl} />
        <h1>Currently Unavailable</h1>
      </div>
    
    }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    products: state.products,
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
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleProduct));

