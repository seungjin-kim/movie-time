import React from 'react';
import {
  Container,
  Button,
  Input,
  Row, Col,

} from "reactstrap";
import Movie from './Movie.jsx'

const exampleData = [
  {id: 0, title: "Avengers: Infinity War", overview: "blah blah blah 1"},
  {id: 1, title: "Bad Boys III", overview: "blah blah blah 2"},
]

export default class SearchMovies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: exampleData,
    };

  }






  render () {



    return (
      <Container>
        <Row className="content">
          {this.state.movies.map(movie => 
            <Col
              key={movie.id}
              className="movie">
              <Movie movie={movie} />
            </Col>)}
        </Row>
      </Container>
    );
  }
}