import React from 'react';
import ResourceList from '../ResourceList/ResourceList';
import AddItemForm from '../AddItemForm/AddItemForm';
import apiAccess from '../../api-access/api';

class TrainingProgramPage extends React.Component {

  state = {
    trainingprograms: []
  }

  trainingProgramModel = {
    id: 0,
    name: '',
    startDate: '',
    endDate: '',
    maxAttendees: 0
  }

  getAllResources = () => {
    apiAccess.apiGet('trainingprogram').then(tp => this.setState({ trainingprograms: tp.data }));
  }

  componentDidMount() {
    this.getAllResources();
  }

  addTrainingProgram = (tpObject) => {
    apiAccess.apiPost('trainingprogram', tpObject).then(x => {
      this.getAllResources();
    });
  }

  deleteTrainingProgram = (id) => {
    apiAccess.apiDelete(`trainingprogram/${id}`).then(x => this.getAllResources()).catch(err => alert(err.response.data.error));
  }

  render() {
    return (
      <div>
        <ResourceList resources={this.state.trainingprograms} deleteFunc={this.deleteTrainingProgram} />
        <AddItemForm objectModel={this.trainingProgramModel} addFunc={this.addTrainingProgram} />
      </div>
    );
  }
}

export default TrainingProgramPage;