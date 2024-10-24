import { useState } from "react";
import "../styles.css";
import MovieCard from "./MovieCard";

export default function MoviesGrid({movies, watchlist, toggleWatchlist}) {

    const genres = [
        'All Genres',
        'Action',
        'Drama',
        'Fantasy',
        'Horror'
    ];

    const ratings = [
        'All',
        'Good',
        'Ok',
        'Bad'
    ]



  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("All Genres");
  const [rating, setRating] = useState("All");


  const renderedMovies = () => {
    return filteredMovies.map((movie) => {
      return (
          <MovieCard key={movie.id} movie={movie} toggleWatchlist={toggleWatchlist} isWatchlisted={watchlist.includes(movie.id)}/>
      );
    });
  };




  const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
  }

  const matchesSearchTerm = (movie, searchTerm) => {
      return movie.title.toLowerCase().includes(searchTerm.toString().toLowerCase())
  }


    const handleGenreChange = (e) => {
        setGenre(e.target.value);
    }
    const matchesGenre = (movie, genre) => {
      return genre === genres[0] || movie.genre.toLowerCase() === genre.toLowerCase()
    }

    const handleRatingChange = (e) => {
        setRating(e.target.value);
    }

    const matchesRating = (movie, rating) => {
      switch (rating) {
          case ratings[0]:
              return true;
          case ratings[1]:
              return movie.rating >= 8
          case ratings[2]:
              return movie.rating >= 5 && movie.rating < 8
          case ratings[3]:
              return movie.rating < 5
          default:
              return false;
      }
    }

  const filteredMovies = movies.filter(movie =>
      // return movie.title.toLowerCase().includes(searchTerm.toString().toLowerCase())
      matchesGenre(movie, genre) &&
      matchesRating(movie, rating) &&
      matchesSearchTerm(movie, searchTerm)
  );


  const renderedOptionList = (options) => {
      return options.map(option => {
          return (<option key={option} value={option}>{option}</option>);
      })

  }



  return (
      <div>
          <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              className="search-input"
              onChange={handleSearchChange}
          />

          <div className="filter-bar">
              <div className="filter-slot"><
                  label htmlFor="genre-dropdown">Genre</label>
                  <select
                      value={genre}
                      className="filter-dropdown"
                      name=""
                      id="genre-dropdown"
                      onChange={handleGenreChange}
                  >
                      {renderedOptionList(genres)}
                  </select>
              </div>
              <div className="filter-slot">
                  <label htmlFor="ranting-dropdown">Rating</label>
                  <select
                      value={rating}
                      className='filter-dropdown'
                      name=""
                      id="ranting-dropdown"
                      onChange={handleRatingChange}
                  >
                      {renderedOptionList(ratings)}
                  </select>
              </div>


          </div>

          <div className="movies-grid">
              {renderedMovies()}
          </div>
      </div>

  );
}
