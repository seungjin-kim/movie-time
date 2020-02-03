import React from 'react';
import {
  Container,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  Row, Col,
  

} from "reactstrap";
import Movie from './Movie.jsx'
import axios from 'axios'

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


  componentDidMount() {
    this.getMovies();
  }

  filterResult(data) {
    return {
      id: data.id,
      poster: data.poster_path,
      rating: data.vote_average,
      title: data.name ? data.name : data.title,
      released: data.release_date,
      lang: data.original_language,
      overview: data.overview,
    }
  }

  getMovies() {
    var options = {
      key: this.props.API_KEY,
    }


  }







  render () {

    return (
      <Container>

        <Row className="search">
          <Col sm="12">
            <InputGroup>
              <Input placeholder="Find a movie"/>
              <InputGroupAddon addonType="prepend">
                <Button color="success"
                  className="search-button">
                    Search
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Col>  
        </Row>

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