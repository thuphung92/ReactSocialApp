import React, { Component } from 'react'
import { FaUserAlt } from "react-icons/fa"
import { Nav, Navbar, Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class NavBar extends Component {
    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand className="fw-bolder">Friendbook</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Newfeeds</Nav.Link>
                        <Nav.Link style={{color: 'gray'}} eventKey="link-1" as={Link} to="/createpost">Create Post</Nav.Link>
                        <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
   
                    </Nav>
                    <Nav>
                        <Nav.Link> <span style={{paddingRight:'8px'}}><FaUserAlt/></span>{(this.props.user)}</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                        </Container>
                        </Navbar>
                        <Container>                         
                </Container>  
            </div>
        )
    }
}
