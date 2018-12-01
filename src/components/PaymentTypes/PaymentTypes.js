import React from 'react';
import ResourceList from './ResourceList/ResourceList';
import AddItemForm from './AddItemForm/AddItemForm';
import apiAccess from '../api-access';

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
      apiAccess.ApiGet('paymentTypes')
        .then(res => {
          this.setState({paymentTypeModel: res.data});
        });
    }
    addpaymentType = (newpaymentType) => {
      apiAccess
        .apiPost('paymentType/paymentType', newpaymentType)
        .then(res => {
          this.getpaymentTypes();
        });
    }

    deletepaymentType = (id) => {
      apiAccess
        .apiDelete('paymentType/' + id)
        .then(res => {
          this.getpaymentTypes();
        });
    }

    editpaymentType = (newPaymentType) => {
      apiAccess
        .apiPut('paymentType', newPaymentType)
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
          <ResourceList resources={this.state.paymentTypes} deleteFunc={this.deletepaymentType} editFunc={this.editpaymentType}/>
          <AddItemForm objectModel={this.paymentTypeModel} addFunc={this.addpaymentType}/>
        </div>
      );
    }
}
export default paymentTypePage;