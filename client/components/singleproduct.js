import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { EditForm } from './';
import { addItem } from '../store/cart';
import { addItemToDb } from '../store';

export const SingleProduct = (props) => {

  const { products, isAdmin } = props;

  const product = products.find(product => Number(props.match.params.productId) === product.id);

  return (
    <div>
      {(products.length) &&
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
        </div>
      }
       {(isAdmin) ? <EditForm productId = {product.id} /> : <div></div>}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    products: state.products,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addItem(id) {
      dispatch(addItem(id));
    },
    addItemToDb(productId, orderId) {
      dispatch(addItemToDb(productId, orderId));
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleProduct));

