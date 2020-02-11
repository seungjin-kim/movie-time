import React from 'react';
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  
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