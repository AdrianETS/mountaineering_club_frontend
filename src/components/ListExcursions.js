import React from 'react';
import { AppContext } from './../context/ContextProvider';
import Navbar from "./Navbar";
import { Link } from 'react-router-dom';


class ListExcursions extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.context.getExcursionList();
    }



    render() {
        return (<div>
            <Navbar />
            <h5>List of excursions:</h5>
            <br/><div>
                <ul>
                {this.context.excursionList.map(excursion =>
                    <div>
                        <li> <Link to={{ pathname: '/editexcursion', state: { id: excursion._id}}}>
                            {excursion.name} 
                            </Link>                      
                        </li>
                    </div>
                )}
                </ul>
            </div>
        </div>);
    }

}


export default ListExcursions;