import React from 'react';
import './ProductTypesPage.css';
import apiAccess from '../../api-access/api';
import ResourceList from '../ResourceList/ResourceList';
import AddItemForm from '../AddItemForm/AddItemForm';

const objectModel = {
  id: 0,
  name: ''
};

class ProductTypesPage extends React.Component {

  state = {
    items: []
  }

  componentDidMount() {
    this.getItems();
  }

  getItems = () => {
    apiAccess.apiGet('producttypes')
      .then(res => {
        this.setState({items: res.data});
      });
  }

  addItem = (newItem) => {
    apiAccess.apiPost('producttypes', newItem)
      .then(res => {
        this.getItems();
      });
  }

  deleteItem = (id) => {
    apiAccess.apiDelete(`producttypes/${id}`).then(x => this.getItems()).catch(err => console.error(err));
  }
  editItem = (newItem) => {
    apiAccess.apiPut('producttypes', newItem)
      .then(res => {
        this.getItems();
      });
  }

  render () {
    return (
      <div className='ProductTypesPage'>
        <h1>Product Types</h1>
        <ResourceList resources={this.state.items} deleteFunc={this.deleteItem} editFunc={this.editItem}/>
        <AddItemForm objectModel={objectModel} addFunc={this.addItem}/>
      </div>
    );
  }
};

export default ProductTypesPage;
