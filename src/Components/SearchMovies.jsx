import React from 'react';
import {
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";
import Movie from './Movie.jsx'
import Search from './Search.jsx'
import Topbar from './Topbar.jsx'
import axios from 'axios'
import {didMountURL, searchURL, tokenURL, authenticateURL, createListURL} from '../config/moviedb.js'



export default class SearchMovies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      token: '',
      askingPermission: false,
      sessionId: '',
      listId: ''
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
        console.log(res)
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
          this.setState({movies: {}})
        }
      })
  }

  
  getToken() {
    let requestSender = Promise.resolve('')
    axios.get(tokenURL)
      .then(res => {
        this.setState({askingPermission: false, token: res.data.request_token})
      })
      .then((res) => {
        console.log(this.state.token)
        window.open(`https://www.themoviedb.org/authenticate/${this.state.token}`)
      })
      .then((res) => {
        setTimeout(() => {
          axios.post(authenticateURL, {
            "request_token": this.state.token
          })
            .then(res => {
              console.log(res)
              this.setState({sessionId: res.data.session_id})
            })
            .then(() => {
              this.createList()
            })
          }, 7000)
      })
  }

  createList() {
    axios.post(createListURL + this.state.sessionId, {
      "name": "Watch List",
      "description": "Saved movies to watch later.",
      "language": "en"
    })
      .then(res => {
        console.log('list response', res.data.list_id)
        this.setState({listID: res.data.list_id})
      })
  }


  
  // getSavedMovies() {
  //   axios.get()
  // }



      

    
      
      

  render () {


    const link = `https://www.themoviedb.org/authenticate/${this.state.token}`

    return (
      <div>


      {this.state.askingPermission ?
      (
      <div>hello<a href={link}></a></div>
      


      )
      :
      (<Container fluid={true}>

        <Topbar />
        <Button onClick={(e) => this.getToken(e)}>Login</Button>
        <Button onClick={(e) => this.getSavedMovies(e)}>Saved Movies</Button>
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

      </Container>)
      }



      </div>
      
    );
  }
}