import React, { Component } from 'react';
import {connect } from 'react-redux';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <p>Your cart:</p>
      </div>
    )
  }
}

const mapStateToProps = null;
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
