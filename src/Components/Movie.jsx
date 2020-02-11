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
            display: "flex",
            justifyContent: "left",
            alignItems: "left",
          }}>
            <img alt="poster" src={`https://image.tmdb.org/t/p/w200/${this.props.movie.poster}`} style={{
              borderRadius: '12px',
            }}/>
          </Col>

          <Col xs="7" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <div className="movie-entry media">
              <div className="media-body" style={{
                textAlign: "left"
              }}>
                <h5 style={{
                  fontWeight: '750'
                }}>{this.props.movie.title}</h5>
                <p style={{
                  fontStyle: 'italic'
                }}> Rating: {this.props.movie.rating} </p>
                <p style={{
                  textAlign: "left"
                }}> {this.props.movie.overview} </p>
                <p style={{
                  fontStyle: 'italic'
                }}> Release Date: {this.props.movie.released} </p>
              </div>
            </div>
          </Col>
          <Col xs="2" style={{
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


