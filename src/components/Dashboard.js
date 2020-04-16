import React from 'react';
import {AppContext} from './../context/ContextProvider';
import Navbar from './Navbar';

class Dashboard extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);

    }

    

    render() {
        return (
            <div>
                <Navbar/>                       
                <label style = {{margin: "20px"}}>Welcome to Dashboard</label>
        </div>
        )
    }
}

export default Dashboard;