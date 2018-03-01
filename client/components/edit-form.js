import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { postProduct, putProduct } from '../store/product'

export class EditForm extends Component {
  constructor(props) {
    super(props)
      this.postProduct = this.postProduct.bind(this);
  }

  render() {
  return (
    <div>
      <button type = "button" onClick = {() => putProduct()}> Edit Product </button>
    </div>
  )
}
}

