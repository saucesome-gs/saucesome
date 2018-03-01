import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

export const SingleProduct = (props) => {

  const { products } = props;

  const product = products.filter(product => Number(props.match.params.productId) === product.id)[0];

  return (
    <div>
      { (products.length) &&
        <div>
          <img src={product.imageUrl} />
          <h1>{product.name}</h1>
          <button>Add To Cart</button>
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

const mapDispatchToProps = null;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleProduct));
