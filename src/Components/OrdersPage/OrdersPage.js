import React from 'react';
//import './OrdersPage.css';
import ResourceList from '../ResourceList/ResourceList';
import AddItemForm from '../AddItemForm/AddItemForm';

import apiAccess from '../../api-access/api';

const objectModel = {
  id: 0,
  customerId: 0,
  paymentType: 0,
  completed: true,
  isActive: true
};

class OrdersPage extends React.Component {

  state = {
    items: []
  }

  componentDidMount() {
    this.getItems();
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

  render () {
    return (
      <div className='OrdersPage'>
        <ResourceList resources={this.state.items} deleteFunc={this.deleteItem} editFunc={this.editOrders}/>
        <AddItemForm objectModel={objectModel} addFunc={this.addItem}/>
      </div>
    );
  }
};

export default OrdersPage;
