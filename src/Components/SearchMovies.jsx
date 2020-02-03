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
import {didMountURL} from '../config/moviedb.js'

const exampleData = [
  {id: 0, title: "Avengers: Infinity War", overview: "blah blah blah 1"},
  {id: 1, title: "Bad Boys III", overview: "blah blah blah 2"},
]

export default class SearchMovies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    };

  }


  componentDidMount() {
    // this.getMovies();
    axios.get(didMountURL)
      .then(res => {
        const results = res.data.results
        if (results) {
          let movie_results = results.map(result => {
            return this.filterResult(result)
          })
        this.setState({movies: movie_results})
        }
      })
      .catch(err => {
        if (err) {
          this.setState({movies:{}})
        }
      })
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
      <Container fluid={true}>
        <Row className="top-bar" style={{color: 'white', backgroundColor: 'black'}}>
          <Col>
          <img width="100" src="moviedb-logo.png"></img>
          </Col>
          <Col width>
            <h2>Movie Time</h2>
          </Col>
        </Row>
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

        {/* <Row className="content"> */}
        
          {this.state.movies.map(movie => 
            <Row
              key={movie.id}
              className="movie">
              <Movie movie={movie} />
            </Row>)}
        {/* </Row> */}
      </Container>
    );
  }
}