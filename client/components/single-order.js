import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
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
          this.state.orderItems.map(item =>
            (
              <div key={item.id} className="cart-product">
              <a href={`/products/${+item.Id}`}>
                <img src={item.imageUrl} />
              </a>
              <div className="cart-product-info">
                <div>
                  <Link
                    to={`/products/${+item.id}`}>{`${item.name}
                      - product price here `}
                  </Link>
                </div>
                </div>
                </div>
        ))
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
