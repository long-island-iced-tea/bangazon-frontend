import React from 'react';
//import './DepartmentsPage.css';
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

  deleteItem = (id) => {
    alert('This resource type cannot be deleted.');
  }
  editDepartments = (newDepartments) => {
    apiAccess
      .apiPut('department', newDepartments)
      .then(res => {
        this.getItems();
      });
  };

  render () {
    return (
      <div className='DepartmentsPage'>
<<<<<<< HEAD
        <h1>Departments</h1>
        <ResourceList resources={this.state.items} />
=======
        <ResourceList resources={this.state.items} deleteFunc={this.deleteItem} editFunc={this.editDepartments}/>
>>>>>>> master
        <AddItemForm objectModel={objectModel} addFunc={this.addItem} />
      </div>
    );
  }
};

export default DepartmentsPage;
