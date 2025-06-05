import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Menu.scss'

type MenuProps = {
  onLogout: () => void
}

const Menu: React.FC<MenuProps> = ({ onLogout }) => {
  const location = useLocation()
  return (
    <nav className="menu">
      <ul className="menu__list">
        <li className={`menu__item${location.pathname === '/home' ? ' menu__item--active' : ''}`}>
          <Link className="menu__link" to="/home">Início</Link>
        </li>
        <li className={`menu__item${location.pathname === '/filmes' ? ' menu__item--active' : ''}`}>
          <Link className="menu__link" to="/filmes">Filmes</Link>
        </li>
        <li className={`menu__item${location.pathname === '/sobre' ? ' menu__item--active' : ''}`}>
          <Link className="menu__link" to="/sobre">Sobre</Link>
        </li>
        <li className="menu__item">
          <button className="menu__logout" onClick={onLogout}>Sair</button>
        </li>
      </ul>
    </nav>
  )
}

export default Menu
