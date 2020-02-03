import React from 'react';
import {
  Container,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  Row, Col,
} from "reactstrap";

const Movie = (props) => (
  


  <Container>
    <Row>
      <Col>
      </Col>

      <Col>
        <div className="movie-entry media">
          <div className="media-body">
            <div>{props.movie.title}</div>
          </div>
        </div>
      </Col>

    </Row>

  </Container>
)

export default Movie;