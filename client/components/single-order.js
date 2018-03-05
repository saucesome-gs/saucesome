import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

class SingleOrder extends Component {
  render() {
    return (<div>Single order here</div>)
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    order: state.order,
    pastOrders: state.pastOrders,
    isLoggedIn: !!state.user.id
  }

}

const mapDispatchToProps = null;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllOrders));
