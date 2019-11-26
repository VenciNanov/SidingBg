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
import IndexNavBar from "components/Navbars/IndexNavbar";
import TransparentFooter from "components/Footers/TransparentFooter.js";

export default class CreateRoutePage extends React.Component {
  constructor(props){
   super(props);
   this.handleSubmit = this.handleSubmit.bind(this);
  }
  
 
  handleSubmit(event){ 
   event.preventDefault();

   fetch('https://localhost:44353/api/templates/createroute', {
    method: 'post',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
     "controller": event.target.controller.value,
     "page":event.target.page.value,
     "pageTitle":event.target.pageTitle.value
    })
   });
   this.props.history.push('/');
  };
  
 
  render () {
   return (
    
    <div id="create-route">
     <form onSubmit={this.handleSubmit}>
     <CardHeader className="text-center">
                    <div className="logo-container">
                      <img
                        alt="..."
                        src={require("assets/img/now-logo.png")}
                      ></img>
                    </div>
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
                        ref={(ref) => {this.controller = ref}} 
                        name="controller"
                        // onFocus={() => setFirstFocus(true)}
                        // onBlur={() => setFirstFocus(false)}
                      ></Input>
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
                        ref={(ref) => {this.page = ref}} 
                        name="page"
                        // onFocus={() => setLastFocus(true)}
                        // onBlur={() => setLastFocus(false)}
                      ></Input>
                      <Input
                        placeholder="Page title..."
                        type="text"
                        ref={(ref) => {this.pageTitle = ref}} 
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
                      Get Started
                    </Button>
                    <div className="pull-left">
                      <h6>
                        <a
                          className="link"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          Create Account
                        </a>
                      </h6>
                    </div>
                    <div className="pull-right">
                      <h6>
                        <a
                          className="link"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          Need Help?
                        </a>
                      </h6>
                    </div>
                  </CardFooter>     
     </form> ​
    </div>
    )
  }
 }