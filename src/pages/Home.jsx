import React, { useState, useEffect } from 'react';
import { fetchPopularMovies, searchMovies } from '../api/tmdb';
import './Home.css';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showContacts, setShowContacts] = useState(false); 

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchPopularMovies();
        if (data && Array.isArray(data)) {
          setMovies(data);
        } else {
          setError("Received data is not in the expected format.");
        }
      } catch (error) {
        setError("Failed to fetch movies.");
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  const openModal = (movie) => setSelectedMovie(movie);
  const closeModal = () => setSelectedMovie(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') return;
    setLoading(true);
    try {
      const results = await searchMovies(searchQuery);
      setMovies(results);
      setShowContacts(false); 
    } catch (error) {
      setError("Failed to search movies.");
    } finally {
      setLoading(false);
    }
  };

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const toggleContacts = () => setShowContacts(prev => !prev); 

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <div className="header-bar">
        <div
          className="page-title-wrapper"
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
        >
          <h1 className="page-title">Popular Movies</h1>

          <div className={`dropdown-buttons ${menuOpen ? 'active' : ''}`}>
            <button>🔍 Поиск</button>
            <button onClick={toggleContacts}>📞 Контакты</button>
          </div>
        </div>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movies..."
          />
          <button type="submit" onClick={toggleMenu}>Search</button>
        </form>
      </div>

  
      {showContacts && (
  <div className="contacts-section">
    <button className="close-contacts-btn" onClick={() => setShowContacts(false)}>&times;</button>
          <h2>Контакты</h2>
          <p>Email: 0altair.khairullin0@gmail.com</p>
          <p>Телефон: +7 (747) 763-7243</p>
          <p>Адрес: г. Алматы, ул. Астана, 20</p>
        </div>
      )}

      <div className="container">
        {movies.map((movie) => (
          <div
            className="movie-card"
            key={movie.id}
            onClick={() => openModal(movie)}
          >
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />
            )}
            <h3>{movie.title}</h3>
            <p>{movie.overview.slice(0, 100)}...</p>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>&times;</button>
            <img
              className="modal-image"
              src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
            />
            <h2>{selectedMovie.title}</h2>
            <p>{selectedMovie.overview}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
