import React from "react";

// reactstrap components
import {
    Button,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar";
import LandingPageHeader from "components/Headers/LandingPageHeader";
import DefaultFooter from "components/Footers/DefaultFooter.js";
import BasicTemplate from "views/PageViews/BasicTemplate";
import { stat } from "fs";


const api = "https://localhost:44353/api/pages/"

export default class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alias: '',
            type: '',
            
        }
    }

    componentDidMount() {
        fetch(api + 'GetPageInfo?alias=' + this.props.match.params.alias, {
            method: 'GET'
        }).then((res) => res.json())
            .then((data) => {
                
                this.setState({ pageComponent:this.returnPageTemplateComponent(data.type,this.props.match.params.alias)});
               
            })
    }

    returnPageTemplateComponent(type,alias) {
        switch (type) {
            case 1:
                return <BasicTemplate alias={alias}></BasicTemplate>
            case 2:
                return ""
            case 3:
                return ""
            default:
                console.log("boom")
        }
    }

    render() {
        return (
            <div>
                <IndexNavbar />
                <div className="wrapper">
                    <LandingPageHeader />
                    <div className="">
                        <Container>
                            {this.state.pageComponent||''}
                        </Container>
                    </div>
                    <DefaultFooter />
                </div>
            </div>
        )
    }
}

