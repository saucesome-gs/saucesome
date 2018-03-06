import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { postProduct } from '../store/product'

const initialState = {
  name: '',
  description: '',
  ingredients: '',
  size: '',
  spiciness: 0,
  quantity: 0,
  price: 0,
  imageUrl: '',
  tags: []
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
          <input
            name = "name"
            onChange = {this.handleChange}
            value = {this.state.name}
            placeholder = "Sauce name"
            type = "text"
            required
          />
          <label>Description: </label>
          <input
            name = "description"
            onChange = {this.handleChange}
            value = {this.state.description}
            placeholder = "Sauce description"
            type = "text"
            required
          />
          <label>Ingredients: </label>
          <input
            name = "ingredients"
            onChange = {this.handleChange}
            value = {this.state.ingredients}
            placeholder = "Sauce ingredients"
            type = "text"
            required
          />
          <label>Size: </label>
          <input
            name = "size"
            onChange = {this.handleChange}
            value = {this.state.size}
            placeholder = "Sauce size"
            type = "text"
            required
          />
          <label>Spiciness: </label>
          <input
            name = "spiciness"
            onChange = {this.handleChange}
            value = {this.state.spiciness}
            placeholder = "9000"
            type = "number"
            min = "1"
            required
          />
          <label>Quantity: </label>
          <input
            name = "quantity"
            onChange = {this.handleChange}
            value = {this.state.quantity}
            placeholder = "1"
            type = "number"
            min = "1"
            required
          />
           <label>Price: </label>
          <input
            name = "price"
            onChange = {this.handleChange}
            value = {this.state.price}
            placeholder = "Price"
            type = "number"
            required
          />
          <label>ImageUrl: </label>
          <input
            name = "imageUrl"
            onChange = {this.handleChange}
            value = {this.state.imageUrl}
            placeholder = "url"
            type = "url"
            required
          />
          <label>Tags: </label>
          <input
            name = "tags"
            onChange = {this.handleChange}
            value = {this.state.tags}
            placeholder = "hot"
            type = "string"
            required
          />
          <button type = "submit"> Add Sauce </button>
        </form>
      </div>
    )
  }

  handleSubmit(event){
    // const products = this.props.products;
    // const numberPrices = products.prices.length;
    event.preventDefault()
    // console.log("this is the target:", event.target)
    let temp = (event.target.tags.value).split(',')
    // const price = event.target.price.value;
    const info = {
      name: event.target.name.value,
      description: event.target.description.value,
      ingredients: event.target.ingredients.value,
      size: event.target.size.value,
      spiciness: event.target.spiciness.value,
      quantity: event.target.quantity.value,
      price: event.target.price.value,
      imageUrl: event.target.imageUrl.value,
      tags: temp,
      // prices: [{id: numberPrices, price: 10}],
      brandId: 1
    }
    const products = this.props.props.products;
    this.props.postProduct(info)
    .then(() => this.props.props.history.push(`/products/${products.length + 1}`))
    //this.props.props.history.push(`/products/${products.length + 1}`)
  }

  handleChange(event){
    const { target } = event;
    const {name, value} = target;
    this.setState({
      [name]: value,
    })
  }
}

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => {
  return {
    postProduct: product => dispatch(postProduct(product))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductForm));
