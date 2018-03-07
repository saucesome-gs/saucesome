import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter} from 'react-router-dom';
import { fetchUsersAdmin, updateUserAdmin, deleteUserAdmin } from '../store/users-Manage'
export class UserManagement extends Component {
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount(){
    this.props.fetchUsersAdmin()
  }
  handleChange(event){
    event.preventDefault();
    console.log("event:",event.target.value,"this:",this.props)
    const info = {
      id: this.props.userId,
      isAdmin: event.target.value
    }
    this.props.updateUserAdmin(info);
  }
  handleDelete(event){
    event.preventDefault();
    console.log(event)
   // this.props.deleteUserAdmin(user.id)
  }
  render(){
    const users = this.props.users
    console.log("the props", this.props)
    return (
      <div>
        <h1> List of Users </h1>
        {
          users.map(user => {
            return(
              <div key = {user.id}>
              {user.email}
              {/* {(user.isAdmin) ? <div> User is an Admin </div> : <div>User is Not an Admin</div> } */}
                <form onChange={this.handleChange}>
                <label>
                  User is an Admin:
                  <select value={user.isAdmin}>
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </select>
                </label>
              </form>
              <form onSubmit = {this.handleDelete}>
              <button type = "submit"> Delete User </button>
              </form>
              </div>
            )
          })
        }
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
  updateUserAdmin: (user) => dispatch(updateUserAdmin(user)),
  deleteUserAdmin: (userId) => dispatch(deleteUserAdmin(userId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserManagement));
