import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import ProductsPage from '../components/ProductsPage/ProductsPage';
import ProductTypesPage from '../components/ProductTypesPage/ProductTypesPage';
import TrainingProgramPage from '../Components/TrainingProgramPage/TrainingProgramPage';

import OrdersPage from '../components/OrdersPage/OrdersPage';

class App extends Component {

  state = {};

  render () {
    return (
      <div className="App">
        <BrowserRouter>
          <div className="row container-fluid">
            <div className="col-3 sidebar-container">

            </div>
            <div className="col-9 resource-page-container">
              <Switch>
                <Route path="/" exact />
                <Route path="/orders" exact component={OrdersPage} />
                <Route path="/products" exact component={ProductsPage} />
                <Route path="/producttype" exact component={ProductTypesPage} />
                <Route path="/trainingprogram" exact component={TrainingProgramPage} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
