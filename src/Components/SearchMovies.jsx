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
import Search from './Search.jsx'
import Topbar from './Topbar.jsx'
import axios from 'axios'
import {didMountURL, searchURL} from '../config/moviedb.js'



export default class SearchMovies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    };

  }


  componentDidMount() {
    this.getTrending()
  }

  getTrending() {
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

  onChange(e) {
    const searchValue = e.target.value;
    const url = searchURL + searchValue;
    
    if (searchValue === '') {
      this.getTrending()
      return
    }

    axios.get(url)
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





  render () {

    return (
      <Container fluid={true}>

        <Topbar />
        
        <Row className="search">
          <Col>
            <Search handleSearchInputChange={(e) => this.onChange(e)}/>
          </Col>  
        </Row>

        {this.state.movies.map(movie => 
          <Row
            key={movie.id}
            className="movie">
            <Movie movie={movie} />
          </Row>)}

      </Container>
    );
  }
}