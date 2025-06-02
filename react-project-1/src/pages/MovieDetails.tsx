import React, { useEffect, useState } from 'react'

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
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        height: 400, color: '#fff', fontSize: 24
      }}>
        Carregando detalhes...
      </div>
    )
  }

  if (!movie) {
    return (
      <div style={{ color: '#fff', textAlign: 'center', marginTop: 40 }}>
        Não foi possível carregar os detalhes do filme.
      </div>
    )
  }

  return (
    <div style={{
      maxWidth: 800,
      margin: '40px auto',
      background: '#181818',
      borderRadius: 12,
      boxShadow: '0 4px 24px rgba(0,0,0,0.7)',
      color: '#fff',
      padding: 32,
      display: 'flex',
      gap: 32
    }}>
      <img
        src={movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/240x360?text=Sem+Imagem"}
        alt={movie.Title}
        style={{
          width: 240,
          height: 360,
          objectFit: 'cover',
          borderRadius: 8,
          boxShadow: '0 2px 12px rgba(0,0,0,0.5)'
        }}
      />
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: 32, margin: '0 0 16px', fontWeight: 700 }}>{movie.Title}</h2>
        <div style={{ marginBottom: 12, fontSize: 18 }}>
          <strong>Ano:</strong> {movie.Year} &nbsp;|&nbsp;
          <strong>Gênero:</strong> {movie.Genre}
        </div>
        <div style={{ marginBottom: 12, fontSize: 18 }}>
          <strong>Diretor:</strong> {movie.Director}
        </div>
        <div style={{ marginBottom: 12, fontSize: 18 }}>
          <strong>Atores:</strong> {movie.Actors}
        </div>
        <div style={{ marginBottom: 18, fontSize: 18 }}>
          <strong>Nota IMDb:</strong> <span style={{ color: '#FFD700' }}>{movie.imdbRating}</span>
        </div>
        <div style={{ fontSize: 16, lineHeight: 1.6, marginBottom: 24 }}>
          {movie.Plot}
        </div>
        <button
          onClick={onBack}
          style={{
            padding: '10px 32px',
            borderRadius: 20,
            border: 'none',
            background: '#e50914',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 16,
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
        >
          Voltar
        </button>
      </div>
    </div>
  )
}

export default MovieDetails
