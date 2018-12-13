import React from 'react';
import './TrainingProgramPage.css';
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

  editTrainingProgram = (newTraining) => {
    var moment = require('moment');
    moment().format();

    if (moment(newTraining.startDate).isAfter() && moment(newTraining.endDate).isAfter()){
      apiAccess
      .apiPut('trainingprogram/' + newTraining.id, newTraining)
      .then(res => {
        this.getAllResources();
      });
    } else if (moment(newTraining.startDate).isBefore() && moment(newTraining.endDate).isAfter()) {
      alert("This training program is currently underway and cannot be edited.")
    }else if (moment(newTraining.startDate).isAfter() && moment(newTraining.endDate).isBefore()) {
      alert("There is something screwy about your dates.")
    } else {
      alert("This training program has already occured and cannot be edited.")
    }
  };

  handleUpcomingFilter = (e) => {
    const allTPs = {...this.state};
    const filteredTPs = allTPs.trainingprograms.filter((tp) => {
      return tp.startDate.isAfter();
      })
      
    };

  render() {
    return (
      <div className="TrainingProgramPage">
        <h1>Training Programs</h1>
        <button onClick= {this.handleUpcomingFilter} className="btn btn-secondary upcoming">Upcoming</button>
        <button className="btn btn-secondary completed">Completed</button>
        <ResourceList resources={this.state.trainingprograms} deleteFunc={this.deleteTrainingProgram} editFunc={this.editTrainingProgram}/>
        <AddItemForm objectModel={this.trainingProgramModel} addFunc={this.addTrainingProgram} />
      </div>
    );
  }
}

export default TrainingProgramPage;