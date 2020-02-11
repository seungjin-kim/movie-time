import React from 'react';
import {
  Container,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  Row, Col,
  
} from "reactstrap";



export default class Search extends React.Component {
  render() {
    return (
      <InputGroup style={{
        marginBottom: '20px'
      }}>
        <Input placeholder="Find a movie" onChange={(e) => this.props.handleSearchInputChange(e)}/>
          <InputGroupAddon addonType="prepend">
            <Button color="success"
              className="search-button"> 
              Search
            </Button>
          </InputGroupAddon>
      </InputGroup>
    )
  }
}