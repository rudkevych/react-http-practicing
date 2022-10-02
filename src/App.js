import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://swapi.dev/api/film');

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again');
      }

      const data = await response.json();
      const transformedMovies = data.results.map((result) => {
        return {
          id: result.episode_id,
          title: result.title,
          releaseDate: result.release_date,
          openingText: result.opening_crawl,
        };
      });

      setMovies(transformedMovies);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }

    setIsLoading(false);
  }

  let content = <p>No movies found</p>;

  if (movies.length) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
