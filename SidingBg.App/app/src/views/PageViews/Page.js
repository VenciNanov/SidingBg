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
                this.setState({ type: data.type })
            })
    }

    returnPageTemplateComponent(type) {
        switch (type) {
            case 1:
                return <BasicTemplate props={this.state.alias}></BasicTemplate>
            case 2:
                return ""
            case 3:
                return ""
        }
    }

    render() {
        return (
            <div>
                <IndexNavbar />
                <div className="wrapper">
                    <LandingPageHeader />
                    <div className="section section-about-us">
                        <Container>
                            {this.returnPageTemplateComponent()}
                        </Container>
                    </div>
                    <DefaultFooter />
                </div>
            </div>
        )
    }
}

