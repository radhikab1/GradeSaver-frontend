import React,{Component} from 'react';
import {Navbar,Nav} from 'react-bootstrap';

export class Navigation extends Component{

    render(){
      return(
        <Navbar sticky="top">
          <Navbar.Brand href="#home">GradeSaver</Navbar.Brand> 
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            {/* <Nav.Link href="#courses">Courses</Nav.Link>
            <Nav.Link href="#grades">Assignments</Nav.Link> */}
          </Nav>
        </Navbar>
      )
    }
}