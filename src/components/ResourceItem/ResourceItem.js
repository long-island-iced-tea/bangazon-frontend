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
        <td onClick={this.props.editFunc}>EDIT</td>
        <td onClick={this.props.deleteFunc}>DELETE</td>
      </tr>
    );
  }
};

export default ResourceItem;
