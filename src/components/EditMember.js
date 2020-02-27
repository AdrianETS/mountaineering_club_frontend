import React from 'react';
import { AppContext } from './../context/ContextProvider';
import Navbar from "./Navbar";
import ListMembers from "./ListMembers";
import { Link } from 'react-router-dom';

class EditMember extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            member: "",
            userId: "",
            editEnabled: false,
            id: this.props.location?.state?.id
        }


        this.enableEdit = this.enableEdit.bind(this);
        this.handleMemberName = this.handleMemberName.bind(this);
        this.handleMemberSurname = this.handleMemberSurname.bind(this);
        this.handleMemberBirthDate = this.handleMemberBirthDate.bind(this);
        this.handleMemberClubId = this.handleMemberClubId.bind(this);
        this.handleMemberLicenseMember = this.handleMemberLicenseMember.bind(this);
        this.handleMemberType = this.handleMemberType.bind(this);
        this.handleResponsibilityAgreementSigned = this.handleResponsibilityAgreementSigned.bind(this);

    }

    componentDidMount() {
        this.context.getMemberInfo(this.state.id)
            .then(member => this.setState({ member }));

    }

    componentDidUpdate() {

    }

    enableEdit() {
        this.setState({ editEnabled: !this.state.editEnabled });
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

    render() {
        //let member = this.context.selectedMember;
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
                                        <h5 className="card-title text-center">User information</h5>
                                        <form className="form-signin">
                                            <div className="form-label-group">
                                                <label for="inputUserame">Name</label>
                                                <input type="text" id="inputMemberName" className="form-control" value={this.state.member.name} onChange={this.handleMemberName} placeholder="Name" disabled={!this.state.editEnabled} required autofocus />

                                            </div>

                                            <div className="form-label-group">
                                                <label for="inputName">Surname</label>
                                                <input type="text" id="inputMemberSurname" className="form-control" value={this.state.member.surname} onChange={this.handleMemberSurname} placeholder="Surname" disabled={!this.state.editEnabled} required />

                                            </div>
                                            <div className="form-label-group">
                                                <label for="inputBirthDate">Birth date</label>
                                                <input type="text" id="inputBirthDate" className="form-control" value={this.state.member.birthDate} onChange={this.handleMemberBirthDate} placeholder="Birth date" disabled={!this.state.editEnabled} required />

                                            </div>
                                            <div className="form-label-group">
                                                <label for="inputClubId">Club Id</label>
                                                <input type="text" id="inputClubId" className="form-control" value={this.state.member.clubId} onChange={this.handleMemberClubId} placeholder="Club Id" disabled={!this.state.editEnabled} required />

                                            </div>
                                            <div className="form-label-group">
                                                <label for="inputLicenseNumber">License number</label>
                                                <input type="text" id="inputLicenseNumber" className="form-control" value={this.state.member.licenseNumber} onChange={this.handleMemberLicenseMember} placeholder="License number" disabled={!this.state.editEnabled} required />

                                            </div>
                                            <div className="form-label-group">
                                                <label for="inputType">Type</label>
                                                <input type="text" id="inputType" className="form-control" value={this.state.member.type} onChange={this.handleMemberType} placeholder="Type" disabled={!this.state.editEnabled} required />

                                            </div>
                                            <div className="form-label-group">
                                                <label for="inputResponsibilityAgreementSigned">Responsibility agreement signed?</label>
                                                <input type="text" id="inputResponsibilityAgreementSigned" className="form-control" value={this.state.member.responsibilityAgreementSigned} onChange={this.handleResponsibilityAgreementSigned} placeholder="Responsibility agreement signed" disabled={!this.state.editEnabled} required />
                                                <br />
                                            </div>

                                            
                                            <button type="button" class="btn btn-success btn-lg" onClick={this.enableEdit}>Edit user</button>
                                            
                                            
                                            
                                            <button type="button" class="btn btn-primary btn-lg" onClick={()=>this.context.editMember(this.state.member)}>Submit</button>
                                            

                                            <div className="float-right">
                                                <button type="button" class="btn btn-secondary btn-lg btn-secondary">Cancel</button>
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
        );
    }


}

export default EditMember;