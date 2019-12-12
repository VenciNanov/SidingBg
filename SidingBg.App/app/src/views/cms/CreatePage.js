import React from "react";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
    FormText
} from "reactstrap";

// core components
import NavBar from "components/Navbars/CMSNavbar";
import LandingPageHeader from "components/Headers/LandingPageHeader";
import TransparentFooter from "components/Footers/TransparentFooter.js";
import DefaultFooter from "components/Footers/DefaultFooter";

const api = "https://localhost:44353/api/"

export default class CreatePage extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            id:"",
            name: "test",
            texts: [],
            pageName: ""
        };
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        fetch(api + "templates/AddEditPage?id=" + this.props.match.params.id, {
            method: "GET",
            headers: { 'Content-type': 'application/json' },

        }).then((res) => res.json())
            .then((data) => this.setState({ pageName: data.pageName, id: data.pageId }))
    }


    handleSubmit(event) {
        event.preventDefault();

        console.log(this.state.texts)

        fetch(api + 'templates/addEditPage', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "pageId": this.state.id,
                "contents": this.state.texts,
            })
        });
        // this.props.history.push('/');
    };

    render() {
        return (
            <div className="App">
                <NavBar />
                <div className=".landing-page">
                    <LandingPageHeader />
                    <div className="section section-about-us">
                        <h1>{this.state.pageName}</h1>
                        <form onSubmit={this.handleSubmit}>
                            <Container>
                                <Row className="text-center">
                                    <Col>
                                        <Label>Header</Label>
                                        <Input type="Input"
                                            onBlur={(e) => this.state.texts[0] = e.target.value}></Input>
                                    </Col>
                                </Row>
                                <Row className="text-center">
                                    <Col>
                                        <Label>Title</Label>
                                        <Input
                                            onBlur={(e) => this.state.texts[1] = e.target.value}
                                            type="textarea"></Input>
                                    </Col>
                                </Row>
                                <Row className="text-center">
                                    <Col>
                                        <Label>Paragraph title</Label>
                                        <Input
                                            onBlur={(e) => this.state.texts[2] = e.target.value}
                                            type="Input"></Input>
                                    </Col>
                                </Row>
                                <FormGroup>
                                    <Row className="text-center">
                                        <Col>
                                            <Label>Paragraphq</Label>
                                            <Input
                                                onBlur={(e) => this.state.texts[3] = e.target.value}
                                                type="textarea" ></Input>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <Button
                                    block
                                    className="btn-round"
                                    color="info"
                                    size="lg"
                                    type="submit"
                                >
                                    Get Started
                    </Button>
                            </Container>
                            <div className="text-center">
                                <h1>Images</h1>
                            </div>
                            <Container>
                                <CardDeck>
                                    <Card>
                                        <CardBody>
                                            <CardTitle>Image 1</CardTitle>
                                            <FormGroup>
                                                <Label for="exampleFile">File</Label>
                                                <Input type="file" name="imageOne" id="ImageOne" />
                                                <FormText color="muted">
                                                    This is some placeholder block-level help text for the above input.
                                                    It's a bit lighter and easily wraps to a new line.
                                            </FormText>
                                            </FormGroup>
                                            <Button>Button</Button>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                                        <CardBody>
                                            <CardTitle>Image 2</CardTitle>
                                            <FormGroup>
                                                <Label for="exampleFile">File</Label>
                                                <Input type="file" name="imageTwo" id="ImageTwo" />
                                                <FormText color="muted">
                                                    This is some placeholder block-level help text for the above input.
                                                    It's a bit lighter and easily wraps to a new line.
                                            </FormText>
                                            </FormGroup>
                                            <Button>Button</Button>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                                        <CardBody>
                                            <CardTitle>Image 3</CardTitle>
                                            <FormGroup>
                                                <Label for="exampleFile">File</Label>
                                                <Input type="file" name="imageThree" id="ImageThree" />
                                                <FormText color="muted">
                                                    This is some placeholder block-level help text for the above input.
                                                    It's a bit lighter and easily wraps to a new line.
                                            </FormText>
                                            </FormGroup>
                                            <Button>Button</Button>
                                        </CardBody>
                                    </Card>
                                </CardDeck>
                            </Container>
                        </form>
                    </div>
                </div>
                <DefaultFooter></DefaultFooter>
            </div>

        );
    }
}