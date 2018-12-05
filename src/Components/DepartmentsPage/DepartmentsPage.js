import React from 'react';
import './DepartmentsPage.css';
import apiAccess from '../../api-access/api';
import ResourceList from '../ResourceList/ResourceList';
import AddItemForm from '../AddItemForm/AddItemForm';

const objectModel = {
  id: 0,
  name: '',
  budget: '',
  supervisorId: 0
};

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

  addItem = (newItem) => {
    apiAccess.apiPost('department', newItem)
      .then(res => {
        this.getItems();
      });
  }

  editDepartments = (newDepartments) => {
    apiAccess
      .apiPut('departments', newDepartments)
      .then(res => {
        this.getItems();
      });
  };

  render () {
    return (
      <div className='DepartmentsPage'>
        <ResourceList resources={this.state.items} />
        <AddItemForm objectModel={objectModel} addFunc={this.addItem} />
      </div>
    );
  }
};

export default DepartmentsPage;
