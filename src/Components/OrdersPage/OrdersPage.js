import React from 'react';
//import './OrdersPage.css';
import ResourceList from '../ResourceList/ResourceList';
import AddItemForm from '../AddItemForm/AddItemForm';

import apiAccess from '../../api-access/api';


class OrdersPage extends React.Component {

  state = {
    items: [],
    objectModel: {
      id: 0,
      customerId: [],
      paymentType: [],
      completed: true,
      isActive: true
    }
  }

  componentDidMount() {
    this.getItems();
    this.getPayments();
    this.getCustomers();
  }

  getItems = () => {
    apiAccess.apiGet('orders')
      .then(res => {
        this.setState({items: res.data});
      });
  }

  addItem = (newItem) => {
    apiAccess.apiPost('orders', newItem)
      .then(res => {
        this.getItems();
      });
  }

  deleteItem = (id) => {
    apiAccess.apiDelete(`orders/${id}`)
      .then(res => {
        this.getItems();
      }).catch(err => console.error(err));
  }
  editOrders = (newOrders) => {
    apiAccess
      .apiPut('orders/' + newOrders.id, newOrders)
      .then(res => {
        this.getItems();
      });
  };
  getPayments = () => {
    apiAccess
      .apiGet('paymenttype')
      .then(res => {
        const {objectModel} = {...this.state};
        objectModel.paymentType = res.data.map(i => i.id);
        this.setState({objectModel});
      })
  }
  getCustomers = () => {
    apiAccess
      .apiGet('customers')
      .then(res => {
        const {objectModel} = {...this.state};
        objectModel.customerId = res.data.map(i => i.id);
        this.setState({objectModel});
      })
  }

  render () {
    return (
      <div className='OrdersPage'>
        <h1>Orders</h1>
        <ResourceList resources={this.state.items} deleteFunc={this.deleteItem} editFunc={this.editOrders} objectModel={this.state.objectModel}/>
        <AddItemForm objectModel={this.state.objectModel} addFunc={this.addItem}/>
      </div>
    );
  }
};

export default OrdersPage;
