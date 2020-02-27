import React from 'react';
import { AppContext } from './../context/ContextProvider';
import Navbar from "./Navbar";
import { Link } from 'react-router-dom';
import EditMember from "./EditMember";

class ListMembers extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.context.getMemberList();
    }



    render() {
        return (<div>
            <Navbar />
            <h5>List of members:</h5>
            <br/><div>
                <ul>
                {this.context.membersList.map(member =>
                    <div>
                        <li> <Link to={{ pathname: '/editmember', state: { id: member._id}}}>
                            {member.name} {member.surname} 
                            </Link>                      
                        </li>
                    </div>

                )}
                </ul>
            </div>
        </div>);
    }

}


export default ListMembers;