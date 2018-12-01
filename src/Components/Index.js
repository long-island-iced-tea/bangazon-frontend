import React from 'react';
import { Link } from 'react-router-dom';

function indexButton (props) {
  return <button>${this.props.title}</button>;
}


class Navbar extends React.Component {
  render () {
    const myTitle = '/' + this.props.title;
    return (
      <Link to={myTitle}>
        <indexButton title={this.props.title}/>
      </Link>
    );
  }
}

export default Navbar;