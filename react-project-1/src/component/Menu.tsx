import React from 'react'

type MenuProps = {
  open: boolean
  onClose: () => void
  onNavigate?: (route: string) => void
}

function Menu({ open, onClose, onNavigate }: MenuProps) {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.3)',
            zIndex: 99
          }}
        />
      )}
      {/* Drawer */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: open ? 0 : -220,
        width: 220,
        height: '100vh',
        background: '#333',
        color: '#fff',
        padding: '32px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        fontSize: '1.1rem',
        zIndex: 100,
        transition: 'left 0.3s'
      }}>
        <a href="#"
          style={{ color: '#fff', textDecoration: 'none', padding: '8px 24px' }}
          onClick={e => { e.preventDefault(); onNavigate && onNavigate('/') }}
        >Início</a>
        <a href="#"
          style={{ color: '#fff', textDecoration: 'none', padding: '8px 24px' }}
          onClick={e => { e.preventDefault(); onNavigate && onNavigate('/filmes') }}
        >Filmes</a>
        <a href="#"
          style={{ color: '#fff', textDecoration: 'none', padding: '8px 24px' }}
          onClick={e => { e.preventDefault(); onNavigate && onNavigate('/sobre') }}
        >Sobre</a>
      </nav>
    </>
  )
}

export default Menu
