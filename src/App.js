import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';


function App() {
  const [movies, setmovies] = useState([]);
  const [isloading, setisloading] = useState(false);
  function fetchMoviesHandler() {
    setisloading(true);
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
        setisloading(false);
      });
    }
  

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isloading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isloading && movies.length === 0 && <p>Not Found Movies.</p>}
        {isloading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
