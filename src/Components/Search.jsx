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
      <InputGroup>
        <Input placeholder="Find a movie"/>
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