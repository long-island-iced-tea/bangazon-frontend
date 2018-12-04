import React from 'react';
import ResourceList from '../ResourceList/ResourceList';
import AddItemForm from '../AddItemForm/AddItemForm';
import apiAccess from '../../api-access/api';

class customerPage extends React.Component {
    state = {
      customers: []
    }

    customerModel = {
      id: 0,
      firstName: '',
      lastName: '',
      departmentId: 0,
      createdAt: '',
      isActive: false
    }

    getcustomers = () => {
      apiAccess.apiGet('customers')
        .then(res => {
          this.setState({customers: res.data});
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
          <h1>Customers</h1>
          <ResourceList resources={this.state.customers} deleteFunc={this.deletecustomer} editFunc={this.editcustomer}/>
          <AddItemForm objectModel={this.customerModel} addFunc={this.addcustomer}/>
        </div>
      );
    }
}

export default customerPage;