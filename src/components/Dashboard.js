import React from 'react';
import {AppContext} from './../context/ContextProvider';

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
                Welcome to Dashboard
        </div>
        )
    }
}

export default Dashboard;