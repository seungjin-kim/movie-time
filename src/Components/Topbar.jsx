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
      <Row className="top-bar" 
        style={{
          color: 'white', 
          backgroundColor: '#000033',
          // display: 'flex',
          alignItems: 'center'
          }}>
        <Col xs="4">
          <img width="100" src="/moviedb-logo.png" style={{
            


            
          }}></img>
        </Col>

        <Col xs={{size: 'auto'}}>
          <h2 style={{
            // margin: '25px 500px 25px 0px',
            // textAlign: 'left',
            fontFamily: "'Source Sans Pro', Arial, sans-serif",
            fontWeight: "900",
            // display: 'flex',
            // alignItems: 'center'
          }}>Movie Time</h2>
        </Col>
      </Row>
    )
  }
}