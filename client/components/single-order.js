import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

function SingleOrder() {
    return (<div>Single order here</div>)
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleOrder));
