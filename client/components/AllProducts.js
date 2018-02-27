import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

function AllProducts (props) {
  
  const { products } = props;

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

const mapSateToProps = (state) => {
  return {
    
  }
}
