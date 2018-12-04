import React from 'react';
import './SideNav.css';
import NavButton from '../Index';

const buttonTitles = [
  'customer',
  'orders',
  'products',
  'employee',
  'paymenttype',
  'producttype',
  'departments',
  'computers',
  'trainingprogram'
];

class SideNav extends React.Component {
  render () {
    const indexButtons = buttonTitles.map(title => {
      return (
        <li>
          <NavButton title={title}/>
        </li>
      );
    });
    return (
      <div className="sidenav">
        <h1>Side Nav</h1>
        <ul>
          {indexButtons}
        </ul>
      </div>
    );
  }
}

export default SideNav;