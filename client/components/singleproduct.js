import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { addItem } from '../store/cart';

export const SingleProduct = (props) => {

  const { products } = props;

  const product = products.filter(product => Number(props.match.params.productId) === product.id)[0];

  return (
    <div>
      { (products.length) &&
        <div>
          <img src={product.imageUrl} />
          <h1>{product.name}</h1>       
          <ul>  
          <p>Tags:</p>      
          { (product.tags.length) && product.tags.map((tag, key) => <li key={key}>{tag}</li>) }
          { (product.prices.length) && product.prices.map((price, key) => <li key={key}><p>Price: {`$${price.price}.00`}</p></li>) }
          </ul>
          <button value={product.id} onClick={props.handleAddToCart}>Add To Cart</button>
        </div>
      }
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
