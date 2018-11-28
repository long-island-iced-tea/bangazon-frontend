import React from 'react';
import './ResourceItem.css';

class ResourceItem extends React.Component {
  render () {
    const itemProps = Object.values(this.props.item).map(v => {
      return (<td key={v}>{v}</td>);
    });
    return (
      <tr className='ResourceItem'>
        {itemProps}
        <td>EDIT</td>
        <td>DELETE</td>
      </tr>
    );
  }
};

export default ResourceItem;
