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
        console.log(this.props.contentId)
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

    componentDidMount() {

    }


    handleSubmit(event) {
        event.preventDefault();

        console.log(this.state);

        fetch(api + 'templates/saveTabs', {
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
        console.log(this.state.createTabName)

        fetch(api + "templates/createTab", {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'contentId': this.state.contentId,
                'tabName': this.state.createTabName,
            })
        }).then((data => {
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
                            <Col className="ml-auto mr-auto" md="10" xl="12">
                                <p className="category">Tabs with Icons on Card</p>
                                <form onSubmit={this.handleSubmit}>
                                    <Card>
                                        <CardHeader>
                                            <Nav className="justify-content-center" role="tablist" tabs>

                                                {
                                                    this.state.tabs.map((tab, i) => {
                                                        console.log(i + 1)
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
                                                        <p>
                                                            {i + 1}
                                                            <Input
                                                                onChange={(e) => tab.text = e.target.value || ""}
                                                                defaultValue={tab.text}
                                                                type="textarea"></Input>
                                                        </p>
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