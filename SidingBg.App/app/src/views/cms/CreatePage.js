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
import CreateTabs from 'views/cms/CreatePage.Tabs';

const api = "https://localhost:44353/api/"

export default class CreatePage extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            id: "",
            name: "test",
            texts: [],
            files: [],
            pageName: "",
            textsValues: [],
            contentId: '',
        };
    }

    getBase64(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    componentDidMount() {
        console.log(document.querySelector("#ta1"))
        fetch(api + "templates/AddEditPage?id=" + this.props.match.params.id, {
            method: "GET",
            headers: { 'Content-type': 'application/json' },
        }).then((res) => res.json())
            .then((data) => {
                this.setState({
                    texts: data.contents,
                    pageName: data.pageName,
                    id: data.pageId,
                    files: data.images,
                    type: data.type,
                    contentId: data.contentId,
                    tabsComp: <CreateTabs contentId={data.contentId} tabs={data.tabs}></CreateTabs>
                })
                document.querySelector('#ta1').value = data.contents[1] || '';
                document.querySelector('#ta2').value = data.contents[3] || '';

            })
    }

    handleSubmit(event) {
        event.preventDefault();

        console.log(this.state);

        fetch(api + 'templates/addEditPage', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "pageId": this.state.id,
                "contents": this.state.texts,
                "images": this.state.files
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
                        <div className="text-center">
                            Page name
                        <h1>{this.state.pageName}</h1>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <Container>
                                <Row className="text-center">
                                    <Col>
                                        <Label>Header</Label>
                                        <Input type="Input"
                                            onChange={(e) => this.state.texts[0] = e.target.value || ""}
                                            defaultValue={this.state.texts[0] || ''}></Input>
                                    </Col>
                                </Row>
                                <Row className="text-center">
                                    <Col>
                                        <Label>Title</Label>
                                        <Input
                                            id="ta1"
                                            onChange={(e) => this.state.texts[1] = e.target.value || ""}
                                            defaultValue={this.state.texts[1]}
                                            type="textarea"></Input>
                                    </Col>
                                </Row>
                                <Row className="text-center">
                                    <Col>
                                        <Label>Paragraph title</Label>
                                        <Input
                                            onChange={(e) => this.state.texts[2] = e.target.value || ""}
                                            defaultValue={this.state.texts[2] || ''}
                                            type="Input"></Input>
                                    </Col>
                                </Row>
                                <FormGroup>
                                    <Row className="text-center">
                                        <Col>
                                            <Label>Paragraph</Label>
                                            <Input
                                                id="ta2"
                                                onChange={(e) => this.state.texts[3] = e.target.value || ""}
                                                defaultValue={this.state.texts[3] || ''}
                                                type="textarea" ></Input>
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
                                       {this.state.files[0] ? <CardImg top width="100%" src={this.state.files[0]} alt="Image one" /> :""} 
                                        <CardBody>
                                            <CardTitle>Image 1</CardTitle>
                                            <FormGroup>
                                                <Label for="exampleFile">File</Label>
                                                <Input type="file" name="imageOne" id="ImageOne"
                                                    onChange={(e) => this.getBase64(e.target.files[0], (result) => {
                                                        this.state.files[0] = result;
                                                    })} />
                                                <FormText color="muted">
                                                    This is some placeholder block-level help text for the above input.
                                                    It's a bit lighter and easily wraps to a new line.
                                            </FormText>
                                            </FormGroup>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                    {this.state.files[1] ? <CardImg top width="100%" src={this.state.files[1]} alt="Image one" /> :""} 
                                        <CardBody>
                                            <CardTitle>Image 2</CardTitle>
                                            <FormGroup>
                                                <Label for="exampleFile">File</Label>
                                                <Input type="file" name="imageTwo" id="ImageTwo"
                                                    onChange={(e) => this.getBase64(e.target.files[0], (result) => {
                                                        this.state.files[1] = result;
                                                    })}
                                                />
                                                <FormText color="muted">
                                                    This is some placeholder block-level help text for the above input.
                                                    It's a bit lighter and easily wraps to a new line.
                                            </FormText>
                                            </FormGroup>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                    {this.state.files[2] ? <CardImg top width="100%" src={this.state.files[2]} alt="Image one" /> :""} 
                                        <CardBody>
                                            <CardTitle>Image 3</CardTitle>
                                            <FormGroup>
                                                <Label for="exampleFile">File</Label>
                                                <Input type="file" name="imageThree" id="ImageThree"
                                                    onChange={(e) => this.getBase64(e.target.files[0], (result) => {
                                                        this.state.files[2] = result;
                                                    })} />
                                                <FormText color="muted">
                                                    This is some placeholder block-level help text for the above input.
                                                    It's a bit lighter and easily wraps to a new line.
                                            </FormText>
                                            </FormGroup>                                            
                                        </CardBody>
                                    </Card>
                                </CardDeck>

                                <Button
                                    block
                                    className="btn-round"
                                    color="info"
                                    size="lg"
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </Container>

                        </form>
                        {this.state.type == 2 ? this.state.tabsComp: ''}
                        {/* {this.state.tabsComp} */}

                    </div>
                </div>
                <DefaultFooter></DefaultFooter>
            </div>

        );
    }
}