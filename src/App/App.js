import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Alert from 'react-s-alert';
import SideNav from '../components/SideNav/SideNav';
import './App.css';
import ProductsPage from '../components/ProductsPage/ProductsPage';
import ProductTypesPage from '../components/ProductTypesPage/ProductTypesPage';
import TrainingProgramPage from '../components/TrainingProgramPage/TrainingProgramPage';
import CustomerPage from '../components/CustomersPage/CustomersPage';
import EmployeePage from '../components/Employees/EmployeePage';
import ComputersPage from '../components/ComputersPage/ComputersPage';
import OrdersPage from '../components/OrdersPage/OrdersPage';
import DepartmentsPage from '../components/DepartmentsPage/DepartmentsPage';
import PaymentTypePage from '../components/PaymentTypes/PaymentTypes';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';


class App extends Component {

  state = {};

  render () {
    return (
      <div className="App">
        <BrowserRouter>
          <div className="container-fluid">
            <header>
              <h1 className="header-title">Bangazon Inc.</h1>
            </header>
            <div className="row">
              <div className="col-3 sidebar-container">
                <SideNav/>
              </div>
              <div className="main-container">
                <div className="col-9 resource-page-container">
                  <Switch>
                    <Route path="/" exact />
                    <Route path="/orders" exact component={OrdersPage} />
                    <Route path="/products" exact component={ProductsPage} />
                    <Route path="/producttype" exact component={ProductTypesPage} />
                    <Route path="/trainingprogram" exact component={TrainingProgramPage} />
                    <Route path="/customer" exact component={CustomerPage} />
                    <Route path="/employee" exact component={EmployeePage} />
                    <Route path="/computers" exact component={ComputersPage} />
                    <Route path="/departments" exact component={DepartmentsPage} />
                    <Route path="/paymenttype" exact component={PaymentTypePage} />
                  </Switch>
                </div>
              </div>
            <footer>
              <p className="footer-text">Achor, Clark, Rodgers, &amp; Slayton &copy;2018</p>
            </footer>
            </div>
          </div>
        </BrowserRouter>
        <Alert stack={{limit:3}} timeout={4000}/>
      </div>
    );
  }
}

export default App;
