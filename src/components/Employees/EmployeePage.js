import React from 'react';
//import './EmployeePage.css';
import ResourceList from '../ResourceList/ResourceList';
import AddItemForm from '../AddItemForm/AddItemForm';
import apiAccess from '../../api-access/api';
import Alert from 'react-s-alert';
class EmployeePage extends React.Component {

  state = {
    employees: [],
    objectModel: {
      id: 0,
      firstName: '',
      lastName: '',
      departmentId: [],
      computerId: [],
      departmentName: ''
    }
  }

  getEmployees = () => {
    apiAccess
      .apiGet('employee')
      .then(res => {
        this.setState({employees: res.data});
      });
  }

  addEmployee = (newEmployee) => {
    apiAccess
      .apiPost('employee/employee', newEmployee)
      .then(res => {
        this.getEmployees();
      });
  }

  deleteEmployee = () => {
    Alert.error('Employees cannot be deleted.', {
      position: 'top-right',
          effect: 'stackslide',
          timeout: 4000
    });
  }

  editEmployee = (newEmployee) => {
    apiAccess
      .apiPut('Employee', newEmployee)
      .then(res => {
        this.getEmployees();
      });
  }
  getDepartments = () => {
    apiAccess
      .apiGet('department')
      .then(res => {
        const {objectModel} = {...this.state};
        objectModel.departmentId = res.data.map(i => i.id);
        this.setState({objectModel});
      });
  }
  getComputers = () => {
    apiAccess
      .apiGet('computer')
      .then(res => {
        const {objectModel} = {...this.state};
        objectModel.computerId = res.data.map(i => i.id);
        this.setState({objectModel});
      });
  }


  componentDidMount () {
    this.getEmployees();
    this.getDepartments();
    this.getComputers();
  }

  render () {
    return (
      <div className='EmployeesPage'>
        <h1>Employees</h1>
        <ResourceList resources={this.state.employees} deleteFunc={this.deleteEmployee} editFunc={this.editEmployee} objectModel={this.state.objectModel}/>
        <AddItemForm objectModel={this.state.objectModel} addFunc={this.addEmployee}/>
      </div>
    );
  }
}

export default EmployeePage;
