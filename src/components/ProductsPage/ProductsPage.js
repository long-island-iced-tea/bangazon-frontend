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

  componentDidMount() {
    this.getItems();
  }

  render () {
    return (
      <div className='ProductsPage'>
        <ResourceList resources={this.state.items}/>
        <AddItemForm objectModel={objectModel}/>
      </div>
    );
  }
};

export default ProductsPage;
