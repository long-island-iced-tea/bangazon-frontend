import React from 'react';
import './ResourceItem.css';
import PropTypes from 'prop-types';


class ResourceItem extends React.Component {

  state = {
    item: this.props.item,
  }

  static propTypes = {
    item: PropTypes.object.isRequired,
    editFunc: PropTypes.func.isRequired,
    deleteFunc: PropTypes.func.isRequired,
  }

  changeValue = (e) => {
    const {item} = {...this.state};
    item[e.target.id] = e.target.value;
    this.setState({item})
  }

  render () {
    const {item, editFunc, deleteFunc} = this.props;

    // Create table data from the values of the item
    const itemProps = Object.entries(item).map((kvp, i) => {

      var v = kvp[1];
      var k = kvp[0];

      if (Array.isArray(v)) {
        return (<td key={i}>{'Count: ' + v.length}</td>);
      } else if (typeof v === 'object' && !Array.isArray(v)) {
        return (<td key={i}>{JSON.stringify(v)}</td>);
      }
      return (
        <td key={i}>
          <input type="text" id={k} value={this.props.item[k]} onChange={this.changeValue}/>
        </td>
      );

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
