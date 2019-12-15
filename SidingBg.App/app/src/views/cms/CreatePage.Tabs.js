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
    FormText,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
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
        this.state = {
            id: "",
            contentId: "",
            iconPills: '1',
            setIconPills: '1',
            pills: '1',
            setPills: '1'

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
        const { iconPills, setIconPills } = this.state;
        const { pills, setPills } = this.state;
        return (
            <>
                <div className="section section-tabs">
                    <Container>
                        <Row>
                            <Col className="ml-auto mr-auto" md="10" xl="12">
                                <p className="category">Tabs with Icons on Card</p>
                                <Card>
                                    <CardHeader>
                                        <Nav className="justify-content-center" role="tablist" tabs>
                                            <NavItem>
                                                <NavLink
                                                    className={setIconPills === "1" ? "active" : ""}
                                                    href="#pablo"
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        this.setState({ setIconPills: "1" });
                                                    }}
                                                >
                                                    <i className="now-ui-icons objects_umbrella-13"></i>
                                                    Home
                            </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={setIconPills === "2" ? "active" : ""}
                                                    href="#pablo"
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        this.setState({ setIconPills: "2" });
                                                    }}
                                                >
                                                    <i className="now-ui-icons shopping_cart-simple"></i>
                                                    Profile
                            </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={setIconPills === "3" ? "active" : ""}
                                                    href="#pablo"
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        this.setState({ setIconPills: "3" });
                                                    }}
                                                >
                                                    <i className="now-ui-icons shopping_shop"></i>
                                                    Messages
                            </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={setIconPills === "4" ? "active" : ""}
                                                    href="#pablo"
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        this.setState({ setIconPills: "4" });
                                                    }}
                                                >
                                                    <i className="now-ui-icons ui-2_settings-90"></i>
                                                    Settings
                            </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </CardHeader>
                                    <CardBody>
                                        <TabContent
                                            className="text-center"
                                            activeTab={"iconPills" + setIconPills}
                                        >
                                            <TabPane tabId="iconPills1">
                                                <p>
                                                    I think that’s a responsibility that I have, to push
                                                    possibilities, to show people, this is the level that
                                                    things could be at. So when you get something that has
                                                    the name Kanye West on it, it’s supposed to be pushing
                                                    the furthest possibilities. I will be the leader of a
                                                    company that ends up being worth billions of dollars,
                                                    because I got the answers. I understand culture. I am
                                                    the nucleus.
                            </p>
                                            </TabPane>
                                            <TabPane tabId="iconPills2">
                                                <p>
                                                    I will be the leader of a company that ends up being
                                                    worth billions of dollars, because I got the answers. I
                                                    understand culture. I am the nucleus. I think that’s a
                                                    responsibility that I have, to push possibilities, to
                                                    show people, this is the level that things could be at.
                                                    I think that’s a responsibility that I have, to push
                                                    possibilities, to show people, this is the level that
                                                    things could be at.
                            </p>
                                            </TabPane>
                                            <TabPane tabId="iconPills3">
                                                <p>
                                                    I think that’s a responsibility that I have, to push
                                                    possibilities, to show people, this is the level that
                                                    things could be at. So when you get something that has
                                                    the name Kanye West on it, it’s supposed to be pushing
                                                    the furthest possibilities. I will be the leader of a
                                                    company that ends up being worth billions of dollars,
                                                    because I got the answers. I understand culture. I am
                                                    the nucleus.
                            </p>
                                            </TabPane>
                                            <TabPane tabId="iconPills4">
                                                <p>
                                                    "I will be the leader of a company that ends up being
                                                    worth billions of dollars, because I got the answers. I
                                                    understand culture. I am the nucleus. I think that’s a
                                                    responsibility that I have, to push possibilities, to
                                                    show people, this is the level that things could be at."
                            </p>
                                            </TabPane>
                                        </TabContent>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </>
        );
    }
}