import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import {EditForm} from './';
import { addItem } from '../store/cart';

export const SingleProduct = (props) => {

  const { products, isAdmin } = props;

  const product = products.find(product => Number(props.match.params.productId) === product.id);

  console.log('params -->', props.match.params.productId)

  console.log('products -->', products)

  // console.log('singleProduct -->', product.prices[product.prices.length - 1].price)

  console.log('singleProduct -->', product)

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
              product.tags.map( (tag, key) => <li key={key}>#{tag}</li> )
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
    products: state.products
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addItem(id) {
      dispatch(addItem(id));
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleProduct));



// <ul>
// <p>Tags:</p>
// {
//   product.tags.length && product.tags.map( (tag, key) => <li key={key}>#{tag}</li> )
// }
// </ul>
// <div>
// {
//   product.prices.length && product.prices.map( (price, key) => <li key={key}><p>Price: {`$${price.price}`}</p></li> )
// }
// </div>
