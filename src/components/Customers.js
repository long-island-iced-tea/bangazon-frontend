import React from 'react';
import ResourceList from './ResourceList/ResourceList';
import AddItemForm from './AddItemForm/AddItemForm';
import apiAccess from '../api-access';

class customerPage extends React.Component {
    state = {
      customers: []
    }
    customerModel = {
      Id: 0,
      FirstName: '',
      lastName: '',
      DepartmentId: 0,
      ComputerId: 0,
      DepartmentName: ''
    }
    getcustomers = () => {
      apiAccess.ApiGet('customers')
        .then(res => {
          this.setState({customerModel: res.data});
        });
    }
    addcustomer = (newCustomer) => {
      apiAccess
        .apiPost('customer/customer', newCustomer)
        .then(res => {
          this.getcustomers();
        });
    }
    deletecustomer = (id) => {
      apiAccess
        .apiDelete('customer/' + id)
        .then(res => {
          this.getcustomers();
        });
    }
    editcustomer = (newcustomer) => {
      apiAccess
        .apiPut('customer', newcustomer)
        .then(res => {
          this.getcustomers();
        });
    };
    componentDidMount () {
      this.getcustomers();
    }
    render () {
      return (
        <div className='customersPage'>
          <ResourceList resources={this.state.customers} deleteFunc={this.deletecustomer} editFunc={this.editcustomer}/>
          <AddItemForm objectModel={this.customerModel} addFunc={this.addcustomer}/>
        </div>
      );
    }
}

export default customerPage;