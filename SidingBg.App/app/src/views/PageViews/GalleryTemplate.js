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
    Carousel,
    CarouselIndicators,
    CarouselItem,
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar";
import LandingPageHeader from "components/Headers/LandingPageHeader";
import DefaultFooter from "components/Footers/DefaultFooter.js";
import { switchCase } from "@babel/types";

const api = "https://localhost:44353/api/Pages/"

export default class GalleryTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alias: '',
            type: '',
            texts: [],
            files: [],
            setActiveIndex: 0,
            setAnimating: false
        }
    }

    componentDidMount() {
        console.log(this.props.alias)
        fetch(api + 'GetPage?alias=' + this.props.alias, {
            method: 'GET'
        }).then((res) => res.json())
            .then((data) => {
                this.setState({ texts: data.contents, files: data.images })
            })
    }

    onExiting = () => {
        this.setState({ setAnimating: true });
    };
    onExited = () => {
        this.setState({ setAnimating: false });
    };
    next = () => {
        if (this.state.setAnimating) return;
        const nextIndex = this.state.setActiveIndex === this.state.files.length - 1 ? 0 : this.state.setActiveIndex + 1;
        this.setState({ setActiveIndex: nextIndex });
    };
    previous = () => {
        if (this.state.setAnimating) return;
        const nextIndex = this.state.setActiveIndex === 0 ? this.state.files.length - 1 : this.state.setActiveIndex - 1;
        this.setState({ setActiveIndex: nextIndex });
    };
    goToIndex = newIndex => {
        if (this.state.setAnimating) return;
        this.setState({ setActiveIndex: newIndex });
    };


    render() {
        const { activeIndex, setActiveIndex } = this.state;
        const { animating, setAnimating } = this.state;

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
                </Container>
                <Container>
                    <Row className="justify-content-center">
                        <Col lg="12" md="12">
                            <Carousel
                                activeIndex={setActiveIndex}
                                next={this.next}
                                previous={this.previous}
                            >
                                <CarouselIndicators
                                    items={this.state.files}
                                    activeIndex={setActiveIndex}
                                    onClickHandler={this.goToIndex}
                                />
                                {this.state.files.map(item => {
                                    return (
                                        <CarouselItem
                                            onExiting={this.onExiting}
                                            onExited={this.onExited}
                                            key={item.id}
                                        >
                                            <img src={item.base64} />
                                            {/* <div className="carousel-caption d-none d-md-block">
                                                <h5>{item.caption}</h5>
                                            </div> */}
                                        </CarouselItem>
                                    );
                                })}
                                <a
                                    className="carousel-control-prev"
                                    data-slide="prev"
                                    href="#pablo"
                                    onClick={e => {
                                        e.preventDefault();
                                        this.previous();
                                    }}
                                    role="button"
                                >
                                    <i className="now-ui-icons arrows-1_minimal-left"></i>
                                </a>
                                <a
                                    className="carousel-control-next"
                                    data-slide="next"
                                    href="#pablo"
                                    onClick={e => {
                                        e.preventDefault();
                                        this.next();
                                    }}
                                    role="button"
                                >
                                    <i className="now-ui-icons arrows-1_minimal-right"></i>
                                </a>
                            </Carousel>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

