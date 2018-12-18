import React from 'react';
import './TrainingProgramPage.css';
import ResourceList from '../ResourceList/ResourceList';
import AddItemForm from '../AddItemForm/AddItemForm';
import apiAccess from '../../api-access/api';
import moment from 'moment';
import Alert from 'react-s-alert';

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
      Alert.error("This training program is currently underway and cannot be edited.", {
        position: 'top-right',
          effect: 'stackslide',
          timeout: 4000
      });
    } else if (newTraining.startDate.isAfter() && newTraining.endDate.isBefore()) {
      Alert.warning("There is something screwy about your dates.", {
        position: 'top-right',
          effect: 'stackslide',
          timeout: 4000
      });
    } else {
      Alert.error("This training program has already occured and cannot be edited." ,{
        position: 'top-right',
          effect: 'stackslide',
          timeout: 4000
      });
    }
  }

  handleUpcomingFilter = (e) => {
    const allTPs = {...this.state};
    const upcoming = [];
    allTPs.trainingprograms.filter((tp) => {
      if (tp.startDate.isAfter() === true) {
        upcoming.push(tp);
        console.log('upcoming', tp);
        this.setState({trainingprograms: upcoming});
      }
      return allTPs ;
      })
    };


    handleCompletedFilter = (e) => {
      const allTPs = {...this.state};
      const completed = [];
      allTPs.trainingprograms.filter((tp) => {
        if(tp.endDate.isBefore() === true) {
          completed.push(tp)
          console.log('completed', tp);
          this.setState({trainingprograms:completed});
        }
        return allTPs;
      })
      if(completed.length === 0) {
        Alert.warning('There aren\'t any completed training programs!', {
          position: 'top-right',
          effect: 'stackslide',
          timeout: 4000
        });
      }
    }

  render() {
    return (
      <div className="TrainingProgramPage">
        <h1>Training Programs</h1>
        <button onClick= {this.handleUpcomingFilter} className="btn btn-secondary upcoming">Upcoming</button>
        <button onClick={this.handleCompletedFilter} className="btn btn-secondary completed">Completed</button>
        <button onClick= {this.getAllResources} className="btn btn-secondary completed">All Training Programs</button>
        <ResourceList resources={this.state.trainingprograms} deleteFunc={this.deleteTrainingProgram} editFunc={this.editTrainingProgram}/>
        <AddItemForm objectModel={this.trainingProgramModel} addFunc={this.addTrainingProgram} />
      </div>
    );
  }
}

export default TrainingProgramPage;