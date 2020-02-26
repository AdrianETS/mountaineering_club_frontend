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
                        Navbar
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;