import React from 'react';
//import './ComputersPage.css';
import apiAccess from '../../api-access/api';
import AddItemForm from '../AddItemForm/AddItemForm';
import ResourceList from '../ResourceList/ResourceList';
import moment from 'moment';


class ComputersPage extends React.Component {

  state = {
    items: [],
    objectModel : {
      id: 0,
      purchasedAt: moment(),
      decommissionedAt: moment(),
      isNew: false,
      isWorking: true,
      make: '',
      model: '',
      employeeId: []
    },
    filter: {
      make: "",
      model: ""
    }
  }

  componentDidMount() {
    this.getItems();
    this.getEmployees();
  }

  getItems = () => {
    apiAccess.apiGet('computer')
      .then(res => {
        const data = res.data;
        data.forEach(computer => computer.purchasedAt = moment(computer.purchasedAt));
        this.createOptions(data);
        this.setState({ items: data });
      });
  }
  getEmployees = () => {
    apiAccess.apiGet('employee')
      .then(res => {
        const {objectModel} = {...this.state};
        objectModel.employeeId = res.data.map(i => i.id);
        this.setState({objectModel})
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
    newcomputer.purchasedAt = newcomputer.purchasedAt.format();
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
        <ResourceList resources={this.state.items.filter(this.filterItems)} deleteFunc={this.deleteItem} editFunc={this.editComputer} objectModel={this.state.objectModel} />
        <AddItemForm objectModel={this.state.objectModel} addFunc={this.addItem} />
      </div>
    );
  }
};

export default ComputersPage;
