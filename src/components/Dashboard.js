import React from 'react';
import {AppContext} from './../context/ContextProvider';
import Navbar from './Navbar';
import EventCalendar from './EventCalendar';

class Dashboard extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);

    }

    componentDidMount(){
        this.context.checkToken(this);
    }

    render() {
        return (
            <div>
                <Navbar history = {this.props.history}/>  
                <br/>                     
                <EventCalendar history = {this.props.history}/>
        </div>
        )
    }
}

export default Dashboard;