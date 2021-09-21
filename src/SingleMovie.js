import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_ENDPOINT } from "./context";
const url =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: "" });

  const fetchMovie = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    if (data.Response === "False") {
      setError({ show: true, msg: data.Error });
      setIsLoading(false);
    } else {
      setMovie(data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie(`${API_ENDPOINT}&i=${id}`);
  }, [id]);

  if (isLoading) {
    return <div className='loading'></div>;
  }
  if (error.show) {
    return (
      <div className='page-error'>
        <h1>{error.msg}</h1>
        <Link to='/' className='btn'>
          back to home
        </Link>
      </div>
    );
  }
  const {
    Poster: poster,
    Title: title,
    Released: year,
    Plot: plot,
    Genre: genre,
    imdbRating: rating,
    Actors: actors,
  } = movie;
  return (
    <section className='single-movie'>
      <img src={poster === "N/A" ? url : poster} alt={title} />
      <div className='single-movie-info'>
        <h2>{title}</h2>
        <h4>Starring:{actors}</h4>
        <h4>Genre:{genre}</h4>
        <h4>Year:{year}</h4>
        <h4>Rating:{rating}</h4>
        <h4>Plot:</h4>
        <p>{plot}</p>
        <Link className='btn' to='/'>
          back to home
        </Link>
      </div>
    </section>
  );
};

export default SingleMovie;
