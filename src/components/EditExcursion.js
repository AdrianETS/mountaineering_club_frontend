import React from 'react';
import { AppContext } from './../context/ContextProvider';
import Navbar from "./Navbar";
import ListMembers from "./ListMembers";
import { Link } from 'react-router-dom';

class EditExcursion extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            excursion: "",
            editEnabled: false,
            id: this.props.location?.state?.id
        }

        this.goBack = this.goBack.bind(this);
    }

    componentDidMount(){
        this.context.getExcursionInfo(this.state.id).
        then(excursion => this.setState({excursion: excursion}));
    }

    goBack() {
        this.props.history.push("/listexcursions");
    }

    render() {
        return (
            <div>
                <Navbar />
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 col-xl-9 mx-auto">
                                <div className="card card-signin flex-row my-5">
                                    <div className="card-img-left d-none d-md-flex">
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title text-center">Excursion information</h5>
                                        <form className="form-signin">
                                            <div className="form-label-group">
                                                <label for="inpurExcursionName">Name</label>
                                                <input type="text" id="inpurExcursionName" className="form-control" value = {this.state.excursion.name} placeholder="Name" required autofocus />

                                            </div>

                                            <div className="form-label-group">
                                                <label for="inputDate">Date</label>
                                                <input type="text" id="inputDate" className="form-control" value = {this.state.excursion.date} placeholder="Date" required />

                                            </div>
                                            <div className="form-label-group">
                                                <label for="inputUsersId">User's id</label>
                                                <input type="text" id="inputUsersId" className="form-control" value = {this.state.excursion.users_id} placeholder="User's id" required />
                                                <br />
                                            </div>


                                            <button type="button" className="btn btn-primary btn-lg" >Submit</button>


                                            <div className="float-right">
                                                <button type="button" className="btn btn-secondary btn-lg btn-secondary" onClick={this.goBack}>Cancel</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                </div>
            </div>
        )
    }

}

export default EditExcursion;