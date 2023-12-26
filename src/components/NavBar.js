import { useState, useCallback } from "react";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { Link, NavLink } from "react-router-dom";

import { Bars3Icon } from '@heroicons/react/24/outline'

import Svg from "./Svg";
import { Logo } from "./Icons";

import SidebarMenu from "./SidebarMenu";

const NavBar = props => {

  const [visible, setVisible] = useState(false);

  const toggleDrawer = useCallback(() => {
    setVisible(visible => !visible);
  }, []);

  return (
    <Navbar expand="lg" className="mb-3" bg="blue-900">
      <Container className="align-content-center">
        <Button variant="link" className="navbar-toggler icon-link" onClick={toggleDrawer}>
          <Bars3Icon className="burgerIcon" stroke="#FFF" width="28" />
        </Button>

        <Link to='/' className="navbar-brand">
          <Svg fill="#fff" viewBox="0 0 150 54" height="35" className='inline-block'><Logo /></Svg>
        </Link>

        <Offcanvas id="navbar" placement="start" show={visible} onHide={toggleDrawer}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Bilbordi.rs</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <SidebarMenu />
          </Offcanvas.Body>
        </Offcanvas>

      </Container>
    </Navbar>
  )
}

export default NavBar


