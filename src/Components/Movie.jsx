import React from 'react';

const Movie = (props) => (
  <div className="movie-entry media">
    <div classNAme="media-body">
      <div>{props.movie.title}</div>
    </div>
  </div>
)

export default Movie;