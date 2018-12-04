import React from 'react';
import './ResourceItem.css';
import PropTypes from 'prop-types';


class ResourceItem extends React.Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    editFunc: PropTypes.func.isRequired,
    deleteFunc: PropTypes.func.isRequired,
  }

  render () {
    const {item, editFunc, deleteFunc} = this.props;

    // Create table data from the values of the item
    const itemProps = Object.values(item).map(v => {
      return (<td key={v}>{v}</td>);
    });

    return (
      <tr className='ResourceItem'>
        {itemProps}
        <td onClick={editFunc}>
          <i className="fas fa-edit"></i>
        </td>
        <td onClick={deleteFunc}>
          <i className="fas fa-minus-circle"></i>
        </td>
      </tr>
    );
  }
};

export default ResourceItem;
