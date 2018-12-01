import React from 'react';
import { Link } from 'react-router-dom';

function indexButton (props) {
  return <button>${this.props.title}</button>;
}


class Navbar extends React.Component {
  render () {

    return (
      <Link to="">
        <indexButton title={this.props.title}/>
      </Link>
    );
  }
}

export default Navbar;