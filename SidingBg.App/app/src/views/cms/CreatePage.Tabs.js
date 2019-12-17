import React from "react";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    FormGroup, CardDeck, CardImg, CardTitle, CardSubtitle, CardText,
    FormText,
    
    Input,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    Modal,
    ModalBody
} from "reactstrap";

// core components
import NavBar from "components/Navbars/CMSNavbar";
import LandingPageHeader from "components/Headers/LandingPageHeader";
import TransparentFooter from "components/Footers/TransparentFooter.js";
import DefaultFooter from "components/Footers/DefaultFooter";

const api = "https://localhost:44353/api/"

export default class CreateTabs extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitCreateTab = this.handleSubmitCreateTab.bind(this);
        this.state = {
            id: "",
            contentId: this.props.contentId,
            tabs: this.props.tabs,
            iconPills: '1',
            setIconPills: 1,
            pills: '1',
            setPills: '1',
            setModal: false
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

    handleSubmit(event) {
        event.preventDefault();

        fetch(api + 'Templates/SaveTabs', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "contentId": this.state.contentId,
                "tabs": this.state.tabs
            })
        });
        // this.props.history.push('/');
    };

    handleSubmitCreateTab(event) {
        event.preventDefault();

        fetch(api + "templates/createTab", {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'contentId': this.state.contentId,
                'tabName': this.state.createTabName,
            })
        }).then((res) => res.json()).then((data => {

            this.setState({ tabs: data })
            this.setState({ setModal: false });
        }))
    }

    render() {
        const { iconPills, setIconPills } = this.state;
        const { pills, setPills } = this.state;
        return (
            <>
                <div className="section section-tabs">
                    <Container>
                        <Row>
                            <Button
                                color="info"
                                className="mr-1"
                                onClick={() => this.setState({ setModal: true })}
                            >
                                <i className="now-ui-icons  ui-1_simple-add"> </i>&nbsp;
                             Add new tab
              </Button>
              {this.state.tabs.length>0?
                            <Col className="ml-auto mr-auto" md="10" xl="12">                                
                                <form onSubmit={this.handleSubmit}>
                                    <Card>
                                        <CardHeader>
                                            <Nav className="justify-content-center" role="tablist" tabs>

                                                {
                                                    this.state.tabs.map((tab, i) => {
                                                        return <NavItem key={i}><NavLink
                                                            className={setIconPills == (i + 1) ? "active" : ""}
                                                            href="#pablo"
                                                            onClick={e => {
                                                                e.preventDefault();
                                                                this.setState({ setIconPills: (i + 1) });
                                                            }}
                                                        >
                                                            {tab.name}
                                                        </NavLink></NavItem>
                                                    })
                                                }
                                            </Nav>
                                        </CardHeader>
                                        <CardBody>
                                            <TabContent
                                                className="text-center"
                                                activeTab={"iconPills" + setIconPills}
                                            >
                                                {this.state.tabs.map((tab, i) => {
                                                    return <TabPane tabId={"iconPills" + (i + 1)}>
                                                        Text content
                                                        <p>                                                            
                                                            <Input
                                                                onChange={(e) => tab.text = e.target.value || ""}
                                                                defaultValue={tab.text}
                                                                type="textarea"></Input>
                                                        </p>
                                                        <Row>
                                                            <Col xl="3">
                                                            <img src={tab.images[0]}/></Col>
                                                        </Row>
                                                        <Col className="">                                                        
                                                        Upload image (not required)
                                                            <Input
                                                                onChange={(e) =>this.getBase64(e.target.files[0], (result) => {
                                                                    tab.images[0] = result })}
                                                                type="file"></Input>
                                                        </Col>
                                                    </TabPane>
                                                })}
                                            </TabContent>
                                        </CardBody>
                                        <Button color="info" type="submit">
                                            Save tabs
                  </Button>
                                    </Card>
                                </form>
                            </Col>
                             :""}
                        </Row>
                    </Container>
                    <Modal isOpen={this.state.setModal} toggle={() => this.setState({ setModal: false })}>
                        <div className="modal-header justify-content-center">
                            <button
                                className="close"
                                type="button"
                                onClick={() => this.setState({ setModal: false })}
                            >
                                <i className="now-ui-icons ui-1_simple-remove"></i>
                            </button>
                            <h4 className="title title-up">Create Tab</h4>
                        </div>
                        <form onSubmit={this.handleSubmitCreateTab}>
                            <ModalBody>
                                <label>Tab name</label>
                                <Input type="Input"
                                    onChange={(e) => this.setState({ createTabName: e.target.value })}
                                ></Input>


                            </ModalBody>
                            <div className="modal-footer">
                                <Button
                                    color="danger"
                                    type="button"
                                    onClick={() => this.setStates({ setModal: false })}
                                >
                                    Cancel
                  </Button>
                                <Button color="info" type="submit">
                                    Create
                  </Button>
                            </div>
                        </form>
                    </Modal>
                </div>
            </>
        );
    }
}