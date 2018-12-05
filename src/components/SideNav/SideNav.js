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
        <p>
          <NavButton title={title}/>
        </p>
      );
    });
    return (
      <div className="sidenav">
        {/* <h1>Side Nav</h1> */}
        <p>
          {indexButtons}
        </p>
      </div>
    );
  }
}

export default SideNav;