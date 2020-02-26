import React from 'react';
import {AppContext} from './../context/ContextProvider';
import Navbar from './Navbar';

class Dashboard extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);

    }

    componentDidMount(){
        this.context.getMemberList();
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