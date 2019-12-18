import React from "react";

// reactstrap components
import {
    Button,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    Nav,
    NavItem,
    NavLink,
    CardBody,
    TabContent,
    TabPane
} from "reactstrap";

// core components


const api = "https://localhost:44353/api/Pages/"

export default class TabsTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alias: '',
            type: '',
            texts: [],
            files: [],
            tabs: [],
            setIconPills: 1,
        }
    }

    componentDidMount() {
        console.log(this.props.alias)
        fetch(api + 'GetPage?alias=' + this.props.alias, {
            method: 'GET'
        }).then((res) => res.json())
            .then((data) => {
                this.setState({ texts: data.contents, files: data.images, tabs: data.tabs });
                if (this.state.files[0] !== undefined) document.querySelector('#img1').style.backgroundImage = "url(" + this.state.files[0].base64 || '' + ")";
                if (this.state.files[1] !== undefined) document.querySelector('#img2').style.backgroundImage = "url(" + this.state.files[1].base64 || '' + ")";
                if (this.state.files[2] !== undefined) document.querySelector('#img3').style.backgroundImage = "url(" + this.state.files[2].base64 || '' + ")";
            })
    }


    render() {
        const { iconPills, setIconPills } = this.state;
        return (
            <div className="">
                <Container>
                    <Row>
                        <Col className="ml-auto mr-auto text-center" md="8">
                            <h2 className="title">{this.state.texts[0] || ''}</h2>
                            <h5 className="description">
                                {this.state.texts[1] || ''}
                            </h5>
                        </Col>
                    </Row>
                    <div className="separator separator-primary"></div>
                    <div className="section-story-overview">
                        <Row>
                            <Col md="6">
                                <div
                                    className="image-container image-left"
                                    id="img1"
                                    style={{
                                        backgroundImage:
                                            "url(" + this.state.files[0] || '' + ")"
                                    }}
                                >
                                </div>
                                <div
                                    className="image-container"
                                    id="img2"
                                    style={{
                                        backgroundImage:
                                            "url(" + this.state.files[1] || '' + ")"
                                    }}
                                ></div>
                            </Col>
                            <Col md="5">
                                <div
                                    className="image-container image-right"
                                    id="img3"
                                    style={{
                                        backgroundImage:
                                            "url(" + this.state.files[2] || '' + ")"
                                    }}
                                ></div>
                                <h3>
                                    {this.state.texts[2] || ''}
                                </h3>
                                <p>{this.state.texts[3] || ''}</p>
                            </Col>
                        </Row>
                    </div>
                </Container>
                <Container>
                    <Row>

                        {this.state.tabs.length > 0 ?
                            <Col className="ml-auto mr-auto" md="10" xl="12">

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
                                                    <p>
                                                        {tab.text}
                                                    </p>
                                                    <Row>
                                                        <Col xl="3">
                                                            <img src={tab.images[0]} /></Col>
                                                    </Row>

                                                </TabPane>
                                            })}
                                        </TabContent>
                                    </CardBody>
                                </Card>

                            </Col>
                            : ""}
                    </Row>
                </Container>
            </div>
        )
    }
}

