import React from 'react';
//import './ComputersPage.css';
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

  deleteItem = (id) => {
    apiAccess.apiDelete(`computer/${id}`).then(res => this.getItems()).catch(err => console.error(err));
  }
  
  editComputer = (newcomputer) => {
    apiAccess
      .apiPut('computer/computer', newcomputer)
      .then(res => {
        this.getItems();
      });
  };

  render () {
    return (
      <div className='ComputersPage'>
<<<<<<< HEAD
        <h1>Computers</h1>
=======
        <ResourceList resources={this.state.items} deleteFunc={this.deleteItem} editFunc={this.editComputer}/>
>>>>>>> master
        <AddItemForm objectModel={objectModel} addFunc={this.addItem} />
      </div>
    );
  }
};

export default ComputersPage;
