import React from 'react';
import ResourceList from '../ResourceList/ResourceList';
import AddItemForm from '../AddItemForm/AddItemForm';
import apiAccess from '../../api-access/api';

class paymentTypePage extends React.Component {

    state = {
      paymentTypes: [],
      objectModel: {
        id: 0,
        customerId: [],
        accountNum: 0,
        type: ''
      }
    }

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
    getCustomers = () => {
      apiAccess
        .apiGet('customers')
        .then(res => {
          const {objectModel} = {...this.state};
          objectModel.customerId = res.data.map(i => i.id);
          this.setState({objectModel});
        });
    }
    componentDidMount () {
      this.getpaymentTypes();
      this.getCustomers();
    }

    render () {
      return (
        <div className='paymentTypesPage'>
          <h1>Payment Types</h1>
          <ResourceList resources={this.state.paymentTypes} deleteFunc={this.deletepaymentType} editFunc={this.editpaymentType} objectModel={this.state.objectModel}/>
          <AddItemForm objectModel={this.state.objectModel} addFunc={this.addpaymentType}/>
        </div>
      );
    }
}
export default paymentTypePage;