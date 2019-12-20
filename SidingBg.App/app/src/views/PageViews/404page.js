import React from "react";

export default class NotFoundPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alias: '',
            type: '',
        }
    }

    render() {
        return (
            <>
            <h1>404</h1>
            <h2>Page not found!</h2>    
            
            </>
        )
    }
}

