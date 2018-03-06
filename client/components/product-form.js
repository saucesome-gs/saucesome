import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { postProduct } from '../store/product'

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
      <hr />
      
        
        <div className="text-center">
        <h2>🔥 Add A New hot Sauce 🔥</h2>
        </div>
        <div className="add-form">
        <form onSubmit = {this.handleSubmit}>
          <div className="form-group">
          <label>Name: </label>
          <input
            name = "name"
            className="form-control"
            onChange = {this.handleChange}
            value = {this.state.name}
            placeholder = "Sauce name"
            type = "text"
            required
          />
          </div>
          <div className="form-group">
          <label>Description: </label>
          <input name = "description"
          className="form-control"
                 onChange = {this.handleChange}
                 value = {this.state.description}
                 placeholder = "Sauce description"
                 type = "text"
                 required />
          </div>
          <div className="form-group">       
          <label>Price: </label>
          <input name = "price"
          className="form-control"
                onChange = {this.handleChange}
                value = {this.state.price}
                placeholder = "Price"
                type= "num"
                required />
          </div>
          <div className="form-group">
          <label>Ingredients: </label>
          <input
            name = "ingredients"
            className="form-control"
            onChange = {this.handleChange}
            value = {this.state.ingredients}
            placeholder = "Sauce ingredients"
            type = "text"
            required
          />
          </div>
          <div className="form-group">
          <label>Size: </label>
          <input
            name = "size"
            className="form-control"
            onChange = {this.handleChange}
            value = {this.state.size}
            placeholder = "Sauce size"
            type = "text"
            required
          />
          </div>
          <div className="form-group">
          <label>Spiciness: </label>
          <input
            name = "spiciness"
            className="form-control"
            onChange = {this.handleChange}
            value = {this.state.spiciness}
            placeholder = "9000"
            type = "number"
            min = "1"
            required
          />
          </div>
          <div className="form-group">
          <label>Quantity: </label>
          <input
            name = "quantity"
            className="form-control"
            onChange = {this.handleChange}
            value = {this.state.quantity}
            placeholder = "1"
            type = "number"
            min = "1"
            required
          />
          </div>
          <div className="form-group">
          <label>ImageUrl: </label>
          <input
            name = "imageUrl"
            className="form-control"
            onChange = {this.handleChange}
            value = {this.state.imageUrl}
            placeholder = "url"
            type = "url"
            required
          />
          </div>
          <div className="form-group tr">
          <label>Tags: </label>
          <input
            name = "tags"
            className="form-control"
            onChange = {this.handleChange}
            value = {this.state.tags}
            placeholder = "hot"
            type = "string"
            required
          />
          </div>
          <div className="fifty-view-width text-center">
          <button type = "submit">Add Hot Sauce 🔥</button>
          </div>
        </form>
      </div>
      </div>
    )
  }

  handleSubmit(event){
    event.preventDefault()
    const temp = (event.target.tags.value).split(',')
    const info = {
      name: event.target.name.value,
      description: event.target.description.value,
      ingredients: event.target.ingredients.value,
      size: event.target.size.value,
      spiciness: event.target.spiciness.value,
      quantity: event.target.quantity.value,
      imageUrl: event.target.imageUrl.value,
      tags: temp,
      brandId: 1,
      price: event.target.price.value

    }
  const that = this.props.props;
  this.props.postProduct(info, that)
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    postProduct: product => dispatch(postProduct(product, ownProps))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductForm));
