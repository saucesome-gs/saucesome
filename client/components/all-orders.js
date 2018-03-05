import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { SearchForm } from './';

class AllOrders extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    const { pastOrders, isAdmin } = this.props;

   return (
    <div>
     <h1>Your orders</h1>
     { isAdmin && <div>Seach by order status: <SearchForm /></div>}
     { (!pastOrders.length) ? <p>You have no orders to display </p> :
       <div>
     { (pastOrders.length) && pastOrders.map((order => {
       return (
         <div key={order.date}>
           <div>
             <div>Order Number: {order.orderId}</div>
             <div>Date: {order.date}</div>
             <div>Status: {order.status}</div>
            <Link to={`/orders/order/${order.orderId}`}>
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
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  }

}

const mapDispatchToProps = null;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllOrders));
