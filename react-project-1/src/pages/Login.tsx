import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.scss'

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
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__title">Entrar</h2>
        <input
          className="login__input"
          type="text"
          placeholder="Usuário"
          value={user}
          onChange={e => setUser(e.target.value)}
        />
        <input
          className="login__input"
          type="password"
          placeholder="Senha"
          value={pass}
          onChange={e => setPass(e.target.value)}
        />
        <button className="login__button" type="submit">
          Entrar
        </button>
        {error && <div className="login__error">{error}</div>}
      </form>
    </div>
  )
}

export default Login
