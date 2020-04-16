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
            usersInExcursion: [], // listado de las ids de los usuarios que se han unido. Es el atributo que pasaremos como parámetro a la función que invocamos con el submit
            fullListOfMembers: [], // la id de todos los usuarios que existen actualmente en members
            restOfMembers: [], //usuarios que no se han unido a esta excursion
            editEnabled: false,
            id: this.props.location?.state?.id
        }

        this.goBack = this.goBack.bind(this);
        this.deleteMemberInExcursion = this.deleteMemberInExcursion.bind(this);
        this.addMemberInExcursion = this.addMemberInExcursion.bind(this);
        this.handleExcursionName = this.handleExcursionName.bind(this);
        this.handleExcursionDate = this.handleExcursionDate.bind(this);
        this.setMembersOfAddSection = this.setMembersOfAddSection.bind(this);

    }

    componentDidMount() {
        this.context.getExcursionInfo(this.state.id)
        .then(excursion => this.setState({ excursion: excursion, usersInExcursion: excursion.members_info}))
        .then(()=> this.context.getMemberList())
        .then(()=> this.setMembersOfAddSection());        
    }


    setMembersOfAddSection(){ //seteamos el atributo que recoge las ids de los usuarios que no se han unido a la excursion en pantalla
        let restOfMembers= [];      
        restOfMembers = this.context.membersList.filter(member => 
            this.state.excursion.users_id.indexOf(member._id) < 0
            
        );
        this.setState({restOfMembers: restOfMembers});
    }

    goBack() {
        this.props.history.push("/listexcursions");
    }

    handleExcursionName(event){
        this.setState({ excursion: { ...this.state.excursion, name: event.target.value }});
    }

    handleExcursionDate(event){
        this.setState({ excursion: { ...this.state.excursion, date: event.target.value }});
    }

    addMemberInExcursion(id){
        let restOfMembers = this.state.restOfMembers.filter(member => member._id != id);
        let listOfMembersUpdated = this.state.usersInExcursion.push(this.context.membersList.find(e => e._id == id));
        this.setState({restOfMembers: restOfMembers, usersId: listOfMembersUpdated });
    }

    deleteMemberInExcursion(id){
      let newRestOfMembers = this.state.restOfMembers;
      newRestOfMembers.push(this.context.membersList.find(e => e._id == id));
      let newUsersInExcursion = this.state.usersInExcursion.filter(user => user._id !=id);
      this.setState({restOfMembers: newRestOfMembers, usersInExcursion: newUsersInExcursion});
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
                                                <input type="text" id="inpurExcursionName" className="form-control" value={this.state.excursion.name} onChange = {this.handleExcursionName} placeholder="Name" required autofocus />

                                            </div>

                                            <div className="form-label-group">
                                                <label for="inputDate">Date</label>
                                                <input type="text" id="inputDate" className="form-control" value={this.state.excursion.date} onChange = {this.handleExcursionDate} placeholder="Date" required />
                                            </div>

                                            <br/>
                                            <div className="form-label-group">
                                                <label for="inputDate">Members that have joined:</label>
                                            </div>


                                            {this.state.usersInExcursion.map(member =>
                                            
                                                <div>
                                                    <br/>
                                                            
                                                            Name: {member.name} {member.surname} 
                                                            <span className="ml-2"></span>
                                                            <i className="fas fa-info-circle" data-toggle="collapse" data-target={"#collapseId" + member._id} role="button" aria-expanded="false" aria-controls={"#collapseId" + member._id}>
                                                            
                                                            <div className="collapse" style = {{padding: "20px", marginTop: "20px", fontFamily: "Verdana", fontWeight: "normal", fontSize: "12px"}} id={"collapseId" + member._id} font-family>
                                                                <div className="card card-body">
                                                                    Name: {member.name}
                                                                    <br/>
                                                                    Surname: {member.surname}
                                                                    <br/>
                                                                    Birth Date: {member.birthDate}
                                                                    <br/>
                                                                    Club Id: {member.clubId}
                                                                    <br/>
                                                                    License Number: {member.licenseNumber}
                                                                    <br/>
                                                                    Type: {member.type}
                                                                 </div>
                                                                </div>
                                                            </i>
                                                            <span className="ml-2"></span>

                                                            <i className="fas fa-trash-alt" onClick = {()=>this.deleteMemberInExcursion(member._id)}></i> 
                                                            
                                                            
                                                </div>
                                            )}

                                            <br/>
                                            <div className="form-label-group">
                                                <label for="inputDate">Add other members</label>
                                            </div>

    
                                                {this.state.restOfMembers && this.state.restOfMembers.map(member =>
                                                <div> <br/>Name: {member.name} Surname: {member.surname} <span className="ml-2"></span> <i class="fas fa-plus-circle" onClick = {() => this.addMemberInExcursion(member._id)}></i></div>
                                              )}
                                            

                                            <br/>                    
                                            <button type="button" style = {{marginRight: "150px"}} className="btn btn-primary btn-lg" onClick = {()=>(this.context.editExcursion(this.state.excursion, this.state.usersInExcursion)).then(()=>this.goBack())}>Submit</button>
                                            
                                            <button type="button" className="btn btn-danger btn-lg" data-toggle="modal" data-target="#deleteModal">Delete
                                            </button>

                                            <div className="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalTitle" aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-centered" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLongTitle">Confirmation</h5>
                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
                                                            Are you sure you want to delete the excursion?
                                                            </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                                            <button type="button" className="btn btn-primary" onClick={() => (this.context.deleteExcursion(this.state.excursion._id)).then(this.goBack)} data-dismiss="modal">Delete</button>
                                                        </div>
                                                    </div>
                                                  </div>
                                                </div>

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