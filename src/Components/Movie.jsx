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
        <img alt="poster" src={`https://image.tmdb.org/t/p/w200/${props.movie.poster}`} />
      </Col>

      <Col>
        <div className="movie-entry media">
          <div className="media-body">
            {props.movie.title}
            <p> Rating: {props.movie.rating} </p>
            <p> {props.movie.overview} </p>
            <p> Release Date: {props.movie.released} </p>
          </div>
        </div>
      </Col>

    </Row>

  </Container>
)

export default Movie;