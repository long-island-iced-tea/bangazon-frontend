import React from 'react';
import './ResourceList.css';
import ResourceItem from '../ResourceItem/ResourceItem';

class ResourceList extends React.Component {
  render () {
    const {editFunc, deleteFunc} = this.props;
    const tableHeaders = Object.keys(this.props.objectModel).map(p => {
      return (<th key={p}>{p}</th>)
    });
    const resourceItems = this.props.resources.map(r => {
      return <ResourceItem key={r.id} item={r} editFunc={editFunc} deleteFunc={deleteFunc} />
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
