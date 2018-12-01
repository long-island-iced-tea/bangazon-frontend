import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import SideNav from '../components/SideNav/SideNav';
import './App.css';

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
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
