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
import { JsxEmit } from "typescript";

const api = "https://localhost:44353/api/"

export default class CreateGallery extends React.Component {
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
            filesToUpload: [],
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

    deleteImage(id) {
        fetch(api + "templates/DeleteImage?id="+id, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token')
            },
        }).then(() => {
            var newArray = this.state.files.filter((value, index, arr) => {
                return value.id !== id
            });
            this.setState({
                files: newArray
            });
        });
    }

    uploadImage(imgVal) {
        let image; this.getBase64(imgVal, (result) => {
            fetch(api + "templates/UploadImage",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        pageId: this.state.id,
                        image: result
                    })
                }).then((response) => response.json())
                .then((data) => {
                    let newArray = this.state.files.concat({ id: data.id, base64: data.base64 })
                    this.setState({ files: newArray })
                    console.log(this.state.files)
                })
        })
        // console.log(image)


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
                })
                document.querySelector('#ta1').value = data.contents[1] || '';

            })
    }
    deletePage(){
        fetch(api+"templates/DeactivatePage?id="+this.state.id,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token')
            },
        }).then().then(()=>{
            this.props.history.push("/cms/index");
        })
    }


    handleSubmit(event) {
        event.preventDefault();

        console.log(this.state);

        fetch(api + 'templates/addEditPage', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify({
                "pageId": this.state.id,
                "contents": this.state.texts,
                "images": this.state.filesToUpload
            })
        }).then().then(()=>{this.props.history.push("/cms/index");});
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

                            </Container>
                            <div className="text-center">
                                <h1>Images</h1>
                            </div>
                            <Container>
                                <CardDeck>
                                    <Row>
                                        <Col xl="12">
                                            <Card>
                                                <CardBody>
                                                    <CardTitle>Upload Images</CardTitle>
                                                    <FormGroup>
                                                        <Label for="exampleFile">File</Label>
                                                        <Input type="file" name="imageOne" id="ImageOne"
                                                            onChange={(e) => this.uploadImage(e.target.files[0])} />
                                                        <FormText color="muted">
                                                            This is some placeholder block-level help text for the above input.
                                                            It's a bit lighter and easily wraps to a new line.
                                                        </FormText>
                                                    </FormGroup>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>

                                    <Row>
                                        {

                                            this.state.files.map((image) => {
                                                return <Col md="3" style={{ paddingTop: 20 }}>
                                                    <Card>
                                                        {image.base64 ? <CardImg top width="100%" src={image.base64} alt="Image one" /> : ""}
                                                        <CardBody>
                                                            <Button color="danger"
                                                                onClick={(e) => {
                                                                    this.deleteImage(image.id)
                                                                }}
                                                            >Delete</Button>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            })
                                        }

                                    </Row>

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
                                <Button 
                                color="danger"
                                style={{ float: "right" }}
                                onClick={()=>this.deletePage()}>
                                    Delete Page
                                 </Button>
                            </Container>

                        </form>
                        {this.state.type == 2 ? this.state.tabsComp : ''}
                        {/* {this.state.tabsComp} */}

                    </div>
                </div>
                <DefaultFooter></DefaultFooter>
            </div>

        );
    }
}