import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login: React.FC<{ onLogin?: (user: string) => void }> = ({ onLogin }) => {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (user.trim() === 'admin' && pass.trim() === 'admin') {
      setError('')
      if (onLogin) onLogin(user)
      navigate('/home')
    } else {
      setError('Usuário ou senha inválidos. Use admin/admin.')
    }
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      minHeight: '100vh',
      minWidth: '100vw',
      background: 'linear-gradient(to top, #141414 80%, #222 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#181818',
          padding: 40,
          borderRadius: 12,
          boxShadow: '0 4px 24px rgba(0,0,0,0.7)',
          display: 'flex',
          flexDirection: 'column',
          minWidth: 320
        }}
      >
        <h2 style={{
          color: '#fff',
          marginBottom: 24,
          textAlign: 'center',
          fontWeight: 700,
          fontSize: 28,
          letterSpacing: 1
        }}>
          Login
        </h2>
        <input
          type="text"
          placeholder="Usuário"
          value={user}
          onChange={e => setUser(e.target.value)}
          style={{
            marginBottom: 16,
            padding: '12px 16px',
            borderRadius: 6,
            border: 'none',
            background: '#232323',
            color: '#fff',
            fontSize: 16
          }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={pass}
          onChange={e => setPass(e.target.value)}
          style={{
            marginBottom: 16,
            padding: '12px 16px',
            borderRadius: 6,
            border: 'none',
            background: '#232323',
            color: '#fff',
            fontSize: 16
          }}
        />
        {error && (
          <div style={{ color: '#e50914', marginBottom: 12, textAlign: 'center' }}>{error}</div>
        )}
        <button
          type="submit"
          style={{
            padding: '12px 0',
            borderRadius: 6,
            border: 'none',
            background: '#e50914',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 18,
            cursor: 'pointer',
            marginTop: 8
          }}
        >
          Entrar
        </button>
      </form>
    </div>
  )
}

export default Login
