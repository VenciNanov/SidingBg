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

export default class CreatePageT1 extends React.Component {
    render() {
        return (
            <div className="App">
                <NavBar />
                <div className=".landing-page">
                    <LandingPageHeader />
                    <div className="section section-about-us">
                        <Container>
                            <Row className="text-center">
                                <Col>
                                    <Label>Header</Label>
                                    <Input type="Input"
                                        onBlur={() => console.log('hahah')}></Input>
                                </Col>
                            </Row>
                            <Row className="text-center">
                                <Col>
                                    <Label>Title</Label>
                                    <Input type="textarea"></Input>
                                </Col>
                            </Row>
                            <Row className="text-center">
                                <Col>
                                    <Label>Paragraph title</Label>
                                    <Input type="Input"></Input>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Row className="text-center">
                                    <Col>
                                        <Label>Paragraph</Label>
                                        <Input type="textarea" ></Input>
                                    </Col>
                                </Row>
                            </FormGroup>
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
                    </div>
                </div>
                <DefaultFooter></DefaultFooter>
            </div>

        );
    }
}