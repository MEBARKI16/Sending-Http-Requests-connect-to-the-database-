import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';


function App() {
  const [movies, setmovies] = useState([]);
  function fetchMoviesHandler() {
    fetch('https://swapi.dev/api/films/').then(response => {
      return response.json();}).then(data => {
        const transfommovies = data.results.map((moviedata) => {
          return {
            id: moviedata.episode_id,
            title: moviedata.title,
            openingText: moviedata.opening_crawl,
            releaseDate: moviedata.release_date,
          };});
          
        
        setmovies(transfommovies);
      });
    }
  

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
