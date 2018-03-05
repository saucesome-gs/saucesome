import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class SingleOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderItems: []
    }
  }

  getOrderItems() {
    let orderItems;
    const selectedOrderId = this.props.match.params.orderId;
    axios.get(`/api/past-orders/order/${selectedOrderId}`)
    .then((orderItemData) => orderItemData.data)
    .then((formattedItems) => {
      orderItems = formattedItems.map(item => item.product);
      return orderItems;
    })
    .then((res) => {
      this.setState({
        orderItems: res
      })
    })
    .then(() => console.log('state is ', this.state))
    .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getOrderItems();
  }

  render() {
    console.log('state order items are in render ', this.state.orderItems)
    return (
      <div>
        <div>
          Order #{this.props.match.params.orderId}
        </div>
        {
          this.state.orderItems.map(item => (<p>Item here</p>))
        }
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    products: state.products,
    pastOrders: state.pastOrders,
    isLoggedIn: !!state.user.id
  }

}


export default withRouter(connect(mapStateToProps, null)(SingleOrder));
