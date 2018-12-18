import React from 'react';
import ResourceList from '../ResourceList/ResourceList';
import AddItemForm from '../AddItemForm/AddItemForm';
import apiAccess from '../../api-access/api';
import moment from 'moment';
import Alert from 'react-s-alert';

class customerPage extends React.Component {
    state = {
      customers: [],
      objectModel : {
        id: 0,
        firstName: '',
        lastName: '',
        createdAt: moment(),
        isActive: false
      }
    }


    getcustomers = () => {
      apiAccess.apiGet('customers')
        .then(res => {
          const data = res.data;
          data.forEach(customer => customer.createdAt = moment(customer.createdAt));
          this.setState({customers: data});
        });
    }

    addcustomer = (newCustomer) => {
      apiAccess
        .apiPost('customers', newCustomer)
        .then(res => {
          this.getcustomers();
        });
    }

    deletecustomer = (id) => {
      Alert.error('Customers cannot be deleted.', {
        position: 'top-right',
          effect: 'stackslide',
          timeout: 4000
      });
    }

  editcustomer = (newcustomer) => {
    newcustomer.createdAt = newcustomer.createdAt.format();
      apiAccess
        .apiPut('customers', newcustomer)
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
          <ResourceList resources={this.state.customers} deleteFunc={this.deletecustomer} editFunc={this.editcustomer} objectModel={this.objectModel}/>
          <AddItemForm objectModel={this.state.objectModel} addFunc={this.addcustomer}/>
        </div>
      );
    }
}

export default customerPage;