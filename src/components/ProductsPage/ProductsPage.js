import React from 'react';
import './ProductsPage.css';
import apiAccess from '../../api-access/api';

import ResourceList from '../ResourceList/ResourceList';
import AddItemForm from '../AddItemForm/AddItemForm';

const objectModel = {
  id: 0,
  name: '',
  description: '',
  price: 0,
  quantity: 0,
  customerId: 0,
  productType: 0
};

class ProductsPage extends React.Component {

  state = {
    items: [],
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

  componentDidMount() {
    this.getItems();
  }

  render () {
    return (
      <div className='ProductsPage'>
        <ResourceList resources={this.state.items} deleteFunc={this.deleteItem} editFunc={this.editItem}/>
        <AddItemForm objectModel={objectModel} addFunc={this.addItem}/>
      </div>
    );
  }
};

export default ProductsPage;
