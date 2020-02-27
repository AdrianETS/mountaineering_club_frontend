import React from 'react';
import { createContext } from "react";
export const AppContext = createContext();

export class ContextProvider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            membersList: [],
            selectedMember: "",
            memberId: ""
        }

        this.getMemberList = this.getMemberList.bind(this);
        this.getMemberInfo = this.getMemberInfo.bind(this);
        this.editMember = this.editMember.bind(this);
    }

    getMemberList() {
        return new Promise((resolve, reject) => {
            fetch('http://127.0.0.1:3001/members/list')
                .then(res => res.json())
                .then((json) => {
                    this.setState({ membersList: json });
                })
        })
    }

    getMemberInfo(id) {
        return new Promise((resolve, reject) => {
            fetch('http://127.0.0.1:3001/members/' + id)
                .then(res => res.json())
                .then((json) => {
                    this.setState({ memberId: id });
                    this.setState({ selectedMember: json });
                    resolve(json);
                })
        })
    }
 
    editMember(member) {
        return new Promise((resolve, reject) => {
            fetch('http://127.0.0.1:3001/members', {
                method: 'PUT',
                body: JSON.stringify({
                    _id: member._id,
                    name: member.name,
                    surname: member.surname,
                    birthDate: Date(member.birthDate),
                    clubId: member.clubId,
                    licenseNumber: member.licenseNumber,
                    type: member.type,
                    responsibilityAgreementSigned: (member.agreement==="true" && true) || false
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(response => response.json())
                .then(json => console.log(json))
        })
    }


    render() {
        return (
            <AppContext.Provider
                value={{
                    ...this.state, getMemberList: this.getMemberList, getMemberInfo: this.getMemberInfo, editMember: this.editMember
                }}
            >

                {this.props.children}

            </AppContext.Provider>
        );
    }

}

export const ContextConsumer = AppContext.Consumer;