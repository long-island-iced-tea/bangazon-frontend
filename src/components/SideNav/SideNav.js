import React from 'react';
import './SideNav.css';
import NavButton from '../Index';

// const buttonTitles = ['Customer', 'Orders', 'Product', 'Employee'];

// for (let i = 0; i < buttonTitles.lenth; i++) {
//   return <li>buttonTitles[i]</li>;
// }

class SideNav extends React.Component {
  render () {
    return (
      <div className="sidenav">
        <h1>Side Nav</h1>
        <NavButton
        />
      </div>
    );
  }
}

export default SideNav;