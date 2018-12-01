import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import SideNav from '../components/SideNav/SideNav';
import './App.css';
import ProductsPage from '../components/ProductsPage/ProductsPage';
import ProductTypesPage from '../components/ProductTypesPage/ProductTypesPage';
import TrainingProgramPage from '../components/TrainingProgramPage/TrainingProgramPage';
import PaymentTypePage from '../components/PaymentTypes/PaymentTypes';

class App extends Component {

  state = {};

  render () {
    return (
      <div className="App">
        <BrowserRouter>
          <div className="row container-fluid">
            <div className="col-3 sidebar-container">
              <SideNav/>
            </div>
            <div className="col-9 resource-page-container">
              <Switch>
                <Route path="/" exact />
                <Route path="/products" exact component={ProductsPage} />
                <Route path="/producttype" exact component={ProductTypesPage} />
                <Route path="/trainingprogram" exact component={TrainingProgramPage} />
                <Route path="/paymenttype" exact component={PaymentTypePage} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
