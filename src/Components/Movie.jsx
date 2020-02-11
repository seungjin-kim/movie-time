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
        <Row style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Col style={{

          }}>
            <img alt="poster" src={`https://image.tmdb.org/t/p/w200/${this.props.movie.poster}`} />
          </Col>

          <Col style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <div className="movie-entry media">
              <div className="media-body">
                <h5>{this.props.movie.title}</h5>
                <p> Rating: {this.props.movie.rating} </p>
                <p> {this.props.movie.overview} </p>
                <p> Release Date: {this.props.movie.released} </p>
              </div>
            </div>
          </Col>
          <Col xs="3" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            {this.props.watchListClicked ? (
              <Button outline color="success" onClick={() => this.props.removeFromWatchList(this.props.movie.id)} style={{
                justifyContent: 'center'
              }}>Remove</Button>
            ) : (
              <Button outline color="success" onClick={() => this.props.addToWatchList(this.props.movie.id)} style={{
                verticalAlign: 'middle'
              }}>Add</Button>
            )}
            
          </Col>

        </Row>

      </Container>

    )
  }


}


