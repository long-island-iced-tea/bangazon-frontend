import React from 'react';
import './ComputersPage.css';
import apiAccess from '../../api-access/api';
import AddItemForm from '../AddItemForm/AddItemForm';
import ResourceList from '../ResourceList/ResourceList';

const objectModel = {
  id: 0,
  purchasedAt: '',
  decommissionedAt: '',
  createdAt: '',
  isNew: false,
  isWorking: true
};

class ComputersPage extends React.Component {

  state = {
    items: []
  }

  componentDidMount() {
    this.getItems();
  }

  getItems = () => {
    apiAccess.apiGet('computer')
      .then(res => {
        this.setState({items: res.data});
      });
  }

  render () {
    return (
      <div className='ComputersPage'>
        <AddItemForm objectModel={objectModel} />
        <ResourceList resources={this.state.items} />
      </div>
    );
  }
};

export default ComputersPage;
