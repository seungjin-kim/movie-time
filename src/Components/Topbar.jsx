import React from 'react';
import {
  Container,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  Row, Col,
  
} from "reactstrap";



export default class Topbar extends React.Component {
  render() {
    return (
      <Row className="top-bar" style={{color: 'white', backgroundColor: 'black'}}>
        <Col xs="4">
          <img width="100" src="moviedb-logo.png"></img>
        </Col>

        <Col>
          <h2>Movie Time</h2>
        </Col>
      </Row>
    )
  }
}