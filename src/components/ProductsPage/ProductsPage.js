import React from 'react';
import './ProductsPage.css';
import apiAccess from '../../api-access/api';

import ResourceList from '../ResourceList/ResourceList';
import AddItemForm from '../AddItemForm/AddItemForm';

class ProductsPage extends React.Component {

  state = {
    items: [],
    objectModel: {
      id: 0,
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      customerId: [],
      productType: []
    }
  }

  getItems = () => {
    apiAccess.apiGet('product')
      .then(res => {
        this.setState({items: res.data});
      });
  }

  addItem = (newItem) => {
    apiAccess.apiPost('product/product', newItem)
      .then(res => {
        this.getItems();
      });
  }

  deleteItem = (id) => {
    apiAccess.apiDelete('product/' + id)
      .then(res => {
        this.getItems();
      });
  }

 // return axios.put(`${apiBaseUrl}/${endpoint}`, data);
  editItem = (newItem) => {
    apiAccess.apiPut('product/product', newItem)
      .then(res => {
        this.getItems();
      });
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
  getProducttypes = () => {
    apiAccess
      .apiGet('producttypes')
      .then(res => {
        const {objectModel} = {...this.state};
        objectModel.productType = res.data.map(i => i.id);
        this.setState({objectModel});
      })
  }
  componentDidMount() {
    this.getItems();
    this.getProducttypes();
    this.getCustomers();
  }

  render () {
    return (
      <div className='ProductsPage'>
        <h1>Products</h1>
        <ResourceList resources={this.state.items} deleteFunc={this.deleteItem} editFunc={this.editItem} objectModel={this.state.objectModel}/>
        <AddItemForm objectModel={this.state.objectModel} addFunc={this.addItem}/>
      </div>
    );
  }
};

export default ProductsPage;
