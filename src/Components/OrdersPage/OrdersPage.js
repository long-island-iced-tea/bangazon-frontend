import React from 'react';
import './OrdersPage.css';
import ResourceList from '../ResourceList/ResourceList';

import apiAccess from '../../api-access/api';

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

  render () {
    return (
      <div className='OrdersPage'>
        <ResourceList resources={this.state.items} />
      </div>
    );
  }
};

export default OrdersPage;
