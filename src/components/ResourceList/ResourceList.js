import React from 'react';
import './ResourceList.css';
import ResourceItem from '../ResourceItem/ResourceItem';
import PropTypes from 'prop-types';

class ResourceList extends React.Component {

  static propTypes = {
    resources: PropTypes.arrayOf(PropTypes.object).isRequired,
    editFunc: PropTypes.func.isRequired,
    deleteFunc: PropTypes.func.isRequired,
  }

  render () {
    const {resources, editFunc, deleteFunc} = this.props;

    const tableHeaders = Object.keys(resources[0]).map(p => {
      return (<th key={p}>{p}</th>);
    });

    const resourceItems = resources.map(r => {
      return (<ResourceItem key={r.id} item={r} editFunc={editFunc} deleteFunc={deleteFunc} />);
    });

    return (
      <table className='ResourceList table'>
        <thead>
          <tr>
            {tableHeaders}
          </tr>
        </thead>
        <tbody>
          {resourceItems}
        </tbody>
      </table>
    );
  }
};

export default ResourceList;
