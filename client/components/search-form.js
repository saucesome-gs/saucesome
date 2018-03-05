import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchOrdersByStatus, fetchAllOrders } from '../store';


export class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    if (value === 'all orders') {
      this.props.fetchAllOrders();
    } else {
      this.props.fetchOrdersByStatus(value);
    }
  }

  render() {

    return (
    <form
    onChange={this.handleChange}>
    <select>
      <option>Search by order status:</option>
      <option>all orders</option>
      <option>pending</option>
      <option>purchased</option>
      <option>shipped</option>
    </select>
    </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    pastOrders: state.pastOrders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchOrdersByStatus: (status =>
    dispatch(fetchOrdersByStatus(status))),
  fetchAllOrders: () => dispatch(fetchAllOrders())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchForm));
