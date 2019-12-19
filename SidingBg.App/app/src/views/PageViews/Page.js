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
    
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar";
import LandingPageHeader from "components/Headers/LandingPageHeader";
import DefaultFooter from "components/Footers/DefaultFooter.js";
import BasicTemplate from "views/PageViews/BasicTemplate";
import TabsTemplate from "views/PageViews/TabsTemplate";
import Carousel from "views/index-sections/Carousel";
import GalleryTemplate from "./GalleryTemplate";


const api = "https://localhost:44353/api/pages/"

export default class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alias: '',
            type: '',            
        }
    }
    componentDidMount(){
        console.log("didmount")
        console.log(this.props.match.params.alias)
        this.fetchPageInfo(this.props.match.params.alias)
    }

    componentWillReceiveProps(nextProps) {
        console.log('willreciveprops')
        console.log(nextProps.match.params.alias)
        this.fetchPageInfo(nextProps.match.params.alias)
    }

    fetchPageInfo(alias){
     return fetch(api + 'GetPageInfo?alias=' + alias, {
            method: 'GET'
        }).then((res) => res.json())
            .then((data) => {                
                this.setState({ pageComponent:this.returnPageTemplateComponent(data.type,alias)});               
            })
    } 

    returnPageTemplateComponent(type,alias) {
        switch (type) {
            case 1:
                return <BasicTemplate alias={alias}></BasicTemplate>
            case 2:
                return <TabsTemplate alias={alias}></TabsTemplate>
            case 3:
                return <GalleryTemplate alias={alias}></GalleryTemplate>
            default:
                console.log("boom")
        }
    }

    render() {
        return (
            <div>
                <IndexNavbar />
                <div className="wrapper">
                    <LandingPageHeader />
                    <div className="">
                        <Container>
                            {this.state.pageComponent||''}
                        </Container>
                    </div>
                    <DefaultFooter />
                </div>
            </div>
        )
    }
}

