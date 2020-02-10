import React from 'react';
import {
  Container,
  Button,
  Row, Col,
} from "reactstrap";


export default class Movie extends React.Component {
  render() {




    return (
      <Container>
        <Row>
          <Col >
            <img alt="poster" src={`https://image.tmdb.org/t/p/w200/${this.props.movie.poster}`} />
          </Col>

          <Col>
            <div className="movie-entry media">
              <div className="media-body">
                {this.props.movie.title}
                <p> Rating: {this.props.movie.rating} </p>
                <p> {this.props.movie.overview} </p>
                <p> Release Date: {this.props.movie.released} </p>
                {/* {this.props.watchListClicked ? (
                  <Button onClick={() => this.props.removeFromWatchList(this.props.movie.id)}>Remove</Button>
                ) : (
                  <Button onClick={() => this.props.addToWatchList(this.props.movie.id)}>Add</Button>
                )} */}
              </div>
            </div>
          </Col>
          <Col xs="3" style={{
            alignItems: 'center'
          }}>
            {this.props.watchListClicked ? (
              <Button onClick={() => this.props.removeFromWatchList(this.props.movie.id)}>Remove</Button>
            ) : (
              <Button onClick={() => this.props.addToWatchList(this.props.movie.id)}>Add</Button>
            )}
            
          </Col>

        </Row>

      </Container>

    )
  }


}


