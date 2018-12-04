import React from 'react';
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
        this.setState({employeeModel: res.data});
      });
  }

  addEmployee = (newEmployee) => {
    apiAccess
      .apiPost('employee/employee', newEmployee)
      .then(res => {
        this.getEmployees();
      });
  }

  deleteEmployee = (id) => {
    apiAccess
      .apiDelete('employee/' + id)
      .then(res => {
        this.getEmployees();
      });
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
        <ResourceList resources={this.state.employees} deleteFunc={this.deleteEmployee} editFunc={this.editEmployee}/>
        <AddItemForm objectModel={this.employeeModel} addFunc={this.addEmployee}/>
      </div>
    );
  }
}

export default EmployeePage;
