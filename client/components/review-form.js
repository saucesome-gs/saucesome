import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { withRouter, NavLink } from 'react-router-dom';
import { postReview } from '../store/review'

const initialState = {
  rating: 5,
  body: ''
}

export class ReviewForm extends Component {
  constructor(props){
    super(props);
    this.state = initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render () {

    console.log('props', this.props);

    return (
      <div>
        <h2> Review this sauce </h2>
        <form onSubmit = {this.handleSubmit}>
          <label>Rating: </label>
          <input
            name = "rating"
            onChange = {this.handleChange}
            value = {this.state.rating }
            placeholder = "Rating"
            type = "number"
            min = "1"
            max = "5"
            required />
          <label>Body: </label>
          <input
            name = "body"
            onChange = {this.handleChange}
            value = {this.state.body}
            placeholder = "Text here"
            type = "text"
            minLength = "10"
            required />
          <button type = "submit"> Add Review </button>
        </form>
      </div>
    )
  }
  handleSubmit(event){
    event.preventDefault();
    const productId = Number(this.props.user.match.params.productId);
    const userId = this.props.user.user.id;
    const info = {
      rating: event.target.rating.value,
      body: event.target.body.value,
      productId,
      userId
    }
  this.props.postReview(info);
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

const mapDispatchToProps = dispatch => {
  return {
    postReview: review => dispatch(postReview(review))
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(ReviewForm));
