import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom';
import { fetchUsersAdmin } from '../store/user-Manage'
export class UserManagement extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){
    this.props.fetchUsersAdmin()
  }
  render(){
    return (
      <div>

        </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUsersAdmin: () => dispatch(fetchUsersAdmin()),
  // addItem: (itemId) => dispatch(addItem(itemId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserManagement));
