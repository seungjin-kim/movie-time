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
    };

  }

  componentDidMount() {
    this.getTrending()
    this.setState({listId: Number(localStorage.getItem("listId")) })
    console.log('storage list id', this.state.listId)
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
        this.setState({askingPermission: false, token: res.data.request_token});
      })
      .then(() => {
        console.log(this.state.token);
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
            })
            // .then(() => {
            //   this.createList();
            // })
          }, 7000)
      })
  }



  getWatchListMovies() {
    if (this.state.sessionId) {
      axios.get(`${baseURL}/account/{account_id}/watchlist/movies?api_key=${MOVIEDB_API_KEY}&session_id=${this.state.sessionId}&sort_by=created_at.desc`)
        .then(res => {
          const results = res.data.results
          if (results) {
            let movie_results = results.map(result => {
              return this.filterResult(result)
            })
          this.setState({watchListMovies: movie_results})
          }
        })
        .catch(err => {
          if (err) {
            this.setState({watchListMovies: {}});
          }
        })
    }


  }



      

    
  

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
            <Movie movie={movie} />
          </Row>)}

      </Container>)
      }



      </div>
      
    );
  }
}