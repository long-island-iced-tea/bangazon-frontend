import React from 'react';
import ResourceList from '../ResourceList/ResourceList';
import AddItemForm from '../AddItemForm/AddItemForm';
import apiAccess from '../../api-access/api';

class paymentTypePage extends React.Component {

    state = {
      paymentTypes: []
    }

    paymentTypeModel = {
      id: 0,
      customerId: 0,
      accountNum: 0,
      type: ''
    };

    getpaymentTypes = () => {
      apiAccess.apiGet('paymenttype')
        .then(res => {
          this.setState({paymentTypes: res.data});
        });
    }
    addpaymentType = (newpaymentType) => {
      apiAccess
        .apiPost('paymenttype', newpaymentType)
        .then(res => {
          this.getpaymentTypes();
        });
    }

    deletepaymentType = (id) => {
      apiAccess
        .apiDelete('paymenttype/' + id)
        .then(res => {
          this.getpaymentTypes();
        });
    }

    editpaymentType = (newPaymentType) => {
      apiAccess
        .apiPut('paymenttype', newPaymentType)
        .then(res => {
          this.getpaymentTypes();
        });
    };

    componentDidMount () {
      this.getpaymentTypes();
    }

    render () {
      return (
        <div className='paymentTypesPage'>
          <h1>Payment Types</h1>
          <ResourceList resources={this.state.paymentTypes} deleteFunc={this.deletepaymentType} editFunc={this.editpaymentType}/>
          <AddItemForm objectModel={this.paymentTypeModel} addFunc={this.addpaymentType}/>
        </div>
      );
    }
}
export default paymentTypePage;