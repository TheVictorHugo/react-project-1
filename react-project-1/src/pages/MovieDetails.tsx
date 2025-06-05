import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import './MovieDetails.scss'

type MovieDetailsProps = {
  imdbID: string
  onBack: () => void
}

type MovieDetailsData = {
  Title: string
  Poster: string
  Year: string
  Genre: string
  Plot: string
  Director: string
  Actors: string
  imdbRating: string
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ imdbID, onBack }) => {
  const [movie, setMovie] = useState<MovieDetailsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const API_KEY = "772a1fb5"
    setLoading(true)
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`)
      .then(res => res.json())
      .then(data => {
        setMovie(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [imdbID])

  if (loading) {
    return (
      <div className="movie-details__loading">
        Carregando detalhes...
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="movie-details__error">
        Não foi possível carregar os detalhes do filme.
      </div>
    )
  }

  return (
    <div>
      <div className="movie-details">
        <img
          className="movie-details__poster"
          src={movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/240x360?text=Sem+Imagem"}
          alt={movie.Title}
        />
        <div className="movie-details__info">
          <h2 className="movie-details__title">{movie.Title}</h2>
          <div className="movie-details__meta">
            <strong>Ano:</strong> {movie.Year} &nbsp;|&nbsp;
            <strong>Gênero:</strong> {movie.Genre}
          </div>
          <div className="movie-details__meta">
            <strong>Diretor:</strong> {movie.Director}
          </div>
          <div className="movie-details__meta">
            <strong>Atores:</strong> {movie.Actors}
          </div>
          <div className="movie-details__meta">
            <strong>Nota IMDb:</strong> <span className="movie-details__rating">{movie.imdbRating}</span>
          </div>
          <div className="movie-details__plot">
            {movie.Plot}
          </div>
          <button
            className="movie-details__back-btn"
            onClick={onBack}
          >
            Voltar
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default MovieDetails
