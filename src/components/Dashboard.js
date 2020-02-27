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
                Welcome to Dashboard
        </div>
        )
    }
}

export default Dashboard;