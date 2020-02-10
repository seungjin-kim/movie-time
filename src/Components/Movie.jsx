import React from 'react';
import {
  Container,
  Button,
  Row, Col,
} from "reactstrap";


export default class Movie extends React.Component {
  render() {




    return (
      <Container style={{
      }}>
        <Row>
          <Col style={{
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
          }}>
            <img alt="poster" src={`https://image.tmdb.org/t/p/w200/${this.props.movie.poster}`} />
          </Col>

          <Col style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // fontFamily: "'Source Sans Pro', Arial, sans-serif",
          }}>
            <div className="movie-entry media">
              <div className="media-body">
                <h4>{this.props.movie.title}</h4>
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
            // verticalAlign: 'middle',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            {this.props.watchListClicked ? (
              <Button onClick={() => this.props.removeFromWatchList(this.props.movie.id)} style={{
                justifyContent: 'center'
              }}>Remove</Button>
            ) : (
              <Button onClick={() => this.props.addToWatchList(this.props.movie.id)} style={{
                verticalAlign: 'middle'
              }}>Add</Button>
            )}
            
          </Col>

        </Row>

      </Container>

    )
  }


}


