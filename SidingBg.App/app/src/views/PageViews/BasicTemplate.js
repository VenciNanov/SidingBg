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
import { switchCase } from "@babel/types";

const api = "https://localhost:44353/api/"

export default class BasicTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alias: '',
            type: '',
        }
    }

    componentDidMount() {
        fetch(api + 'GetPage?alias=' + this.props.match.params.alias, {
            method: 'GET'
        }).then((res) => res.json())
            .then((data) => {

            })
    }


    render() {
        return (
            <div className="section section-about-us">
                <Container>
                    <Row>
                        <Col className="ml-auto mr-auto text-center" md="8">
                            <h2 className="title">{this.state.texts[0]}</h2>
                            <h5 className="description">
                                {this.state.texts[1]}
                            </h5>
                        </Col>
                    </Row>
                    <div className="separator separator-primary"></div>
                    <div className="section-story-overview">
                        <Row>
                            <Col md="6">
                                <div
                                    className="image-container image-left"
                                    style={{
                                        backgroundImage:
                                            "url(" + require("assets/img/login.jpg") + ")"
                                    }}
                                >
                                </div>
                                <div
                                    className="image-container"
                                    style={{
                                        backgroundImage:
                                            "url(" + require("assets/img/bg3.jpg") + ")"
                                    }}
                                ></div>
                            </Col>
                            <Col md="5">
                                <div
                                    className="image-container image-right"
                                    style={{
                                        backgroundImage:
                                            "url(" + require("assets/img/bg1.jpg") + ")"
                                    }}
                                ></div>
                                <h3>
                                    {this.state.texts[2]}
                                </h3>
                                {this.state.texts[3]}
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        )
    }
}

