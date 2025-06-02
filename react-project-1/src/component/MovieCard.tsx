import React from 'react';

type Movie = {
  title: string;
  cover: string;
  rating: number;
};

type MovieCardProps = {
  movie: Movie;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => (
  <div style={{
    border: '1px solid #ccc',
    borderRadius: 8,
    width: 200,
    padding: 16,
    background: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  }}>
    <img
      src={movie.cover}
      alt={movie.title}
      style={{ width: '100%', height: 300, objectFit: 'cover', borderRadius: 4 }}
    />
    <h3 style={{ fontSize: 18, margin: '12px 0 8px', color: '#000' }}>{movie.title}</h3>
    <div style={{ color: '#FFD700' }}>
      {'★'.repeat(movie.rating)}
      {'☆'.repeat(5 - movie.rating)}
    </div>
  </div>
);

export default MovieCard;