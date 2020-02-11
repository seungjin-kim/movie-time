import React from 'react';
import {
  Container,
  Row, Col,
  Pagination, PaginationItem, PaginationLink
} from "reactstrap";
import Movie from './Movie.jsx'
import Search from './Search.jsx'
import Navigation from './Navigation.jsx'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import {baseURL, MOVIEDB_API_KEY, didMountURL, searchURL, tokenURL, authenticateURL} from '../config/moviedb.js'


export default class SearchMovies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      token: '',
      sessionId: '',
      watchListMovies: [],
      watchListClicked: false,
      totalPages: 0,
      pageNum: 1,
      searchTerm: '',
    };

  }

  componentDidMount() {
    this.getTrending()
    const storedSessionId = sessionStorage.getItem("sessionId")
    
    if (storedSessionId && storedSessionId !== "undefined") {
      this.setState({
        sessionId: storedSessionId,
        pageNum: 1,
      }, () => this.callGetSessionId())
    } else {
      this.setState({
        pageNum: 1,
        watchListClicked: false,
        searchTerm: ''
      }, () => this.callGetSessionId())
    }
  }

  callGetSessionId() {
    if (this.state.token !== "" && this.state.sessionId === '') {
      setInterval(() => this.getSessionId(), 3000)
    }
  }

  getTrending() {
    axios.get(didMountURL + "&page=" + this.state.pageNum)
      .then(res => {
        const results = res.data.results
        if (results) {
          let movie_results = results.map(result => {
            return this.filterResult(result)
          })
        this.setState({
          movies: movie_results,
          totalPages: 5
        })
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
    this.setState({
      searchTerm: searchValue
    })
    
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

  handleLogin() {
    axios.get(tokenURL)
      .then(res => {
        this.setState({
          token: res.data.request_token
        }, () => this.componentDidMount());
      })
      .catch(err => {
        if (err) {
          this.setState({token: ''});
        }
      })
      .then(() => {
        window.open(`https://www.themoviedb.org/authenticate/${this.state.token}`);
      })
  }

  getSessionId() {
    if (this.state.token !== "" && this.state.sessionId === '') {
      axios.post(authenticateURL, {
        "request_token": this.state.token
      })
        .then(res => {
          this.setState({sessionId: res.data.session_id});
          sessionStorage.setItem('sessionId', res.data.session_id);
        })
        .catch(err => {
          if (err) {
            this.setState({sessionId:""});
          }
        })
    } else {
      return;
    }
  }

  getWatchListMovies() {
    if (this.state.sessionId) {
      this.setState({
        watchListClicked: true,
        totalPages: 0
      });
      
      axios.get(`${baseURL}/account/{account_id}/watchlist/movies?api_key=${MOVIEDB_API_KEY}&session_id=${this.state.sessionId}&sort_by=created_at.desc&page=` + this.state.pageNum)
        .then(res => {
          const results = res.data.results;
          if (results) {
            let movie_results = results.map(result => {
              return this.filterResult(result);
            })
          this.setState({
            watchListMovies: movie_results,
            totalPages: res.data.total_pages,
          });
          }
        })
        .catch(err => {
          if (err) {
            this.setState({
              watchListMovies: {},
              sessionId: '',
            });
          }
        })
    } else {
      alert('Please sign in using a TMDB account to view your watchlist.');
    }
  }
  
  addToWatchList(movieId) {
    if (this.state.sessionId) {
      axios.post(`${baseURL}/account/{account_id}/watchlist?api_key=${MOVIEDB_API_KEY}&session_id=${this.state.sessionId}`, {
        "media_type": "movie",
        "media_id": movieId,
        "watchlist": true
      })
        .catch(err => {
          if (err) {
            this.setState({
              sessionId: '',
            });
          }
        })
    } else {
      alert("Please sign in using a TMDB account to add movies to your watchlist.")
    }
  }

  removeFromWatchList(movieId) {
    if (this.state.sessionId) {
      axios.post(`${baseURL}/account/{account_id}/watchlist?api_key=${MOVIEDB_API_KEY}&session_id=${this.state.sessionId}`, {
        "media_type": "movie",
        "media_id": movieId,
        "watchlist": false
      })
      .catch(err => {
        if (err) {
          console.log(err)
        }
      })
    }
    setTimeout(this.getWatchListMovies.bind(this), 80);
  }

  handlePageClick(page) {
    this.setState({
      pageNum: page
    }, () => this.getTrending())
  }

  handleLogout() {
    sessionStorage.removeItem("sessionId")
    this.setState({
      sessionId: '',
      token: '',
    }, () => this.componentDidMount())
  }

      
  render () {
    const pages = [];
    for (let i = 1; i <= this.state.totalPages; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink href="" onClick={() => this.handlePageClick(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }

    let homeHeader
    if (this.state.searchTerm.length > 0) {
      homeHeader = "Search Results"
    } else {
      homeHeader = "Popular Movies - Top 100"
    }



    return (
      <div>


      {this.state.watchListClicked && this.state.sessionId ?
      (
      <Container fluid={true}>

        <Navigation
          handleLogin={(e) => this.handleLogin(e)} 
          handleLogout={(e) => this.handleLogout(e)}
          sessionId={this.state.sessionId}
          watchListClicked={this.state.watchListClicked}
          componentDidMount={(e) => this.componentDidMount(e)}
           />

        <h4 style={{
          textDecoration: 'underline',
          marginTop: '20px',
          marginBottom: '50px'
        }}>Watchlist</h4>

        {this.state.watchListMovies.map(movie => 
          <Row
            key={movie.id}
            className="movie"
            style={{
              marginBottom: '35px',
            }}>
            <Movie movie={movie} 
              removeFromWatchList={(e) => this.removeFromWatchList(e)} 
              watchListClicked={this.state.watchListClicked} />
          </Row>)}
        
        <Row>
          <Col>
            <Pagination size="md" aria-label="Page navigation" style={{
              justifyContent: 'center',
              margin: '45px'
            }}>
              {pages}
            </Pagination>
          </Col>
        </Row>

      </Container>
      )
      :
      (
      <Container fluid={true} style={{
        
      }}>

        <Navigation 
          handleLogin={(e) => this.handleLogin(e)}
          handleLogout={(e) => this.handleLogout(e)}
          getWatchListMovies={(e) => this.getWatchListMovies(e)}
          sessionId={this.state.sessionId}
          watchListClicked={this.state.watchListClicked} />
          
        <Row className="search">
          <Col>
            <Search handleSearchInputChange={(e) => this.onChange(e)}/>
          </Col>  
        </Row>

        <h4 style={{
          textDecoration: 'underline',
          marginTop: '20px',
          marginBottom: '50px'
        }}>
        {homeHeader}
        </h4>

        {this.state.movies.map(movie => 
          <Row
            key={movie.id}
            className="movie" style={{
              marginBottom: '35px',
            }}>
            <Movie movie={movie} addToWatchList={(e) => this.addToWatchList(e)} />
          </Row>)}
        
        {this.state.searchTerm === false &&
        <Row>
          <Col>
            <Pagination size="md" aria-label="Page navigation" style={{
              justifyContent: 'center',
              margin: '45px'
            }}>
              {pages}
            </Pagination>
          </Col>
        </Row>
        }
        
  
      </Container>
      )
      }



      </div>
      
    );
  }
}