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




export default class SuccessAlert extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
        }

    }



    render() {
        const { message,isOpen } = this.props;
        return (
            <>
                <Alert color="success">
                    <Container>
                        <div className="alert-icon">
                            <i className="now-ui-icons ui-2_like"></i>
                        </div>
                        {message}
                        <button
                            type="button"
                            className="close"
                            onClick={() => setAlert1(false)}
                        >
                            <span aria-hidden="true">
                                <i className="now-ui-icons ui-1_simple-remove"></i>
                            </span>
                        </button>
                    </Container>
                </Alert>
            </>
        );
    }
}
