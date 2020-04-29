import React from 'react';
import { AppContext } from './../context/ContextProvider';
import Navbar from "./Navbar";
import { Link } from 'react-router-dom';

class AddMember extends React.Component{

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            member:""
        }

        this.handleMemberName = this.handleMemberName.bind(this);
        this.handleMemberSurname = this.handleMemberSurname.bind(this);
        this.handleMemberBirthDate = this.handleMemberBirthDate.bind(this);
        this.handleMemberClubId = this.handleMemberClubId.bind(this);
        this.handleMemberLicenseMember = this.handleMemberLicenseMember.bind(this);
        this.handleMemberType = this.handleMemberType.bind(this);
        this.handleResponsibilityAgreementSigned = this.handleResponsibilityAgreementSigned.bind(this);
        this.handleMemberPassword = this.handleMemberPassword.bind(this);

        this.cancelButton = this.cancelButton.bind(this);
    }

    handleMemberName(event) {
        this.setState({ member: { ...this.state.member, name: event.target.value } });
    }

    handleMemberSurname(event) {
        this.setState({ member: { ...this.state.member, surname: event.target.value } });
    }

    handleMemberBirthDate(event) {
        this.setState({ member: { ...this.state.member, birthDate: event.target.value } });
    }

    handleMemberClubId(event) {
        this.setState({ member: { ...this.state.member, clubId: event.target.value } });
    }

    handleMemberLicenseMember(event) {
        this.setState({ member: { ...this.state.member, licenseNumber: event.target.value } });
    }

    handleMemberType(event) {
        this.setState({ member: { ...this.state.member, type: event.target.value } });
    }

    handleResponsibilityAgreementSigned(event) {
        this.setState({ member: { ...this.state.member, responsibilityAgreementSigned: event.target.value } });
    }

    handleMemberPassword(event) {
        this.setState({ member: { ...this.state.member, password: event.target.value } });
    }

    cancelButton() {
        this.props.history.push("/listmembers");
    }

    render(){
        return (
            <div>
            <Navbar history = {this.props.history}/>
            <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 col-xl-9 mx-auto">
                                <div className="card card-signin flex-row my-5">
                                    <div className="card-img-left d-none d-md-flex">
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title text-center">Create user</h5>
                                        <form className="form-signin">
                                            <div className="form-label-group">
                                                <label for="inputUserame">Name</label>
                                                <input type="text" id="inputMemberName" className="form-control"  onChange={this.handleMemberName} placeholder="Name" required autofocus />

                                            </div>

                                            <div className="form-label-group">
                                                <label for="inputName">Surname</label>
                                                <input type="text" id="inputMemberSurname" className="form-control" onChange={this.handleMemberSurname} placeholder="Surname" required />

                                            </div>
                                            <div className="form-label-group">
                                                <label for="inputBirthDate">Birth date</label>
                                                <input type="date" id="inputBirthDate" className="form-control" onChange={this.handleMemberBirthDate} placeholder="Birth date" required />

                                            </div>
                                            <div className="form-label-group">
                                                <label for="inputClubId">Club Id</label>
                                                <input type="text" id="inputClubId" className="form-control" onChange={this.handleMemberClubId} placeholder="Club Id" required />

                                            </div>
                                            <div className="form-label-group">
                                                <label for="inputLicenseNumber">License number</label>
                                                <input type="text" id="inputLicenseNumber" className="form-control" onChange={this.handleMemberLicenseMember} placeholder="License number" required />

                                            </div>
                                            <div className="form-label-group">
                                                <label for="inputType">Type</label>
                                                <input type="text" id="inputType" className="form-control" onChange={this.handleMemberType} placeholder="Type" required />

                                            </div>
                                            <div className="form-label-group">
                                                <label for="inputType">Password</label>
                                                <input type="password" id="inputPassword" className="form-control" onChange={this.handleMemberPassword} placeholder="Type" required />

                                            </div>
                                            <div className="form-label-group">
                                                <label for="inputResponsibilityAgreementSigned">Responsibility agreement signed?</label>
                                                <input type="text" id="inputResponsibilityAgreementSigned" className="form-control" onChange={this.handleResponsibilityAgreementSigned} placeholder="Responsibility agreement signed" required />
                                                <br />
                                            </div>


                                            <button type="button" className="btn btn-primary btn-lg" onClick = {()=>this.context.addMember(this.props.history, this.state.member).then(this.props.history.push("/listmembers"))}>Submit</button>


                                            <div className="float-right">
                                                <button type="button" className="btn btn-secondary btn-lg btn-secondary" onClick={this.cancelButton}>Cancel</button>
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

export default AddMember;