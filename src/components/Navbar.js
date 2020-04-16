import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse" itemID="navbarNavAltMarkup">
                    <div className="dropdown" style={{marginRight: "20px"}}>
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">Excursions</a>
                            <div className="dropdown-menu">
                                <a className="nav-link active" href={"/#"}><Link to="/addexcursion">Add excursion</Link></a>
                                <a className="nav-link active" href={"/#"}><Link to="/listexcursions">List excursions</Link></a>
                            </div>
                        </div>
                        

                    <div className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">Members</a>
                            <div className="dropdown-menu">
                                <a className="nav-link active" href={"/#"}><Link to="/addmember">Add member</Link></a>
                                <a className="nav-link active" href={"/#"}><Link to="/listmembers">List members</Link></a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;