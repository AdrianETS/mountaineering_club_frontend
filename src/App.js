import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { ContextProvider } from './context/ContextProvider';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ListMembers from "./components/ListMembers";
import EditMember from "./components/EditMember";
import AddMember from "./components/AddMember";
import EditExcursion from './components/EditExcursion';
import ListExcursions from './components/ListExcursions';
import AddExcursion from "./components/AddExcursion";
import SecuredRoute from "./components/SecuredRoute";
import EventCalendar from "./components/EventCalendar";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = props;
  }

  render() {
    return (
      <div>
        <ContextProvider>
          <Router>
            <Switch>
              <Route path="/login" exact component={Login} />
              <Route path="/" exact component={Dashboard} />
              <Route path="/excursions/edit" exact component={EditExcursion} />
              <Route path="/excursions/list" exact component={ListExcursions} />
              <Route path="/members/list" exact component={ListMembers} />
              <Route path="/members/edit" exact component={EditMember} />
              <Route path="/members/add" exact component={AddMember} />
              <Route path="/excursions/add" exact component={AddExcursion} />
            </Switch>
          </Router>
        </ContextProvider>

      </div>
    )
  }

}

export default App;
