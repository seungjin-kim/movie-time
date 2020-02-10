import React from 'react';
import {
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
          <img width="100" src="/moviedb-logo.png"></img>
        </Col>

        <Col xs={{size: 'auto'}}>
          <h2 style={{
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