import React from "react";

// core components

const api = "https://localhost:44353/api/"

export default class Logout extends React.Component {
    constructor(props){
        super(props)
        localStorage.clear();
        this.props.history.push('/cms/login');
    }

    render(){
        return(
            <></>
        )
    }
}