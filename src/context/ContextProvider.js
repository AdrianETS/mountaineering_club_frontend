import React from 'react';
import { createContext } from "react";

export const AppContext = createContext();

export class ContextProvider extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            membersList: []
        }

        this.getMemberList = this.getMemberList.bind(this);
    }

    getMemberList() {
        return new Promise((resolve, reject) => {
            fetch('http://192.168.0.14:3001/members/list')
            .then(res => res.json())
            .then((json) => {
                this.setState({membersList: json});
            })
        })
    }


    render() {
        return (
            <AppContext.Provider
                value={{
                    ...this.state, getMemberList: this.getMemberList
                }}
            >

                {this.props.children}

            </AppContext.Provider>
        );
    }

}

export const ContextConsumer = AppContext.Consumer;