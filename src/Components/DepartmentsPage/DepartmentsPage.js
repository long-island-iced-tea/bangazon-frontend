import React from 'react';
//import './DepartmentsPage.css';
import apiAccess from '../../api-access/api';
import ResourceList from '../ResourceList/ResourceList';
import AddItemForm from '../AddItemForm/AddItemForm';
import Alert from 'react-s-alert';


class DepartmentsPage extends React.Component {

  state = {
    items: [],
    objectModel: {
      id: 0,
      name: '',
      budget: '',
      supervisorId: []
    }
  }

  componentDidMount() {
    this.getItems();
    this.getEmployees();
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
    Alert.error('This resource type cannot be deleted.', {
      position: 'top-right',
          effect: 'stackslide',
          timeout: 4000
    });
  }
  editDepartments = (newDepartments) => {
    apiAccess
      .apiPut('department', newDepartments)
      .then(res => {
        this.getItems();
      });
  };
  getEmployees = () => {
    apiAccess
      .apiGet('employee')
      .then(res => {
        const {objectModel} = {...this.state};
        objectModel.supervisorId = res.data.map(e => e.id);
        this.setState({objectModel});
      })
  }

  render () {
    return (
      <div className='DepartmentsPage'>
        <h1>Departments</h1>
        <ResourceList resources={this.state.items} deleteFunc={this.deleteItem} editFunc={this.editDepartments} objectModel={this.state.objectModel}/>

        <AddItemForm objectModel={this.state.objectModel} addFunc={this.addItem} />
      </div>
    );
  }
};

export default DepartmentsPage;
