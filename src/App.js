import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Favorites from './pages/Favorites';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
}

export default App;
