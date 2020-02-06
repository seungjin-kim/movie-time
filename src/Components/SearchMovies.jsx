import React from 'react';
import {
  Container,
  Row, Col,
  Button,
  Pagination, PaginationItem, PaginationLink
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
import {baseURL, MOVIEDB_API_KEY, didMountURL, searchURL, tokenURL, authenticateURL, createListURL} from '../config/moviedb.js'


export default class SearchMovies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      token: '',
      sessionId: '',
      listId: '',
      watchListMovies: [],
      watchListClicked: false,
      totalPages: 5,
      pageNum: 1,
    };

  }

  componentDidMount() {
    this.getTrending()
    this.setState({ sessionId: sessionStorage.getItem("sessionId") })
  }

  getTrending() {
    axios.get(didMountURL + "&page=" + this.state.pageNum)
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
        const results = res.data.results;
        if (results) {
          let movie_results = results.map(result => {
            return this.filterResult(result)
          })
        this.setState({movies: movie_results});
        }
      })
      .catch(err => {
        if (err) {
          this.setState({movies: {}});
        }
      })
  }

  getToken() {
    axios.get(tokenURL)
      .then(res => {
        this.setState({token: res.data.request_token});
      })
      .then(() => {
        window.open(`https://www.themoviedb.org/authenticate/${this.state.token}`);
      })
      .then(() => {
        setTimeout(() => {
          axios.post(authenticateURL, {
            "request_token": this.state.token
          })
            .then(res => {
              console.log(res);
              this.setState({sessionId: res.data.session_id});
              sessionStorage.setItem('sessionId', res.data.session_id);
            })
          }, 7000)
      })
  }

  getWatchListMovies() {
    this.setState({
      watchListClicked: true
    });
    
    if (this.state.sessionId) {
      axios.get(`${baseURL}/account/{account_id}/watchlist/movies?api_key=${MOVIEDB_API_KEY}&session_id=${this.state.sessionId}&sort_by=created_at.desc`)
        .then(res => {
          const results = res.data.results;
          if (results) {
            let movie_results = results.map(result => {
              return this.filterResult(result);
            })
          this.setState({watchListMovies: movie_results});
          }
        })
        .catch(err => {
          if (err) {
            this.setState({watchListMovies: {}});
          }
        })
    }
  }
  
  addToWatchList(movieId) {
    if (this.state.sessionId) {
      axios.post(`${baseURL}/account/{account_id}/watchlist?api_key=${MOVIEDB_API_KEY}&session_id=${this.state.sessionId}`, {
        "media_type": "movie",
        "media_id": movieId,
        "watchlist": true
      })
        .then(res => {
          console.log(res)
        })
    }
  }

  removeFromWatchList(movieId) {
    if (this.state.sessionId) {
      axios.post(`${baseURL}/account/{account_id}/watchlist?api_key=${MOVIEDB_API_KEY}&session_id=${this.state.sessionId}`, {
        "media_type": "movie",
        "media_id": movieId,
        "watchlist": false
      })
        .then(res => {
          console.log(res)
        })
    }
    setTimeout(this.getWatchListMovies.bind(this), 10);
  }

  handlePageClick(page) {
    this.setState({
      pageNum: page
    }, () => this.getTrending())
  }

      
  render () {
    const pages = [];
    for (let i = 1; i <= this.state.totalPages; i++) {
      pages.push(
        <PaginationItem>
          <PaginationLink href="" onClick={() => this.handlePageClick(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return (
      <div>


      {this.state.watchListClicked ?
      (
      <Container fluid={true}>

        <Topbar />

        {this.state.watchListMovies.map(movie => 
          <Row
            key={movie.id}
            className="movie">
            <Movie movie={movie} 
              removeFromWatchList={(e) => this.removeFromWatchList(e)} 
              watchListClicked={this.state.watchListClicked} />
          </Row>)}

      </Container>
      )
      :
      (
      <Container fluid={true}>

        <Topbar />
        <Button onClick={(e) => this.getToken(e)}>Login</Button>
        <Button onClick={(e) => this.getWatchListMovies(e)}>Saved Movies</Button>
        <Row className="search">
          <Col>
            <Search handleSearchInputChange={(e) => this.onChange(e)}/>
          </Col>  
        </Row>

        {this.state.movies.map(movie => 
          <Row
            key={movie.id}
            className="movie">
            <Movie movie={movie} addToWatchList={(e) => this.addToWatchList(e)} />
          </Row>)}
        
        <Row>
          <Col>
            <Pagination size="md" aria-label="Page navigation">
              {pages}
            </Pagination>
          </Col>
        </Row>
        
    

      </Container>
      )
      }



      </div>
      
    );
  }
}