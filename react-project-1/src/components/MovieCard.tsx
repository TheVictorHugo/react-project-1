import React from 'react'
import './MovieCard.scss'

type MovieCardProps = {
  movie: {
    Title: string
    Poster: string
    Year: string
  }
  onClick: () => void
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => (
  <div className="movie-card" onClick={onClick}>
    <img
      className="movie-card__poster"
      src={movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/180x270?text=Sem+Imagem"}
      alt={movie.Title}
    />
    <div className="movie-card__info">
      <h3 className="movie-card__title">{movie.Title}</h3>
      <div className="movie-card__year">{movie.Year}</div>
    </div>
  </div>
)

export default MovieCard
