import React from 'react';
import { Link } from 'react-router-dom';

function indexButton(title) {
  return (<p>{`${title}`}</p>);
}


class Navbar extends React.Component {

  button = indexButton(this.props.title);
  render () {
    const myTitle = '/' + this.props.title;
    return (
      <Link className = "custom btn btn-secondary"  to={myTitle}>
        {this.button}
      </Link>
    );
  }
}

export default Navbar;