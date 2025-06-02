import { useState, useEffect } from 'react'
import './App.css'
import MovieCard from './component/MovieCard'
import Header from './component/Header'
import Menu from './component/Menu'

function App() {
  const [movies, setMovies] = useState<{ title: string, cover: string, rating: number }[]>([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('')
  const [page, setPage] = useState(1)
  const itemsPerPage = 10

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
      console.log("moviesData", moviesData)
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

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(filter.toLowerCase())
  )

  const totalPages = Math.max(1, Math.ceil(filteredMovies.length / itemsPerPage))
  const paginatedMovies = filteredMovies.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  // Resetar para página 1 ao filtrar
  useEffect(() => {
    setPage(1)
  }, [filter])

  return (
    <>
      <Header onMenuClick={() => setMenuOpen(true)} />
      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div style={{ display: 'flex', justifyContent: 'center', margin: '32px 0 0' }}>
        <input
          type="text"
          placeholder="Filtrar filmes..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={{
            padding: '8px 16px',
            borderRadius: 4,
            border: '1px solid #ccc',
            fontSize: 16,
            width: 300
          }}
        />
      </div>
      <div style={{
        display: 'flex',
        gap: 24,
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: '40px auto'
      }}>
        {paginatedMovies.map((movie, idx) => (
          <MovieCard key={idx} movie={movie} />
        ))}
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        margin: '24px 0'
      }}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          style={{
            padding: '6px 16px',
            borderRadius: 4,
            border: '1px solid #ccc',
            background: page === 1 ? '#eee' : '#fff',
            cursor: page === 1 ? 'not-allowed' : 'pointer'
          }}
        >
          Anterior
        </button>
        <span>Página {page} de {totalPages}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          style={{
            padding: '6px 16px',
            borderRadius: 4,
            border: '1px solid #ccc',
            background: page === totalPages ? '#eee' : '#fff',
            cursor: page === totalPages ? 'not-allowed' : 'pointer'
          }}
        >
          Próxima
        </button>
      </div>
    </>
  )
}

export default App