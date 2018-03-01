import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { withRouter, NavLink } from 'react-router-dom';
import { postProduct } from '../store/product'

const initialState = {
  name: '',
  description: '',
  ingredients: '',
  size: '',
  spiciness: 0,
  quantity: 0,
  imageUrl: ''

}

export class ProductForm extends Component {
  constructor(props){
    super(props);
    this.state = initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
                 required/>
          <label>Description: </label>
          <input name = "description"
                 onChange = {this.handleChange}
                 value = {this.state.description}
                 placeholder = "Sauce description"
                 type = "text"
                 required/>
          <label>Ingredients: </label>
          <input name = "ingredients"
                 onChange = {this.handleChange}
                 value = {this.state.ingredients}
                 placeholder = "Sauce ingredients"
                 type= "text"
                 required/>
          <label>Size: </label>
          <input name = "size"
                 onChange = {this.handleChange}
                 value = {this.state.size}
                 placeholder = "Sauce size"
                 type= "text"
                 required/>
          <label>Spiciness: </label>
          <input name = "spiciness"
                 onChange = {this.handleChange}
                 value = {this.state.spiciness}
                 placeholder = "9000"
                 type= "number"
                 min = "1"
                 required/>
          <label>Quantity: </label>
          <input name = "quantity"
                 onChange = {this.handleChange}
                 value = {this.state.quantity}
                 placeholder = "1"
                 type= "number"
                 min = "1"
                 required/>
          <label>ImageUrl: </label>
          <input name = "imageUrl"
                 onChange = {this.handleChange}
                 value = {this.state.imageUrl}
                 placeholder = "https://cdn3.volusion.com/kceqm.mleru/v/vspfiles/photos/708-2.jpg?1515658247"
                 type= "url"
                 required/>
          <button type = "submit"> Add Sauce </button>
        </form>
      </div>
    )
  }
  handleSubmit(event){
    event.preventDefault()
    const info = {
      name: event.target.name.value,
      description: event.target.description.value,
      ingredients: event.target.ingredients.value,
      size: event.target.size.value,
      spiciness: event.target.spiciness.value,
      quantity: event.target.quantity.value,
      imageUrl: event.target.imageUrl.value
    }
  this.props.postProduct(info);
  console.log('working')
  }
  handleChange(event){
    const { target } = event;
    const {name , value} = target;

    this.setState({
      [name] : value,
    })
  }
}

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => {
  return {
    postProduct: product => dispatch(postProduct(product))
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(ProductForm));
