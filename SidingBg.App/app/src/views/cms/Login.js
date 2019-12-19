import React from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col,
    Label,
    FormGroup, CardDeck, CardImg, CardTitle, CardSubtitle, CardText,
    FormText, ListGroupItem, ListGroup, Navbar
} from "reactstrap";

// core components
import NavBar from "components/Navbars/CMSNavbar";
import LandingPageHeader from "components/Headers/LandingPageHeader";
import TransparentFooter from "components/Footers/TransparentFooter.js";
import DefaultFooter from "components/Footers/DefaultFooter";


const API = "https://localhost:44353/api/"

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email: "",
            password: ""
        }
        console.log(this.state);
        console.log(localStorage);
    }

    handleSubmit(event) {
        event.preventDefault();

        console.log(this.state)
        fetch(API + "Auth/Login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                'username': this.state.email,
                'password': this.state.password
            })
        }).then((res) => res.json())
        .then((data) => {
            localStorage.setItem("isAuth", true);
            localStorage.setItem('token', data.jwt.token);
            localStorage.setItem('user', data.user);
            this.props.history.push('/cms/index')
            console.log(localStorage)
        }).catch((error) => {
            console.log(error);
            console.log("Email or password are invalid");
        })

    }

    render() {
        const { pages } = this.state;
        return (
            <>
                <NavBar></NavBar>
                <div className="page-header clear-filter" filter-color="blue">

                    <div
                        className="page-header-image"
                        style={{
                            backgroundImage: "url(" + require("assets/img/login.jpg") + ")"
                        }}
                    ></div>
                    <div className="content">
                        <Container>
                            <Col className="ml-auto mr-auto" md="4">
                                <Card className="card-login card-plain">
                                    <form onSubmit={this.handleSubmit}>
                                        <CardHeader className="text-center">
                                            <div className="logo-container">
                                                <img
                                                    alt="..."
                                                    src={require("assets/img/now-logo.png")}
                                                ></img>
                                            </div>
                                        </CardHeader>
                                        <CardBody>
                                            <InputGroup
                                                className={
                                                    "no-border input-lg"
                                                }
                                            >
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="now-ui-icons users_circle-08"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="Email@exam.ple..."
                                                    type="text"
                                                    onChange={(e) => this.setState({ email: e.target.value })}
                                                // onFocus={() => setFirstFocus(true)}
                                                // onBlur={() => setFirstFocus(false)}
                                                ></Input>
                                            </InputGroup>
                                            <InputGroup
                                                className={
                                                    "no-border input-lg"
                                                }
                                            >
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="now-ui-icons text_caps-small"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="Password..."
                                                    type="password"
                                                    onChange={(e) => this.setState({ password: e.target.value })}
                                                ></Input>
                                            </InputGroup>
                                        </CardBody>
                                        <CardFooter className="text-center">
                                            <Button
                                                block
                                                className="btn-round"
                                                color="info"
                                                type="submit"
                                                size="lg"
                                            >
                                                Login
                                        </Button>
                                        </CardFooter>
                                    </form>
                                </Card>
                            </Col>
                        </Container>
                    </div>
                    <TransparentFooter ></TransparentFooter>
                </div>
            </>
        );
    }
}
