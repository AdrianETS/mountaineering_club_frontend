import React from 'react';
import { AppContext } from './../context/ContextProvider';
import Navbar from "./Navbar";

class AddExcursion extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);

        this.state = {
            excursion: "",
            membersFound: [],
            membersSelected: [],
            membersList: [],
            submitDisabled: true,
            validExcursionName: false,
            validExcursionDate: false
        }

        this.cancelButton = this.cancelButton.bind(this);
        this.searchUsers = this.searchUsers.bind(this);
        this.handleExcursionName = this.handleExcursionName.bind(this);
        this.handleExcursionDate = this.handleExcursionDate.bind(this);
        this.addMemberToSelection = this.addMemberToSelection.bind(this);
    }

    componentDidMount() {
        this.context.getMemberList().
            then(() => this.setState({ membersList: this.context.membersList }));
    }

    handleExcursionName(event) {
        let excursionNameState = event.target.value? true: false;
        let submitValid = this.state.validExcursionDate && excursionNameState;
        this.setState({ excursion: { ...this.state.excursion, name: event.target.value }, validExcursionName: excursionNameState, submitDisabled: !submitValid});
    }

    handleExcursionDate(event) {
        let excursionDateState = event.target.value? true: false;
        let submitValid = this.state.validExcursionName && excursionDateState
        this.setState({ excursion: { ...this.state.excursion, date: event.target.value }, validExcursionDate: excursionDateState, submitDisabled: !submitValid });
    }

    searchUsers(event) {
        let usersFound = [];
        event.target.value == "" ? usersFound = [] : usersFound = this.state.membersList.filter(member=> member.name.toUpperCase().includes(event.target.value.toUpperCase() || member.surname.toUpperCase().includes(event.target.value.toUpperCase())));
        usersFound = usersFound.slice(0,3);
        this.setState({ membersFound: usersFound });
    }


    addMemberToSelection(member) {
        let restOfMembers = this.state.membersList.filter(user => member._id != user._id);
        this.setState({ membersSelected: [...this.state.membersSelected, member], membersList: restOfMembers });
    }

    removeMemberFromExcursion(member){
        let updateMembersSelected = this.state.membersSelected.filter(member2 => member2._id != member._id);
        this.state.membersList.push(member);
        let updatedMemebersList = this.state.membersList;
        this.setState({membersSelected: updateMembersSelected, membersList: updatedMemebersList});
    }

    cancelButton() {
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
                                        <h5 className="card-title text-center">Create excursion</h5>
                                        <form className="form-signin">
                                            <div className="form-label-group">
                                                <label for="inputExcursioname">Name</label>
                                                <input type="text" id="inputExcursioname" className="form-control" onChange={this.handleExcursionName} placeholder="Excursion name" required autofocus />

                                            </div>

                                            <div className="form-label-group">
                                                <label for="inputDate">Date</label>
                                                <input type="text" id="inputDate" className="form-control" onChange={this.handleExcursionDate} placeholder="Date" required />
                                            </div>

                                            <label for="inputDate"> Search users</label>
                                            <input className="form-control mr-sm-2" type="search" onChange={this.searchUsers} placeholder="Search" aria-label="Search"></input><br />

                                            {this.state.membersFound.map(member =>
                                                !this.state.membersSelected.find(member2=> member._id === member2._id) && (
                                                <div class="list-group">
                                                    <a href="#" class="list-group-item list-group-item-action" onClick={() => this.addMemberToSelection(member)}>{member.name} {member.surname}</a>
                                                </div>
                                             ))}

                                            <div className="form-label-group">
                                                <label for="inputDate">Members that have joined:</label>
                                                <br/>
                                                {this.state.membersSelected.map(member =>
                                                    <div class="list-group">
                                                        {member.name} {member.surname}  
                                                        <span className="ml-2"></span>
                                                        <i className="fas fa-trash-alt" onClick = {()=>this.removeMemberFromExcursion(member)}></i>
                                                    </div>
                                                   
                                                )}
                                            </div>

                                            <br />
                                            <button type="button" className="btn btn-primary btn-lg" onClick = {()=>this.context.addExcursion(this.state.excursion, this.state.membersSelected)} disabled={this.state.submitDisabled}>Submit</button>


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

export default AddExcursion;