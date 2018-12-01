import React from 'react';
import './ProductsPage.css';
import backend from '../../api-access/api';

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
    backend.apiGet('product')
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

      </div>
    );
  }
};

export default ProductsPage;
