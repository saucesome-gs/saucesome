import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

class AllOrders extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    const { pastOrders } = this.props;
    // const filteredOrders = this.props.orders.filter(order => (filteredOrders.name.toLowerCase().match(value) || filteredOrders.brand.name.toLowerCase().match(value)) && filteredOrders.quantity > 0)

   return (
    <div>
     <h1>Your orders</h1>
     { (!pastOrders.length) ? <p>You have no orders to display </p> :
       <div>
     { (pastOrders.length) && pastOrders.map((order => {
       return (
         <div key={order.id}>
           {/* <a href=add single order view here> */}
           {/* </a> */}
           <div>
             <div>Order Number: {order.orderId}</div>
             <div>Date: {order.date}</div>
             <div>Status: {order.status}</div>
            <Link to={`/order/${order.orderId}`}>
           <button>
             View Order
           </button>
           </Link>
         </div>
         </div>
       )}
     ))
   }
   </div>
 }
   </div>
   )
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
