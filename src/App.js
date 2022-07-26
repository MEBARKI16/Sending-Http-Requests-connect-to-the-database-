import React, {useState, useEffect, useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';


function App() {
  const [movies, setmovies] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [error, seterror] = useState(null);
    
 const fetchMoviesHandler =  useCallback(async () => {
    setisloading(true);
    seterror(null);
    try {
   const response = await fetch('https://swapi.dev/api/films/');
   console.log(response);
   if(!response.ok)
   {
    throw new Error('something went wrong!');
   }
 const data = await response.json();
        const transfommovies = data.results.map((moviedata) => {
          return {
            id: moviedata.episode_id,
            title: moviedata.title,
            openingText: moviedata.opening_crawl,
            releaseDate: moviedata.release_date,
          };});
          
        
        setmovies(transfommovies);
        setisloading(false);
      }
      catch(error){
           seterror(error.message);
      }
      setisloading(false);
    },[])
 useEffect(() => {
      fetchMoviesHandler();
    },[fetchMoviesHandler]);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isloading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isloading && movies.length === 0 && <p>Not Found Movies.</p>}
        {!isloading && error && <p>{error}</p>}
        {isloading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
