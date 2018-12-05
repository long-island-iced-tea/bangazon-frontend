import React from 'react';
//import './EmployeePage.css';
import ResourceList from '../ResourceList/ResourceList';
import AddItemForm from '../AddItemForm/AddItemForm';
import apiAccess from '../../api-access/api';

class EmployeePage extends React.Component {
  state = {
    employees: []
  }

  employeeModel = {
    Id: 0,
    FirstName: '',
    lastName: '',
    DepartmentId: 0,
    ComputerId: 0,
    DepartmentName: ''
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
    alert('Employees cannot be deleted.');
  }

  editEmployee = (newEmployee) => {
    apiAccess
      .apiPut('Employee', newEmployee)
      .then(res => {
        this.getEmployees();
      });
  };

  componentDidMount () {
    this.getEmployees();
  }

  render () {
    return (
      <div className='EmployeesPage'>
        <h1>Employees</h1>
        <ResourceList resources={this.state.employees} deleteFunc={this.deleteEmployee} editFunc={this.editEmployee}/>
        <AddItemForm objectModel={this.employeeModel} addFunc={this.addEmployee}/>
      </div>
    );
  }
}

export default EmployeePage;
