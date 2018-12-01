import React from 'react';
import ResourceList from './ResourceList/ResourceList';
import AddItemForm from './AddItemForm/AddItemForm';
import apiAccess from '../api-access';

class EmployeePage extends React.Component {
  state = {
    employeeModel: {
      Id: 0,
      FirstName: '',
      lastName: '',
      DepartmentId: 0,
      ComputerId: 0,
      DepartmentName: ''
    }
  }

  getEmployees = () => {
    apiAccess.ApiGet('employees')
      .then(res => {
        this.setState({employeeModel: res.data});
      });
  }

  addEmployee = (newEmployee) => {
    apiAccess.apiPost('employee/employee', newEmployee)
      .then(res => {
        this.getEmployees();
      });
  }

  deleteEmployee = (id) => {
    apiAccess.apiDelete('employee/' + id)
      .then(res => {
        this.getEmployees();
      });
  }

  editEmployee = (newEmployee) => {
    apiAccess.apiPut('Employee', newEmployee)
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
        <ResourceList resources={this.state.employee} deleteFunc={this.deleteEmployee} editFunc={this.editEmployee}/>
        <AddItemForm addFunc={this.addEmployee}/>
      </div>
    );
  }
}

export default EmployeePage;