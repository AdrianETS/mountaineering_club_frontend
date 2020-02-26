import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import { ContextProvider } from './context/ContextProvider';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = props;
  }

  render() {
    return (
      <div>
        <ContextProvider>
          <Navbar />
          <Dashboard />
        </ContextProvider>
      </div>
    )
  }

}

export default App;
