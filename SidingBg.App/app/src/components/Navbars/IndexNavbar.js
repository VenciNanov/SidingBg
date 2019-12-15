import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip
} from "reactstrap";


const api = "https://localhost:44353/api/Pages/"

export default class BasicTemplate extends React.Component {

  updateNavbarColor = () => {
    console.log(document.documentElement.scrollTop)
    console.log(this.state.setNavbarColor)
    if (
      document.documentElement.scrollTop > 399
    ) {
      this.setState({ setNavbarColor: "" });
    } else if (
      document.documentElement.scrollTop < 400
    ) {
      this.setState({ setNavbarColor: "navbar-transparent" });
    }
  };

  cleanup() {
    window.removeEventListener("scroll", this.updateNavbarColor);
  };

  // getMenuItems

  constructor(props) {
    super(props)
    this.state = {
      navbarColor: 'navbar-transparent',
      setNavbarColor: 'navbar-transparent',
      collapseOpen: false,
      setCollapseOpen: false,
      controllers: []
    }


  }

  componentDidMount() {
    fetch(api + 'GetMenuItems').then((res) => res.json()).then((data) => this.setState({ controllers: data.controllers }))

  }

  render() {
    const { controllers } = this.state
    window.addEventListener("scroll", this.updateNavbarColor);
    return (
      <>
        {this.state.collapseOpen ? (
          <div
            id="bodyClick"
            onClick={() => {
              document.documentElement.classList.toggle("nav-open");
              this.setState({ setCollapseOpen: false });
            }}
          />
        ) : null}
        <Navbar className={"fixed-top " + this.state.setNavbarColor} color="info" expand="lg">
          <Container>

            <div className="navbar-translate">
              <NavbarBrand
                href="/index"
                id="navbar-brand"
              >
                SidingBg
              </NavbarBrand>
              <UncontrolledTooltip target="#navbar-brand">
                Designed by Invision. Coded by Creative Tim
              </UncontrolledTooltip>
              <button
                className="navbar-toggler navbar-toggler"
                onClick={() => {
                  document.documentElement.classList.toggle("nav-open");
                  this.state.setCollapseOpen = !this.state.collapseOpen;
                }}
                aria-expanded={this.state.setCollapseOpen}
                type="button"
              >
                <span className="navbar-toggler-bar top-bar"></span>
                <span className="navbar-toggler-bar middle-bar"></span>
                <span className="navbar-toggler-bar bottom-bar"></span>
              </button>
            </div>
            <Collapse
              className="justify-content-end"
              isOpen={this.state.setCollapseOpen}
              navbar
            >
              <Nav navbar>
                {controllers.map((controller, i) => {
                  if (controller.pages.length > 1) {
                    return <UncontrolledDropdown className="button-dropdown">
                      <DropdownToggle
                        caret
                        data-toggle="dropdown"
                        href="#pablo"
                        id="navbarDropdown"
                        tag="a"
                        onClick={e => e.preventDefault()}
                      >
                        {controller.name}
                      </DropdownToggle>
                      <DropdownMenu aria-labelledby="navbarDropdown">
                        {
                          controller.pages.map((page) => {
                            let href = '/page/' + page.alias
                            return <DropdownItem href="#pablo">
                              {page.pageName}
                            </DropdownItem>
                          })
                        }

                      </DropdownMenu>
                    </UncontrolledDropdown>
                  }

                  let url = '/page/' + controller.pages[0].alias
                  return <NavItem key={i}>
                    <NavLink to={url} tag={Link} key={i}>
                      {controller.pages[0].headerName}
                    </NavLink>
                  </NavItem>
                })

                }
                <NavItem>
                  <NavLink to="/index" tag={Link}>
                    Начало
                  </NavLink>
                </NavItem>
                <UncontrolledDropdown className="button-dropdown">
                  <DropdownToggle
                    caret
                    data-toggle="dropdown"
                    href="#pablo"
                    id="navbarDropdown"
                    tag="a"
                    onClick={e => e.preventDefault()}
                  >
                    Фасадни покрития
              </DropdownToggle>
                  <DropdownMenu aria-labelledby="navbarDropdown">
                    <DropdownItem header tag="a">
                      Dropdown header
                </DropdownItem>
                    <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                      Action
                </DropdownItem>
                    <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                      Another action
                </DropdownItem>
                    <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                      Something else here
                </DropdownItem>
                    <DropdownItem divider></DropdownItem>
                    <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                      Separated link
                </DropdownItem>
                    <DropdownItem divider></DropdownItem>
                    <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                      One more separated link
                </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>

              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}