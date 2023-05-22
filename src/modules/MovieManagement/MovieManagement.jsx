import React from 'react'
import MovieList from './MovieList/MovieList';
import MovieForm from './MovieForm/MovieForm';

function MovieManagement() {
  return (
    <div>
      <h1>MovieManagement</h1>
      <MovieList />
      <MovieForm />
    </div>
  );
}

export default MovieManagement