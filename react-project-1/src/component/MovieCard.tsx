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
  <div
    style={{
      background: '#181818',
      borderRadius: 8,
      width: 200,
      padding: 0,
      boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
      overflow: 'hidden',
      position: 'relative',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer'
    }}
    onMouseOver={e => {
      (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.08)';
      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.8)';
    }}
    onMouseOut={e => {
      (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.5)';
    }}
  >
    <img
      src={movie.cover}
      alt={movie.title}
      style={{
        width: '100%',
        height: 300,
        objectFit: 'cover',
        display: 'block',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
      }}
    />
    <div style={{
      padding: '16px 12px 12px 12px',
      background: 'rgba(24,24,24,0.95)',
      minHeight: 90
    }}>
      <h3 style={{
        fontSize: 18,
        margin: '0 0 8px 0',
        color: '#fff',
        fontWeight: 700,
        textShadow: '0 2px 8px #000'
      }}>{movie.title}</h3>
      <div style={{ color: '#FFD700', fontSize: 18, letterSpacing: 2 }}>
        {'★'.repeat(movie.rating)}
        {'☆'.repeat(5 - movie.rating)}
      </div>
    </div>
  </div>
);

export default MovieCard;