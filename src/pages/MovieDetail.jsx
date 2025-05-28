// src/pages/MovieDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetail.css';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=YOUR_API_KEY&language=en-US`);
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        setError('Failed to load movie');
      }
    };

    fetchMovie();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!movie) return <p>Loading...</p>;

  return (
    <div
      className="movie-detail"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="movie-detail-content">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="movie-detail-poster"
        />
        <div className="movie-detail-info">
          <h1>{movie.title}</h1>
          <p>
            {movie.release_date?.slice(0, 4)} • {movie.original_language?.toUpperCase()} • {movie.runtime} min
          </p>
          <div className="genres">
            {movie.genres?.map((genre) => (
              <span key={genre.id} className="genre-tag">{genre.name}</span>
            ))}
          </div>
          <p className="overview">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;

