import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';


export class SearchForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = event.target.value
    this.setState({
      title: value
    })
  }

  render() {
    const title = this.state.title;
    const products = this.props.products;
    console.log(title);
    
    return (
    <form>
      <input 
        type="text"
        id="title"
        value={title}
        onChange={this.handleChange}
      />
    </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = null;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchForm));
