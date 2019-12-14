import React from "react";

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
  Col
} from "reactstrap";

// core components
import NavBar from "components/Navbars/CMSNavbar";
import TransparentFooter from "components/Footers/TransparentFooter.js";
import LandingPageHeader from "components/Headers/LandingPageHeader";
export default class CreateRoutePage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    event.preventDefault();

    fetch('https://localhost:44353/api/templates/createroute', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "controller": event.target.controller.value,
        "page": event.target.page.value,
        "pageTitle": event.target.pageTitle.value,
        "type": +event.target.type.value
      })
    }).then(()=> this.props.history.push('/cms/index'));
   
  };


  render() {
    return (
      <div className="App">
        <NavBar />
        <div className=".landing-page">
          <LandingPageHeader />
          <form onSubmit={this.handleSubmit}>
            <CardHeader className="text-center">

            </CardHeader>
            <CardBody>
              <InputGroup
                className={
                  "no-border input-lg"
                }
              >
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="now-ui-icons users_circle-08"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Controller..."
                  type="text"
                  ref={(ref) => { this.controller = ref }}
                  name="controller"
                // onFocus={() => setFirstFocus(true)}
                // onBlur={() => setFirstFocus(false)}
                ></Input>
                <Input
                  placeholder="Template..."
                  type="select"
                  ref={(ref) => { this.type = ref }}
                  name="type"
                // onFocus={() => setFirstFocus(true)}
                // onBlur={() => setFirstFocus(false)}
                ><option value="1">Basic</option>
                <option value="2">Tabs</option>
                <option value="3">Gallery</option></Input>
              </InputGroup>
              <InputGroup
                className={
                  "no-border input-lg"
                }
              >
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="now-ui-icons text_caps-small"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Page..."
                  type="text"
                  ref={(ref) => { this.page = ref }}
                  name="page"
                // onFocus={() => setLastFocus(true)}
                // onBlur={() => setLastFocus(false)}
                ></Input>
                <Input
                  placeholder="Page title..."
                  type="text"
                  ref={(ref) => { this.pageTitle = ref }}
                  name="pageTitle"
                // onFocus={() => setLastFocus(true)}
                // onBlur={() => setLastFocus(false)}
                ></Input>
              </InputGroup>
            </CardBody>
            <CardFooter className="text-center">
              <Button
                block
                className="btn-round"
                color="info"
                size="lg"
                type="submit"
              >
                Create
                    </Button>
            </CardFooter>
          </form>
        </div>
      </div>
    )
  }
}