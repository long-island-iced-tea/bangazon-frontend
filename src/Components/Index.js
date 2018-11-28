import React from 'react';
import {Link} from 'react-router-dom';

import authRequests from  '../../firebaseRequests/auth';

import './Navbar.css';

class Navbar extends React.Component {
  render () {


    return (
      <h1>INDEX</h1>
      <ul>
        <li class="">Customers</li>
        <li class="">Employees</li>
        <li class="">Products</li>
        <li class="">Computers</li>
        <li class="">Departments</li>
        <li class="">Orders</li>
        <li class="">Payment Types</li>
        <li class="">Product Types</li>
        <li class="">Training Programs</li>
      </ul>
    );
  }
}

export default Navbar;