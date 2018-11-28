import React, { Component } from 'react';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import Sidebar from '../Components/Sidebar/Sidebar';
import './App.css';

class App extends Component {

  state = {};

  render () {
    return (
      <div className="App">
        <BrowserRouter>
          <div className="row">
            <div className="col-3 sidebar-container">
              <Sidebar />
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
