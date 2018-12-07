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
  isWorking: true,
  make: '',
  model: ''
};

class ComputersPage extends React.Component {

  state = {
    items: [],
    filter: {
      make: "",
      model: ""
    }
  }

  componentDidMount() {
    this.getItems();
  }

  getItems = () => {
    apiAccess.apiGet('computer')
      .then(res => {
        this.createOptions(res.data);
        this.setState({ items: res.data });
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
  }

  createOptions = (items) => {

    this.makes = items.reduce((makes, computer) => {
      if (!makes.includes(computer.make) && computer.make != null) {
        makes.push(computer.make);
      }
      return makes;
    }, [])
      .map(make => {
        return (
          <option key={make} value={make}>
            {make}
          </option>
        )
      });

    this.models = items.reduce((models, computer) => {
      if (!models.includes(computer.model) && computer.model != null) {
        models.push(computer.model);
      }
      return models;
    }, [])
      .map(model => {
        return (
          <option key={model} value={model}>
            {model}
          </option>
        )
      });
  }

  setFilter = (e) => {
    const {filter} = {...this.state};
    filter[e.target.id] = e.target.value;
    this.setState({ filter });
  }

  filterItems = (computer) => {
    const {filter} = this.state;

    if (filter.make !== "" && filter.model !== "") {
      return computer.make === filter.make
            && computer.model === filter.model;
    }
    else if (filter.make !== "") {
      return computer.make === filter.make;
    }
    else if (filter.model !== "") {
      return computer.model === filter.model;
    }
    return computer;
  }

  render() {

    return (
      <div className='ComputersPage'>
        <h1>Computers</h1>
        <select id="make" onChange={this.setFilter}>
          <option value="">Select a make:</option>
          {this.makes}
        </select>
        <select id="model" onChange={this.setFilter}>
          <option value="">Select a model:</option>
          {this.models}
        </select>
        <ResourceList resources={this.state.items.filter(this.filterItems)} deleteFunc={this.deleteItem} editFunc={this.editComputer} />
        <AddItemForm objectModel={objectModel} addFunc={this.addItem} />
      </div>
    );
  }
};

export default ComputersPage;
