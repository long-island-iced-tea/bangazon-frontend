import React from 'react';
import './TrainingProgramPage.css';
import ResourceList from '../ResourceList/ResourceList';
import AddItemForm from '../AddItemForm/AddItemForm';
import apiAccess from '../../api-access/api';
import moment from 'moment';

class TrainingProgramPage extends React.Component {

  state = {
    trainingprograms: []
  }

  trainingProgramModel = {
    id: 0,
    name: '',
    startDate: moment(),
    endDate: moment(),
    maxAttendees: 0
  }

  getAllResources = () => {
    apiAccess.apiGet('trainingprogram').then(res => {
      const data = res.data;
      data.forEach(tp => {
        tp.startDate = moment(tp.startDate);
        tp.endDate = moment(tp.endDate);
      });
      this.setState({ trainingprograms: data });
    });
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

    if (newTraining.startDate.isAfter() && newTraining.endDate.isAfter()) {
      newTraining.startDate = newTraining.startDate.format();
      newTraining.endDate = newTraining.endDate.format();
      apiAccess
      .apiPut('trainingprogram/' + newTraining.id, newTraining)
      .then(res => {
        this.getAllResources();
      });
    } else if (newTraining.startDate.isBefore() && newTraining.endDate.isAfter()) {
      alert("This training program is currently underway and cannot be edited.");
    } else if (newTraining.startDate.isAfter() && newTraining.endDate.isBefore()) {
      alert("There is something screwy about your dates.");
    } else {
      alert("This training program has already occured and cannot be edited.");
    }
  }

  handleUpcomingFilter = (e) => {
    const allTPs = {...this.state};
    allTPs.trainingprograms.filter((tp) => {
      if (tp.startDate.isAfter() === true) {
        console.log("upcoming", tp);
      }
      return allTPs ;
      })
    };

    handleCompletedFilter = (e) => {
      const allTPs = {...this.state};
      allTPs.trainingprograms.filter((tp) => {
        if(tp.endDate.isBefore() === true) {
          console.log("completed", tp)
        }
        return allTPs;
      })
    }

  render() {
    return (
      <div className="TrainingProgramPage">
        <h1>Training Programs</h1>
        <button onClick= {this.handleUpcomingFilter} className="btn btn-secondary upcoming">Upcoming</button>
        <button onClick={this.handleCompletedFilter} className="btn btn-secondary completed">Completed</button>
        <ResourceList resources={this.state.trainingprograms} deleteFunc={this.deleteTrainingProgram} editFunc={this.editTrainingProgram}/>
        <AddItemForm objectModel={this.trainingProgramModel} addFunc={this.addTrainingProgram} />
      </div>
    );
  }
}

export default TrainingProgramPage;