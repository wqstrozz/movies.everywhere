import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div className="rounded shadow hover:shadow-lg cursor-pointer" onClick={() => navigate(`/movie/${movie.id}`)}>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full rounded-t" />
      <div className="p-2">
        <h2 className="text-lg font-semibold truncate">{movie.title}</h2>
        <p className="text-sm text-gray-600">{movie.release_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;
