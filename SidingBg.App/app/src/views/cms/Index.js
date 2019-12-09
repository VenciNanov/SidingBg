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
    FormText, ListGroupItem, ListGroup
} from "reactstrap";

// core components
import NavBar from "components/Navbars/CMSNavbar";
import LandingPageHeader from "components/Headers/LandingPageHeader";
import TransparentFooter from "components/Footers/TransparentFooter.js";
import DefaultFooter from "components/Footers/DefaultFooter";


const API = "https://localhost:44353/api/Templates/GetAll"

export default class CMSIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: []
        }
    }

    componentDidMount() {
        fetch(API)
            .then(response => response.json())
            .then(data => {
                this.setState({ pages: data.pages })
                // console.log(this.state.pages)
            });

    }

    render() {
        const { pages } = this.state;
        return (
            <div className="App">
                <NavBar />
                <div className=".landing-page">
                    <LandingPageHeader />
                    <Row className="text-center">
                        <Col>
                            <h2>All Pages</h2>
                            
                        </Col>
                    </Row>
                    <Container>
                        <ListGroup>
                            {pages.map(page => {
                                var url = `/cms/edit/${page.pageId}`
                                return <ListGroupItem tag="a" href={url} key={page.key} >{page.controller}/{page.page}</ListGroupItem>
                            })}
                        </ListGroup>
                    </Container>
                </div>
                <DefaultFooter ></DefaultFooter>
            </div>
        );
    }
}
