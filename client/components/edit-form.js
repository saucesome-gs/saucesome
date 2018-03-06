import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { withRouter, NavLink } from 'react-router-dom';
import { putProduct } from '../store/product'

const initialState = {
  name: '',
  description: '',
  ingredients: '',
  size: '',
  spiciness: 0,
  quantity: 0,
  imageUrl: '',
  tags: [],
  price: 0
}

export class EditForm extends Component {
  constructor(props) {
    super(props)
    this.state = initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this)
    }

    render () {
      return (
        <div>
          <h2> Spice it or splice it </h2>
          <form onSubmit = {this.handleSubmit}>
            <label>Name: </label>
            <input name = "name"
                   onChange = {this.handleChange}
                   value = {this.state.name}
                   placeholder = "Sauce name"
                   type= "text"
                   />
            <label>Description: </label>
            <input name = "description"
                   onChange = {this.handleChange}
                   value = {this.state.description}
                   placeholder = "Sauce description"
                   type = "text"
                   />
            <label>Ingredients: </label>
            <input name = "ingredients"
                   onChange = {this.handleChange}
                   value = {this.state.ingredients}
                   placeholder = "Sauce ingredients"
                   type= "text"
                   />
            <label>Size: </label>
            <input name = "size"
                   onChange = {this.handleChange}
                   value = {this.state.size}
                   placeholder = "Sauce size"
                   type= "text"
                   />
            <label>Spiciness: </label>
            <input name = "spiciness"
                   onChange = {this.handleChange}
                   value = {this.state.spiciness}
                   placeholder = "9000"
                   type= "number"
                   min = "1"
                   />
            <label>Quantity: </label>
            <input name = "quantity"
                   onChange = {this.handleChange}
                   value = {this.state.quantity}
                   placeholder = "1"
                   type= "number"
                   min = "1"
                   />
            <label>ImageUrl: </label>
            <input name = "imageUrl"
                   onChange = {this.handleChange}
                   value = {this.state.imageUrl}
                   placeholder = "url"
                   type= "url"
                   />
            <label>Tags: </label>
            <input name = "tags"
                   onChange = {this.handleChange}
                   value = {this.state.tags}
                   placeholder = "hot"
                   type= "string"
                   />
            <label>Price: </label>
            <input name = "price"
                   onChange = {this.handleChange}
                   value = {this.state.price}
                   placeholder = "0"
                   type= "number"
                   min = "0"
                   />
            <button type = "submit"> Edit Sauce </button>
          </form>
        </div>
      )
    }
    handleSubmit(event){
      event.preventDefault()
      const temp = (event.target.tags.value).split(',')
      const info = {
        id: this.props.productId,
        name: event.target.name.value,
        description: event.target.description.value,
        ingredients: event.target.ingredients.value,
        size: event.target.size.value,
        spiciness: event.target.spiciness.value,
        quantity: event.target.quantity.value,
        imageUrl: event.target.imageUrl.value,
        price: event.target.price.value,
        tags: temp,
        brandId: 1,
      }
    const that = this.props.props;
    this.props.putProduct(info, that);
    }
    handleChange(event){
      const { target } = event;
      const {name, value} = target;

      this.setState({
        [name] : value,
      })
    }
  }

const mapStateToProps = null;

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    putProduct: product => dispatch(putProduct(product, ownProps))
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(EditForm));


