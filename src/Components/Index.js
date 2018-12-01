import React from 'react';
import { Link } from 'react-router-dom';

function indexButton(title) {
  return (<button>{`${title}`}</button>);
}


class Navbar extends React.Component {

  button = indexButton(this.props.title);
  render () {
    const myTitle = '/' + this.props.title;
    return (
      <Link className="btn btn-primary" to={myTitle}>
        {this.button}
      </Link>
    );
  }
}

export default Navbar;