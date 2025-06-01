import { useState, useEffect } from 'react'
import './App.css'

// Componente para mostrar estrelas de classificação
function StarRating({ rating }: { rating: number }) {
  return (
    <div>
      {[1,2,3,4,5].map((star) => (
        <span key={star} style={{ color: star <= rating ? '#FFD700' : '#ccc', fontSize: '1.5rem' }}>
          ★
        </span>
      ))}
    </div>
  )
}

// Novo componente para o card do filme
function MovieCard({ movie }: { movie: { title: string, cover: string, rating: number } }) {
  return (
    <div style={{
      width: 220,
      border: '1px solid #ddd',
      borderRadius: 8,
      padding: 16,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      textAlign: 'center',
      background: '#fff'
    }}>
      <img src={movie.cover} alt={`Capa do ${movie.title}`} style={{ width: '100%', borderRadius: 4 }} />
      <h2 style={{ fontSize: '1.2rem', margin: '16px 0 8px' }}>{movie.title}</h2>
      <StarRating rating={movie.rating} />
    </div>
  )
}

function App() {
  const [movies, setMovies] = useState<{ title: string, cover: string, rating: number }[]>([])

  useEffect(() => {
    // Usando a chave da OMDb API fornecida
    const API_KEY = "772a1fb5"
    const titles = [
      "The Shawshank Redemption",
      "The Godfather",
      "The Dark Knight",
      "Pulp Fiction",
      "Forrest Gump",
      "Inception",
      "Fight Club",
      "The Matrix",
      "Interstellar",
      "The Lord of the Rings"
    ]
//http://www.omdbapi.com/?i=tt3896198&apikey=772a1fb5
    Promise.all(
      titles.map(title =>
        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(title)}`)
          .then(res => res.json())
      )
    ).then(dataArr => {
      const moviesData = dataArr.map((movie: any) => ({
        title: movie.Title,
        cover: movie.Poster && movie.Poster !== "N/A"
          ? movie.Poster
          : "https://via.placeholder.com/200x300?text=Sem+Imagem",
        rating: movie.imdbRating && movie.imdbRating !== "N/A"
          ? Math.round(Number(movie.imdbRating) / 2)
          : 3
      }))
      setMovies(moviesData)
    }).catch(() => {
      // fallback para filmes de exemplo caso a API falhe
      setMovies([
        {
          title: "Exemplo de Filme 1",
          cover: "https://via.placeholder.com/200x300?text=Filme+1",
          rating: 4
        },
        {
          title: "Exemplo de Filme 2",
          cover: "https://via.placeholder.com/200x300?text=Filme+2",
          rating: 5
        },
        {
          title: "Exemplo de Filme 3",
          cover: "https://via.placeholder.com/200x300?text=Filme+3",
          rating: 3
        }
      ])
    })
  }, [])

  return (
    <>
      <div style={{
        display: 'flex',
        gap: 24,
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: '40px auto'
      }}>
        {movies.map((movie, idx) => (
          <MovieCard key={idx} movie={movie} />
        ))}
      </div>
    </>
  )
}

export default App