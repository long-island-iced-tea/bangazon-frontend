import React from 'react';
import './SideNav.css';
import NavButton from '../Index';

const buttonTitles = [
  'Customer',
  'Orders',
  'Products',
  'Employee',
  'Payment Type',
  'Product Type',
  'Departments',
  'Computers',
  'Training Program'
];

class SideNav extends React.Component {
  render () {
    const indexButtons = buttonTitles.map(title => {
      return (
        <p>
          <NavButton title={title}/>
        </p>
      );
    });
    return (
      <div className="sidenav">
        <p>
          {indexButtons}
        </p>
      </div>
    );
  }
}

export default SideNav;