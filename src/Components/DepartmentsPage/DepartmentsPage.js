import React from 'react';
import './DepartmentsPage.css';
import apiAccess from '../../api-access/api';
import ResourceList from '../ResourceList/ResourceList';

class DepartmentsPage extends React.Component {

  state = {
    items: []
  }

  componentDidMount() {
    this.getItems();
  }

  getItems = () => {
    apiAccess.apiGet('department')
      .then(res => {
        this.setState({items: res.data});
      });
  }
  render () {
    return (
      <div className='DepartmentsPage'>
        <ResourceList resources={this.state.items} />
      </div>
    );
  }
};

export default DepartmentsPage;
