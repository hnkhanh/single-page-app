import React, { useState, useRef } from "react";
import {
  Nav,Navbar,NavbarBrand,NavbarToggler,Collapse,NavItem,Jumbotron,Button,Modal,ModalHeader,ModalBody,Form,FormGroup,Input,Label
} from "reactstrap";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const username = useRef();
  const password = useRef();
  const remember = useRef();


  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // const toggleModal = () => {
  //   setIsModalOpen(!isModalOpen);
  // };

  // const handleLogin = (event) => {
  //   console.log(event);
  //   event.preventDefault();
  //   alert(
  //     "Username: " +
  //       username.current.value +
  //       " Password: " +
  //       password.current.value +
  //       " Remember: " +
  //       remember.current.checked
  //   );
  //   toggleModal();
  // };

  return (
    <>
      <Navbar dark expand="md">
        <div className="container">
          <NavbarToggler onClick={toggleNav} />
          <NavbarBrand className="mr-auto">
            <img
              src="https://i.ibb.co/G0gHb1B/logo.png"
              height="30"
              width="41"
              alt="Restaurant Con Fusion"
            />
          </NavbarBrand>
          <Collapse isOpen={isNavOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink className="nav-link" to="/home">
                  <span className="fa fa-home fa-lg"></span> Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/about-us">
                  <span className="fa fa-info fa-lg"></span> About Us
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/menu">
                  <span className="fa fa-list fa-lg"></span> Menu
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/contact-us">
                  <span className="fa fa-address-card fa-lg"></span> Contact Us
                </NavLink>
              </NavItem>
            </Nav>
            {/* <Nav className="ml-auto" navbar>
              <NavItem>
                <Button outline onClick={toggleModal}>
                  <span className="fa fa-sign-in fa-lg"></span> Login
                </Button>
              </NavItem>
            </Nav> */}
          </Collapse>
        </div>
      </Navbar>
      <Jumbotron>
        <div className="container">
          <div className="row row-header">
            <div className="col-12">
              <h1>Restaurant con Fusion</h1>
              <p>
                We take inspiration from the World's best cuisines, and create a
                unique fusion experience. Our lipsmacking creations will tickle
                your culinary senses!
              </p>
            </div>
          </div>
        </div>
      </Jumbotron>
      {/* <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Login</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleLogin}>
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                name="username"
                innerRef={username}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                innerRef={password}
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="remember"
                  innerRef={remember}
                />
                Remember me
              </Label>
            </FormGroup>
            <Button type="submit" value="submit" color="primary">
              Login
            </Button>
          </Form>
        </ModalBody>
      </Modal> */}
    </>
  );
};

export default Header;
