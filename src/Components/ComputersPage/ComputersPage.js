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
    make: "",
    model: ""
  }

  componentDidMount() {
    this.getItems();
  }

  createMakeOptions = (items) => {
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
  }

  createModelOptions = (items) => {
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

  getItems = () => {
    apiAccess.apiGet('computer')
      .then(res => {
        this.createModelOptions(res.data);
        this.createMakeOptions(res.data);
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
  };

  setMake = (e) => {
    this.setState({
      make: e.target.value,
    });
  }

  setModel = (e) => {
    this.setState({
      model: e.target.value,
    });
  }

  filterItems = (computer) => {
    if (this.state.make !== "" && this.state.model !== "") {
      return computer.make === this.state.make
            && computer.model === this.state.model;
    }
    else if (this.state.make !== "") {
      return computer.make === this.state.make;
    }
    else if (this.state.model !== "") {
      return computer.model === this.state.model;
    }
    return computer;
  }

  render() {

    return (
      <div className='ComputersPage'>
        <h1>Computers</h1>
        <select id="make" onChange={this.setMake}>
          <option value="">Select a make:</option>
          {this.makes}
        </select>
        <select id="model" onChange={this.setModel}>
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
