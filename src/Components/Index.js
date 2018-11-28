import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  render () {

    return (
      <div>
        <h1>INDEX</h1>
        <ul class="navbar">
          <li>
            <Link to="/Customers">
              Customers
            </Link>
          </li>
          <li>
            <Link to="/Employees">
              Employees
            </Link>
          </li>
          <li>
            <Link to="/Products">
              Products
            </Link>
          </li>
          <li>
            <Link to="/Computers">
              Computers
            </Link>
          </li>
          <li>
            <Link to="/Departments">
              Departments
            </Link>
          </li>
          <li>
            <Link to="/Orders">
              Orders
            </Link>
          </li>
          <li>
            <Link to="PaymentTypes">
            Payment Types
            </Link>
          </li>
          <li>
            <Link to="ProductTypes">
            Product Types
            </Link>
          </li>
          <li>
            <Link to="TrainingPrograms">
            Training Programs
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;