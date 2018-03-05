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

  getItemsInfo() {
    let orderItems, itemPrices;
    const selectedOrderId = this.props.match.params.orderId;
    axios.get(`/api/past-orders/order/${selectedOrderId}`)
    .then((orderItemData) => orderItemData.data)
    .then((formattedItems) => {
      itemPrices = formattedItems.map(item => item.price.price);
      orderItems = formattedItems.map(item => item.product);
      for (var i = 0; i < orderItems.length; i++) {
        orderItems[i].price = itemPrices[i];
      }
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
    this.getItemsInfo();
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
                      - $${item.price}`}
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
