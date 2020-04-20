import React from 'react';
import { createContext } from "react";
export const AppContext = createContext();

export class ContextProvider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            membersList: [],
            excursionList: [],
            selectedMember: "",
            memberId: "",
            excursionId: "",
            selectedExcursion: ""
        }

        this.getMemberList = this.getMemberList.bind(this);
        this.getMemberInfo = this.getMemberInfo.bind(this);
        this.editMember = this.editMember.bind(this);
        this.deleteMember = this.deleteMember.bind(this);
        this.addMember = this.addMember.bind(this);
        this.addExcursion = this.addExcursion.bind(this);
        this.getExcursionList = this.getExcursionList.bind(this);
        this.getExcursionInfo = this.getExcursionInfo.bind(this);
        this.editExcursion = this.editExcursion.bind(this);
    }

    getTokenFromLocalStorage() {
        return window.localStorage.getItem('token');
    }

    checkToken(ctx) {
        if (!this.getTokenFromLocalStorage()){
            ctx.props.history.push("/login");
        } 
            
    }

    getMemberList(history) {
        return new Promise((resolve, reject) => {
            fetch('http://127.0.0.1:3001/members/list?token=' + this.getTokenFromLocalStorage())
                .then(res => {
                    if (res.status != 200) {
                        history.push("/login");
                        reject();
                    }
                    return res.json();
                })
                .then((json) => {
                    this.setState({ membersList: json });
                    resolve(json);
                })
        })
    }

    getExcursionList(history) {
        return new Promise((resolve, reject) => {
            fetch('http://127.0.0.1:3001/excursions/list?token=' + this.getTokenFromLocalStorage())
                .then(res => {
                    if (res.status != 200) {
                        history.push("/login");
                        reject();
                    }
                    return res.json();
                })
                .then((json) => {
                    this.setState({ excursionList: json });
                })
        })
    }

    getMemberInfo(history, id) {
        return new Promise((resolve, reject) => {
            fetch('http://127.0.0.1:3001/members/' + id + '?token=' + this.getTokenFromLocalStorage())
                .then(res => {
                    if (res.status != 200) {
                        history.push("/login");
                        reject();
                    }
                    return res.json();
                })
                .then((json) => {
                    this.setState({ memberId: id });
                    this.setState({ selectedMember: json });
                    resolve(json);
                })
        })
    }

    getExcursionInfo(history, id) {
        return new Promise((resolve, reject) => {
            fetch('http://127.0.0.1:3001/excursions/' + id + '?token=' + this.getTokenFromLocalStorage())
                .then(res => {
                    if (res.status != 200) {
                        history.push("/login");
                        reject();
                    }
                    return res.json();
                })
                .then((json) => {
                    this.setState({ excursionId: id });
                    this.setState({ selectedExcursion: json });
                    resolve(json && json[0]);
                })
        })
    }

    addMember(member) {
        return new Promise((resolve, reject) => {
            fetch('http://127.0.0.1:3001/members', {
                method: 'POST',
                body: JSON.stringify({
                    name: member.name,
                    surname: member.surname,
                    birthDate: member.birthDate,
                    clubId: member.clubId,
                    licenseNumber: member.licenseNumber,
                    type: member.type,
                    password: member.password,
                    responsibilityAgreementSigned: (member.responsibilityAgreementSigned === "true" && true) || false

                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(response => response.json());
        })
    }

    addExcursion(excursion, users) {
        let usersAdded = users.map(member => member._id);
        return new Promise((resolve, reject) => {
            fetch('http://127.0.0.1:3001/excursions', {
                method: 'POST',
                body: JSON.stringify({
                    name: excursion.name,
                    date: excursion.date,
                    users_id: usersAdded
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(response => response.json());
        })
    }

    editMember(history, member) {
        return new Promise((resolve, reject) => {
            fetch('http://127.0.0.1:3001/members?token=' + this.getTokenFromLocalStorage(), {
                method: 'PUT',
                body: JSON.stringify({
                    _id: member._id,
                    name: member.name,
                    surname: member.surname,
                    birthDate: member.birthDate,
                    clubId: member.clubId,
                    licenseNumber: member.licenseNumber,
                    type: member.type,
                    password: member.password,
                    responsibilityAgreementSigned: (member.responsibilityAgreementSigned === "true" && true) || false
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(res => {
                    if (res.status != 200) {
                        history.push("/login");
                        reject();
                    }
                    return res.json();
                })
                .then(json => resolve(json));


        })
    }

    editExcursion(excursion, usersInExcursion) {
        let usersIdsAdded = usersInExcursion.map(user => user._id);
        return new Promise((resolve, reject) => {
            fetch('http://127.0.0.1:3001/excursions', {
                method: 'PUT',
                body: JSON.stringify({
                    _id: excursion._id,
                    name: excursion.name,
                    date: excursion.date,
                    users_id: usersIdsAdded
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })

                .then(response => response.json())
                .then(json => resolve(json));


        })
    }

    deleteMember(id) {
        return new Promise((resolve, reject) => {
            fetch('http://127.0.0.1:3001/members/delete/' + id)
                .then(res => res.json())
                .then(() => {
                    resolve();
                })
        })
    }

    deleteExcursion(id) {
        return new Promise((resolve, reject) => {
            fetch('http://127.0.0.1:3001/excursions/delete/' + id)
                .then(res => res.json())
                .then(() => {
                    resolve();
                })
        })
    }


    render() {
        return (
            <AppContext.Provider
                value={{
                    ...this.state, getMemberList: this.getMemberList, getMemberInfo: this.getMemberInfo, editMember: this.editMember, deleteMember: this.deleteMember,
                    addMember: this.addMember, getExcursionList: this.getExcursionList, getExcursionInfo: this.getExcursionInfo, editExcursion: this.editExcursion,
                    addExcursion: this.addExcursion, deleteExcursion: this.deleteExcursion, getTokenFromLocalStorage: this.getTokenFromLocalStorage,
                    checkToken: this.checkToken
                }}
            >

                {this.props.children}

            </AppContext.Provider>
        );
    }

}

export const ContextConsumer = AppContext.Consumer;