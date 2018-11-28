import React from 'react';
import './ResourceList.css';
import ResourceItem from '../ResourceItem/ResourceItem';

class ResourceList extends React.Component {
  render () {
    const tableHeaders = Object.keys(this.props.objectModel).map(p => {
      return (<th key={p}>{p}</th>)
    });
    const resourceItems = this.props.resources.map(r => {
      return <ResourceItem key={r.id} item={r} />
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
