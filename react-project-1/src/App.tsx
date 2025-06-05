import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import MovieCard from './components/MovieCard'
import Header from './components/Header'
import Menu from './components/Menu'
import MovieDetails from './pages/MovieDetails'
import Footer from './components/Footer'
import Login from './pages/Login'

function Home({ onMovieClick }: { onMovieClick: (id: string) => void }) {
  const [movies, setMovies] = useState<{ title: string, cover: string, rating: number, imdbID?: string }[]>([])
  const [filter, setFilter] = useState('')
  const [page, setPage] = useState(1)
  const itemsPerPage = 10
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const API_KEY = "772a1fb5"
    const searchTerm = filter.trim() === '' ? 'action' : encodeURIComponent(filter.trim())
    setLoading(true)
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}&type=movie&page=${page}`)
      .then(res => res.json())
      .then(async data => {
        if (data.Response === "True" && Array.isArray(data.Search)) {
          setTotalPages(Math.ceil(Number(data.totalResults) / itemsPerPage))
          const moviesData = await Promise.all(
            data.Search.map(async (movie: any) => {
              const detailsRes = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`)
              const details = await detailsRes.json()
              return {
                title: details.Title,
                cover: details.Poster && details.Poster !== "N/A"
                  ? details.Poster
                  : "https://via.placeholder.com/200x300?text=Sem+Imagem",
                rating: details.imdbRating && details.imdbRating !== "N/A"
                  ? Math.round(Number(details.imdbRating) / 2)
                  : 3,
                imdbID: details.imdbID
              }
            })
          )
          setMovies(moviesData)
        } else {
          setMovies([])
          setTotalPages(1)
        }
        setLoading(false)
      })
      .catch(() => {
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
        setTotalPages(1)
        setLoading(false)
      })
  }, [page, filter])

  // Corrigir: resetar para página 1 ao filtrar
  useEffect(() => {
    setPage(1)
  }, [filter])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to top, #141414 80%, #222 100%)',
      color: '#fff',
      fontFamily: 'Roboto, Arial, Helvetica, sans-serif'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '32px 0 0'
      }}>
        <input
          type="text"
          placeholder="Filtrar filmes..."
          value={filter}
          onChange={e => {
            setFilter(e.target.value)
            setPage(1) // Resetar página ao filtrar
          }}
          style={{
            padding: '12px 24px',
            borderRadius: 32,
            border: 'none',
            fontSize: 18,
            width: 380,
            background: '#232323',
            color: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            outline: 'none',
            marginBottom: 0,
            marginTop: 0,
            letterSpacing: 1
          }}
        />
      </div>
      {loading ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 300,
          fontSize: 24,
          color: '#fff'
        }}>
          Carregando...
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 24,
          justifyContent: 'flex-start',
          margin: '40px auto 0',
          maxWidth: 1400,
          padding: '0 32px',
        }}>
          {movies.map((movie, idx) => (
            <div
              key={movie.imdbID || idx}
              onClick={() => movie.imdbID && onMovieClick(movie.imdbID)}
              style={{ cursor: 'pointer' }}
            >
              <MovieCard
                movie={{
                  Title: movie.title,
                  Poster: movie.cover,
                  Year: "N/A" // or provide the actual year if available
                }}
                onClick={() => movie.imdbID && onMovieClick(movie.imdbID)}
              />
            </div>
          ))}
        </div>
      )}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        margin: '32px 0 0'
      }}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1 || loading}
          style={{
            padding: '10px 32px',
            borderRadius: 20,
            border: 'none',
            background: page === 1 || loading ? '#333' : '#e50914',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 18,
            cursor: page === 1 || loading ? 'not-allowed' : 'pointer',
            opacity: page === 1 || loading ? 0.5 : 1,
            transition: 'background 0.2s'
          }}
        >
          Anterior
        </button>
        <span style={{ fontSize: 20, fontWeight: 'bold', letterSpacing: 1 }}>Página {page} de {totalPages}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages || loading}
          style={{
            padding: '10px 32px',
            borderRadius: 20,
            border: 'none',
            background: page === totalPages || loading ? '#333' : '#e50914',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 18,
            cursor: page === totalPages || loading ? 'not-allowed' : 'pointer',
            opacity: page === totalPages || loading ? 0.5 : 1,
            transition: 'background 0.2s'
          }}
        >
          Próxima
        </button>
      </div>
    </div>
  )
}

function Filmes() {
  // Pode ser igual ao Home ou mostrar outra listagem
  return <Home onMovieClick={() => {}} />
}

function Sobre() {
  return (
    <div style={{ color: '#fff', padding: 40, fontSize: 22 }}>
      <h2>Sobre</h2>
      <p>Este é um catálogo de filmes estilo Netflix feito em React.</p>
    </div>
  )
}

import { useParams } from 'react-router-dom'

// Novo componente para mostrar usuário logado e botão de sair
function LoginMenu({ user, onLogout }: { user: string | null, onLogout: () => void }) {
  if (!user) return null
  return (
    <div style={{
      position: 'fixed',
      top: 16,
      right: 32,
      zIndex: 2000,
      background: '#232323',
      color: '#fff',
      borderRadius: 20,
      padding: '8px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
    }}>
      <span style={{ fontWeight: 500 }}>Usuário: {user}</span>
      <button
        onClick={onLogout}
        style={{
          background: '#e50914',
          color: '#fff',
          border: 'none',
          borderRadius: 12,
          padding: '6px 16px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Sair
      </button>
    </div>
  )
}

function AppRoutes({ user, onLogout }: { user: string | null, onLogout: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <Menu onLogout={onLogout} />
      <LoginMenu user={user} onLogout={onLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <div style={{
              position: 'fixed',
              inset: 0,
              minHeight: '100vh',
              minWidth: '100vw',
              background: 'linear-gradient(to top, #141414 80%, #222 100%)',
              zIndex: 9999
            }}>
              <Login onLogin={user => {
                navigate('/home')
                onLogout() // limpa usuário antes de setar novo
                setTimeout(() => onLogout(), 0) // seta novo usuário
              }} />
            </div>
          }
        />
        <Route path="/home" element={<Home onMovieClick={id => navigate(`/filme/${id}`)} />} />
        <Route path="/filmes" element={<Filmes />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/filme/:imdbID" element={
          <MovieDetailsWrapper />
        } />
      </Routes>
    </>
  )
}

// Wrapper para MovieDetails para pegar o imdbID da URL
function MovieDetailsWrapper() {
  const { imdbID } = useParams()
  const navigate = useNavigate()
  if (!imdbID) return null
  return <MovieDetails imdbID={imdbID} onBack={() => navigate(-1)} />
}

function App() {
  const [user, setUser] = useState<string | null>(null)

  const handleLogin = (username: string) => setUser(username)
  const handleLogout = () => {
    setUser(null)
    window.location.href = '/'
  }

  return (
    <Router>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to top, #141414 80%, #222 100%)',
        color: '#fff',
        fontFamily: 'Roboto, Arial, Helvetica, sans-serif',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <AppRoutes user={user} onLogout={() => setUser(null)} />
        <Footer />
      </div>
    </Router>
  )
}

export default App