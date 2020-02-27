import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import { ContextProvider } from './context/ContextProvider';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ListMembers from "./components/ListMembers";
import EditMember from "./components/EditMember";

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
              <Route path="/" exact component={Dashboard} />
              <Route path="/listmembers" exact component={ListMembers} />
              <Route path="/editmember" exact component={EditMember} />
            </Switch>
          </Router>
        </ContextProvider>
      </div>
    )
  }

}

export default App;
