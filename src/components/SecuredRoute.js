import React from 'react';
import { BrowserRouter as Route } from "react-router-dom";
import { AppContext } from './../context/ContextProvider';

export class SecuredRoute extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
    }

    render() {
        if (!this.context.getTokenFromLocalStorage())
            this.props.history.push("/login");
        return <Route {...this.props} />
    }


}

export default SecuredRoute;