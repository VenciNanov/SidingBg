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

export default class RegisterForm extends React.Component {
  constructor(props){
   super(props);
   this.handleSubmit = this.handleSubmit.bind(this);
  }
  
 
  handleSubmit(event){ 
   event.preventDefault();
   console.log(event.target.email.value)
   fetch('https://localhost:44353/register', {
    method: 'post',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
     "email": event.target.email.value,
     "password":event.target.password.value
    })
   });
  };
  
 
  render () {
   return (
    
    <div id="signup">
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
                        placeholder="Email..."
                        type="email"
                        ref={(ref) => {this.email = ref}} 
                        name="email"
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
                        placeholder="Password..."
                        type="password"
                        ref={(ref) => {this.password = ref}} 
                        name="password"
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