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

  addItem = (newItem) => {
    apiAccess.apiPost('computer/computer', newItem)
      .then(res => {
        this.getItems();
      });
  }

  editComputer = (newcomputer) => {
    apiAccess
      .apiPut('computer', newcomputer)
      .then(res => {
        this.getItems();
      });
  };

  render () {
    return (
      <div className='ComputersPage'>
        <AddItemForm objectModel={objectModel} addFunc={this.addItem} />
        <ResourceList resources={this.state.items} />
      </div>
    );
  }
};

export default ComputersPage;
